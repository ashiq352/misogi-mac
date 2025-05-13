import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface IGalleryDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  artworkRefs: mongoose.Types.ObjectId[];
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const GallerySchema = new mongoose.Schema<IGalleryDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    artworkRefs: [{ type: ObjectId, ref: "Artwork", required: true }],
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

GallerySchema.index({ name: "text", description: "text" });

export const Gallery = mongoose.model<IGalleryDocument>(
  "Gallery",
  GallerySchema
);
