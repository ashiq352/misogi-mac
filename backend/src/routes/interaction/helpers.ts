import { Artwork } from "../../db/artwork";
import { ArtworkInteraction } from "../../db/artworkInteraction";
import { INTERACTION_TYPE } from "../../utils/enums/enums";


export class InteractionHelpers {
  public static recordInteraction = async (
    artworkId: string,
    type: INTERACTION_TYPE,
    ipAddress?: string,
    sessionId?: string
  ) => {
    await ArtworkInteraction.create({
      artworkRef: artworkId,
      type,
      ipAddress,
      sessionId,
    });

    const updateField =
      type === INTERACTION_TYPE.VIEW
        ? { $inc: { views: 1 } }
        : { $inc: { likes: 1 } };
    await Artwork.findByIdAndUpdate(artworkId, updateField);
  };

  public static getStats = async (artworkId: string) => {
    return Artwork.findById(artworkId).select("views likes");
  };
}
