import mongoose from "mongoose";
import { INTERACTION_TYPE } from "../utils/enums/enums";

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface IArtworkInteractionDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  artworkRef: mongoose.Types.ObjectId;
  type: INTERACTION_TYPE; // 'VIEW' or 'LIKE'
  ipAddress?: string;
  sessionId?: string;
  createdAt?: Date;
}

const ArtworkInteractionSchema =
  new mongoose.Schema<IArtworkInteractionDocument>(
    {
      artworkRef: { type: ObjectId, ref: "Artwork", required: true },
      type: {
        type: String,
        enum: Object.values(INTERACTION_TYPE),
        required: true,
      },
      ipAddress: { type: String },
      sessionId: { type: String },
    },
    {
      timestamps: { createdAt: true, updatedAt: false },
      toObject: { virtuals: true },
      toJSON: { virtuals: true },
    }
  );

export const ArtworkInteraction = mongoose.model<IArtworkInteractionDocument>(
  "ArtworkInteraction",
  ArtworkInteractionSchema
);
