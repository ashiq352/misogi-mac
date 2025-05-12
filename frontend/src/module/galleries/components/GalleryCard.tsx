import Link from "next/link";

interface GalleryCardProps {
  id: string;
  name: string;
  coverImage: string;
  artworkCount: number;
  createdAt: string;
}

export default function GalleryCard({
  id,
  name,
  coverImage,
  artworkCount,
  createdAt,
}: GalleryCardProps) {
  return (
    <Link href={`/galleries/${id}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">
            {artworkCount} artworks · {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}