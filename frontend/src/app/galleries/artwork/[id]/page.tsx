"use client";

import ArtworkModal from "@/module/galleries/components/ArtworkModal";
import { useViewArtwork } from "@/module/galleries/hooks/useViewArtwork";
import { useLikeArtwork } from "@/module/galleries/hooks/useLikeArtwork";

const dummyArtwork = {
  id: "art1",
  title: "Whispers of Spring",
  imageUrl: "/artworks/spring1.jpg",
  artistName: "Aarav Mehta",
  medium: "Watercolor",
  dimensions: "30x40 cm",
  likes: 58,
};

export default function ArtworkDetailPage() {
  // Track view
  useViewArtwork(dummyArtwork.id);

  // Hook for like tracking
  const { likeCount, hasLiked, handleLike } = useLikeArtwork(
    dummyArtwork.id,
    dummyArtwork.likes
  );

  return (
    <div className="p-6">
      <ArtworkModal
        artwork={{ ...dummyArtwork, likes: likeCount }}
        onClose={() => {}}
        onLike={handleLike}
        hasLiked={hasLiked}
      />
    </div>
  );
}
