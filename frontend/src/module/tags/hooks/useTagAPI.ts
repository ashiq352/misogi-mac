import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useTagAPI = () => {
  const useAllTags = () =>
    useQuery({
      queryKey: ["tags"],
      queryFn: async () => {
        const res = await api.get("/tags");
        return res.data?.data;
      },
    });

  const useCreateTag = () =>
    useMutation({
      mutationFn: async (name: string) => {
        const res = await api.post("/tags", { name });
        return res.data?.data;
      },
    });

  return { useAllTags, useCreateTag };
};
