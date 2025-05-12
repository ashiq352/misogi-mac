import mongoose from "mongoose";

export interface ITagDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TagSchema = new mongoose.Schema<ITagDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Tag = mongoose.model<ITagDocument>("Tag", TagSchema);
