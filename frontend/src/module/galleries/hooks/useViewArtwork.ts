import { useEffect } from "react";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const LOCAL_KEY = "viewedArtworkIds";

export const useViewArtwork = (artworkId: string) => {
  const viewMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/artworks/${artworkId}/view`);
      return res.data;
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const viewedIds: string[] = stored ? JSON.parse(stored) : [];

    if (!viewedIds.includes(artworkId)) {
      viewMutation.mutate();
      viewedIds.push(artworkId);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(viewedIds));
    }
  }, [artworkId]);
};
