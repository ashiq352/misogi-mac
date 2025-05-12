import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { STATUS, USER_ROLE } from "../utils/enums/enums";

export interface IUserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  role: USER_ROLE;
  status: STATUS;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword: (plainPassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Role virtuals (optional convenience)
UserSchema.virtual("isCurator").get(function () {
  return this.role === USER_ROLE.CURATOR;
});

UserSchema.virtual("isArtist").get(function () {
  return this.role === USER_ROLE.ARTIST;
});

// Hash password before saving
UserSchema.pre<IUserDocument>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  plainPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, this.password);
};

export const User = mongoose.model<IUserDocument>("User", UserSchema);
