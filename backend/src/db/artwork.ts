import mongoose from "mongoose";
import { ARTWORK_STATUS } from "../utils/enums/enums";

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface IArtworkDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  artistRef: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  imageUrl: string;
  medium: string;
  dimensions: string;
  tags: mongoose.Types.ObjectId[];
  status: ARTWORK_STATUS;
  feedback?: string;
  approvedBy?: mongoose.Types.ObjectId;
  views: number;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ArtworkSchema = new mongoose.Schema<IArtworkDocument>(
  {
    artistRef: { type: ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    medium: { type: String, required: true },
    dimensions: { type: String, required: true },
    tags: [{ type: ObjectId, ref: "Tag" }],
    status: {
      type: String,
      enum: Object.values(ARTWORK_STATUS),
      default: ARTWORK_STATUS.PENDING,
    },
    feedback: { type: String },
    approvedBy: { type: ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export const Artwork = mongoose.model<IArtworkDocument>(
  "Artwork",
  ArtworkSchema
);
