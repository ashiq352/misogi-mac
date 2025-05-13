export type CreateGalleryPayload = {
  name: string;
  description?: string;
  artworkRefs: string[];
};

export type GalleryCardProps = {
  _id: string;
  name: string;
  artworkCount: number;
  thumbnailUrl?: string;
};
