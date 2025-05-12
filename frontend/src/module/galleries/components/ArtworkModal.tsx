import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ArtworkModalProps {
  artwork: {
    id: string;
    title: string;
    imageUrl: string;
    artistName: string;
    medium: string;
    dimensions: string;
    likes: number;
  };
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [likes, setLikes] = useState(artwork.likes);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    // 🔜 Save to localStorage or send to API later
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/artwork/${artwork.id}`;
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white max-w-3xl w-full rounded-lg overflow-hidden shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl">
          ×
        </button>

        <div className="flex flex-col lg:flex-row">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full lg:w-1/2 object-contain"
          />

          <div className="p-6 w-full">
            <h2 className="text-2xl font-semibold mb-2">{artwork.title}</h2>
            <p className="text-gray-600 mb-1">by {artwork.artistName}</p>
            <p className="text-sm text-gray-500 mb-1">
              Medium: {artwork.medium}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Dimensions: {artwork.dimensions}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <Button onClick={handleLike}>👍 {likes}</Button>
              <Button variant="outline" onClick={handleShare}>
                🔗 Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
