import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const INTERACTION_API = "/interaction";

export const useInteractionAPI = () => {
  const useRecordView = () =>
    useMutation({
      mutationFn: async (artworkId: string) => {
        const sessionId = getOrCreateSessionId();
        await api.post(
          `${INTERACTION_API}/view/${artworkId}`,
          {},
          {
            headers: { "x-session-id": sessionId },
          }
        );
      },
    });

  const useRecordLike = () =>
    useMutation({
      mutationFn: async (artworkId: string) => {
        const sessionId = getOrCreateSessionId();
        await api.post(
          `${INTERACTION_API}/like/${artworkId}`,
          {},
          {
            headers: { "x-session-id": sessionId },
          }
        );
      },
    });

  const useInteractionStats = (artworkId: string) =>
    useQuery({
      queryKey: ["interaction", artworkId],
      queryFn: async () => {
        const res = await api.get(`${INTERACTION_API}/${artworkId}`);
        return res.data?.data;
      },
      enabled: !!artworkId,
    });

  return { useRecordView, useRecordLike, useInteractionStats };
};

// Helper to manage session ID in localStorage
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}
