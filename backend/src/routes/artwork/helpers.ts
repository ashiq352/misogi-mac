import { Artwork, IArtworkDocument } from "../../db/artwork";
import { ARTWORK_STATUS } from "../../utils/enums/enums";

export class ArtworkHelpers {
  public static createArtwork = async (data: Partial<IArtworkDocument>) => {
    return Artwork.create(data);
  };

  public static getArtistArtworks = async (artistId: string) => {
    return Artwork.find({ artistRef: artistId });
  };

  public static updateArtwork = async (
    id: string,
    data: Partial<IArtworkDocument>
  ) => {
    return Artwork.findByIdAndUpdate(id, data, { new: true });
  };

  public static deleteArtwork = async (id: string) => {
    return Artwork.findByIdAndDelete(id);
  };

  public static getPendingArtworks = async () => {
    return Artwork.find({ status: ARTWORK_STATUS.PENDING });
  };
}
