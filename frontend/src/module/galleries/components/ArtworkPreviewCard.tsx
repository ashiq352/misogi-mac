import Link from "next/link";

interface ArtworkPreviewCardProps {
  id: string;
  title: string;
  imageUrl: string;
  artistName: string;
}

export default function ArtworkPreviewCard({
  id,
  title,
  imageUrl,
  artistName,
}: ArtworkPreviewCardProps) {
  return (
    <Link href={`/artwork/${id}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-3">
          <h4 className="text-md font-semibold truncate">{title}</h4>
          <p className="text-sm text-gray-500">by {artistName}</p>
        </div>
      </div>
    </Link>
  );
}

