import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

const LOCAL_KEY = "likedArtworkIds";

export const useLikeArtwork = (artworkId: string, initialLikes: number = 0) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const likedIds: string[] = stored ? JSON.parse(stored) : [];
    if (likedIds.includes(artworkId)) {
      setHasLiked(true);
    }
  }, [artworkId]);

  const likeMutation: UseMutationResult<unknown, Error, void> = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/artworks/${artworkId}/like`);
      return res.data;
    },
    onSuccess: () => {
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);

      const stored = localStorage.getItem(LOCAL_KEY);
      const likedIds: string[] = stored ? JSON.parse(stored) : [];
      likedIds.push(artworkId);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(likedIds));
    },
  });

  const handleLike = () => {
    if (!hasLiked) likeMutation.mutate();
  };

  return {
    hasLiked,
    likeCount,
    handleLike,
    isLiking: likeMutation.status === "pending",
  };
};
