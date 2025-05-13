import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CreateGalleryPayload } from "../types";

export const useGalleryAPI = () => {
  const useCreateGallery = () =>
    useMutation({
      mutationFn: async (payload: CreateGalleryPayload) => {
        const res = await api.post("/gallery", payload);
        return res.data?.data;
      },
    });
  const usePublicGalleries = () =>
    useQuery({
      queryKey: ["public-galleries"],
      queryFn: async () => {
        const res = await api.get("/gallery");
        return res.data?.data;
      },
    });
  const useGalleryById = (id: string) =>
    useQuery({
      queryKey: ["gallery", id],
      queryFn: async () => {
        const res = await api.get(`/gallery/${id}`);
        return res.data?.data;
      },
      enabled: !!id,
    });
  return { useCreateGallery, usePublicGalleries, useGalleryById };
};
