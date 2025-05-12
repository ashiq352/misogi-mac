import { USER_ROLE } from "@/enums";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const API_AUTH_URL = "/auth";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayloadType = {
  email: string;
  fullName: string;
  password: string;
  role: USER_ROLE;
};

export const useAuthAPI = () => {
  const useLogin = () => {
    return useMutation({
      mutationFn: async (payload: LoginPayload) => {
        const response = await api.post(`${API_AUTH_URL}/login`, payload);
        return response.data?.data;
      },
    });
  };
  const useRegister = () =>
    useMutation({
      mutationFn: async (payload: RegisterPayloadType) => {
        const response = await api.post(`${API_AUTH_URL}/register`, payload);
        return response.data?.data;
      },
    });
  return { useLogin, useRegister };
};
