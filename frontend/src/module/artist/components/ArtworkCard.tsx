"use client";

import toast from "react-hot-toast";
import { useArtworkAPI } from "../hooks/useArtworkAPI";
import { Button } from "@/components/ui/button";

export interface ArtworkCardProps {
  id: string;
  title: string;
  medium: string;
  imageUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedback?: string;
  refetch: () => void;
}

export default function ArtworkCard({
  id,
  title,
  medium,
  imageUrl,
  status,
  feedback,
  refetch,
}: ArtworkCardProps) {
  const { useDeleteArtwork } = useArtworkAPI();
  const deleteMutation = useDeleteArtwork();

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Artwork deleted.");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete artwork.");
      },
    });
  };

  const statusColor = {
    PENDING: "text-yellow-500",
    APPROVED: "text-green-600",
    REJECTED: "text-red-500",
  }[status];

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">Medium: {medium}</p>
      <p className={`text-sm font-medium ${statusColor}`}>Status: {status}</p>
      {status === "REJECTED" && feedback && (
        <p className="text-sm mt-2 text-gray-700 italic">
          Feedback: {feedback}
        </p>
      )}
      {status === "PENDING" && (
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast("Edit flow not yet connected")}
          >
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
