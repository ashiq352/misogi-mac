import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ArtworkPayload } from "../types";

const API_AUTH_URL = "/artwork";

export const useArtworkAPI = () => {
  const useMyArtworks = () =>
    useQuery({
      queryKey: ["my-artworks"],
      queryFn: async () => {
        const response = await api.get(`${API_AUTH_URL}/me`);
        return response.data?.data;
      },
    });
  const useUploadArtwork = () =>
    useMutation({
      mutationFn: async (payload: ArtworkPayload) => {
        const response = await api.post(`${API_AUTH_URL}/`, payload);
        return response.data?.data;
      },
    });

  const useUpdateArtwork = () =>
    useMutation({
      mutationFn: async ({
        id,
        payload,
      }: {
        id: string;
        payload: Partial<ArtworkPayload>;
      }) => {
        const response = await api.put(`${API_AUTH_URL}/${id}`, payload);
        return response.data?.data;
      },
    });

  const useDeleteArtwork = () =>
    useMutation({
      mutationFn: async (id: string) => {
        const response = await api.delete(`${API_AUTH_URL}/${id}`);
        return response.data?.data;
      },
    });

  return {
    useUploadArtwork,
    useMyArtworks,
    useUpdateArtwork,
    useDeleteArtwork,
  };
};
