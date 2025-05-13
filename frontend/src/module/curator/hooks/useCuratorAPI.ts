import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const API_CURATOR_URL = "/artwork";

export const useCuratorAPI = () => {
  const usePendingArtworks = () =>
    useQuery({
      queryKey: ["pending-artworks"],
      queryFn: async () => {
        const response = await api.get(`${API_CURATOR_URL}/review`);
        return response.data?.data;
      },
    });

  const useApproveArtwork = () =>
    useMutation({
      mutationFn: async ({
        id,
        tags,
        feedback,
      }: {
        id: string;
        tags: string[];
        feedback: string;
      }) => {
        const response = await api.patch(`${API_CURATOR_URL}/${id}/approve`, {
          tags,
          feedback,
        });
        return response.data?.data;
      },
    });

  const useRejectArtwork = () =>
    useMutation({
      mutationFn: async ({
        id,
        tags,
        feedback,
      }: {
        id: string;
        tags: string[];
        feedback: string;
      }) => {
        const response = await api.patch(`${API_CURATOR_URL}/${id}/reject`, {
          tags,
          feedback,
        });
        return response.data?.data;
      },
    });

  return {
    usePendingArtworks,
    useApproveArtwork,
    useRejectArtwork,
  };
};
