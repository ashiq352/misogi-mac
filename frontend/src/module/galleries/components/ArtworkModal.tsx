"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useInteractionAPI } from "@/module/interaction/hooks/useInteractionAPI";

interface ArtworkModalProps {
  artwork: {
    _id: string;
    title: string;
    imageUrl: string;
    artistRef?: { fullName: string };
    medium: string;
    dimensions: string;
  };
  onClose: () => void;
}

export default function ArtworkModal({ artwork }: ArtworkModalProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { useRecordView, useRecordLike, useInteractionStats } =
    useInteractionAPI();
  const { mutate: recordView } = useRecordView();
  const { mutate: recordLike } = useRecordLike();
  const { data: stats } = useInteractionStats(artwork._id);

  useEffect(() => {
    recordView(artwork._id);
    const liked = localStorage.getItem(`liked-${artwork._id}`);
    setHasLiked(!!liked);
  }, [artwork._id]);

  useEffect(() => {
    if (stats?.likes != null) {
      setLikeCount(stats.likes);
    }
  }, [stats]);

  const handleLike = () => {
    if (hasLiked) return;
    recordLike(artwork._id);
    localStorage.setItem(`liked-${artwork._id}`, "true");
    setHasLiked(true);
    setLikeCount((prev) => prev + 1);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/artwork/${artwork._id}`;
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        className="w-full lg:w-1/2 object-contain max-h-[400px] rounded"
      />

      <div className="w-full">
        <p className="text-gray-600 italic mb-1">
          by {artwork.artistRef?.fullName || "Unknown Artist"}
        </p>
        <p className="text-sm text-gray-500 mb-1">Medium: {artwork.medium}</p>
        <p className="text-sm text-gray-500 mb-4">
          Dimensions: {artwork.dimensions}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <Button onClick={handleLike} disabled={hasLiked}>
            👍 {likeCount}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            🔗 Share
          </Button>
          {stats?.views != null && (
            <span className="text-sm text-gray-500 ml-2">
              👁️ {stats.views} views
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
