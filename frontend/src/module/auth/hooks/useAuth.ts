
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const API_AUTH_URL = "/auth";

export const useAuthAPI = () => {
  const useMe = useMutation({
    mutationFn: async () => {
      const response = await api.get(`${API_AUTH_URL}/me`);
      console.log("response+:", response);
      return response.data.data;
    },
  });
  return useMe;
};
