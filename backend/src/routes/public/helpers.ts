import { Artwork } from "../../db/artwork";
import { Gallery } from "../../db/gallery";
import { ARTWORK_STATUS } from "../../utils/enums/enums";


export class PublicGalleryHelpers {
  public static getPublishedGalleries = async () => {
    return Gallery.find({ publishedAt: { $ne: null } }).sort({
      publishedAt: -1,
    });
  };

  public static getGalleryById = async (id: string) => {
    return Gallery.findById(id).populate("artworkRefs");
  };

  public static filterArtworks = async (filters: {
    tag?: string;
    artist?: string;
    medium?: string;
  }) => {
    const query: any = { status: ARTWORK_STATUS.APPROVED };

    if (filters.tag) query.tags = filters.tag;
    if (filters.artist) query.artistRef = filters.artist;
    if (filters.medium) query.medium = filters.medium;

    return Artwork.find(query).populate("tags artistRef");
  };
}
