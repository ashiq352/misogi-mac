import Link from "next/link";
import { GalleryCardProps } from "../types";

export default function GalleryCard({
  _id,
  name,
  artworkCount,
  thumbnailUrl,
}: GalleryCardProps) {
  return (
    <Link href={`/galleries/${_id}`}>
      <div className="border rounded-lg shadow hover:shadow-md transition cursor-pointer bg-white">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{artworkCount} artworks</p>
        </div>
      </div>
    </Link>
  );
}
