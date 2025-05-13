import { Gallery } from "../../db/gallery";

export class GalleryHelpers {
  public static createGallery = async (data: {
    name: string;
    description?: string;
    artworkRefs: string[];
    publishedAt?: Date;
  }) => {
    return Gallery.create(data);
  };

  public static getAllGalleries = async () => {
    return Gallery.find().sort({ createdAt: -1 });
  };

  public static getGalleryById = async (id: string) => {
    return Gallery.findById(id).populate({
      path: "artworkRefs",
      populate: {
        path: "artistRef",
        select: "fullName",
      },
    });
  };
}
