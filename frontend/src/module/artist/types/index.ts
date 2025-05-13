export type ArtworkPayload = {
  title: string;
  description: string;
  imageUrl: string;
  medium: string;
  dimensions: string;
  tags?: string[];
  status?: string;
};

export interface IArtworkCard {
  _id: string;
  title: string;
  medium: string;
  imageUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedback?: string;
  description?: string;
}
