"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCuratorAPI } from "@/module/curator/hooks/useCuratorAPI";
import { useTagAPI } from "@/module/tags/hooks/useTagAPI";
import { IArtworkCard } from "@/module/artist/types";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";

type TagOption = {
  label: string;
  value: string;
};

export default function CuratorDashboard() {
  const { usePendingArtworks, useApproveArtwork, useRejectArtwork } =
    useCuratorAPI();
  const { useAllTags, useCreateTag } = useTagAPI();

  const { data: artworks = [], refetch, isLoading } = usePendingArtworks();
  const { data: allTags = [] } = useAllTags();
  const createTagMutation = useCreateTag();

  const approveMutation = useApproveArtwork();
  const rejectMutation = useRejectArtwork();

  const [tagInputs, setTagInputs] = useState<Record<string, TagOption[]>>({});
  const [feedbackInputs, setFeedbackInputs] = useState<{
    [id: string]: string;
  }>({});

  if (isLoading) return <p>Loading artworks...</p>;

  const handleCreateTag = async (inputValue: string, artworkId: string) => {
    try {
      const newTag = await createTagMutation.mutateAsync(inputValue);
      const newOption: TagOption = { label: newTag.name, value: newTag.name };

      setTagInputs((prev) => ({
        ...prev,
        [artworkId]: [...(prev[artworkId] || []), newOption],
      }));
    } catch {
      toast.error("Failed to create tag");
    }
  };

  const tagOptions: TagOption[] = (allTags || []).map(
    (tag: { name: string }) => ({
      label: tag.name,
      value: tag.name,
    })
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Artworks</h1>

      {artworks.length === 0 ? (
        <p>No pending artworks to review.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {artworks.map((artwork: IArtworkCard) => (
            <div
              key={artwork._id}
              className="w-[calc(33.333%-1rem)] border rounded-lg p-4 shadow-sm bg-white space-y-3"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-1/2 max-w-sm rounded"
              />
              <h2 className="text-xl font-semibold">{artwork.title}</h2>
              <p className="text-sm text-gray-600">{artwork.description}</p>
              <p className="text-sm text-gray-500">Medium: {artwork.medium}</p>

              {/* Tag Select */}
              <div>
                <label className="text-sm">Tags:</label>
                <CreatableSelect<TagOption, true>
                  isMulti
                  options={tagOptions}
                  value={tagInputs[artwork._id] || []}
                  onChange={(value) => {
                    setTagInputs((prev) => ({
                      ...prev,
                      [artwork._id]: [...value],
                    }));
                  }}
                  onCreateOption={(inputValue) =>
                    handleCreateTag(inputValue, artwork._id)
                  }
                  placeholder="Select or create tags"
                  formatCreateLabel={(inputValue) =>
                    `Create tag "${inputValue}"`
                  }
                  isClearable
                  className="mt-1"
                />
              </div>

              {/* Feedback Input */}
              <div>
                <label className="text-sm">Feedback:</label>
                <Input
                  value={feedbackInputs[artwork._id] || ""}
                  onChange={(e) =>
                    setFeedbackInputs((prev) => ({
                      ...prev,
                      [artwork._id]: e.target.value,
                    }))
                  }
                  className="mt-1 w-1/2 m-auto"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-2 mt-4">
                <Button
                  onClick={() => {
                    const tags =
                      tagInputs[artwork._id]?.map((t) => t.value) || [];
                    const feedback = feedbackInputs[artwork._id]?.trim();

                    if (!tags.length || !feedback) {
                      toast.error(
                        "Both tags and feedback are required to approve."
                      );
                      return;
                    }

                    approveMutation.mutate(
                      { id: artwork._id, tags, feedback },
                      {
                        onSuccess: () => {
                          toast.success("Artwork approved");
                          setTagInputs((prev) => ({
                            ...prev,
                            [artwork._id]: [],
                          }));
                          setFeedbackInputs((prev) => ({
                            ...prev,
                            [artwork._id]: "",
                          }));
                          refetch();
                        },
                        onError: () => toast.error("Approval failed"),
                      }
                    );
                  }}
                >
                  Approve
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => {
                    const tags =
                      tagInputs[artwork._id]?.map((t) => t.value) || [];
                    const feedback = feedbackInputs[artwork._id]?.trim();

                    if (!tags.length || !feedback) {
                      toast.error(
                        "Both tags and feedback are required to reject."
                      );
                      return;
                    }

                    rejectMutation.mutate(
                      { id: artwork._id, tags, feedback },
                      {
                        onSuccess: () => {
                          toast.success("Artwork rejected");
                          setTagInputs((prev) => ({
                            ...prev,
                            [artwork._id]: [],
                          }));
                          setFeedbackInputs((prev) => ({
                            ...prev,
                            [artwork._id]: "",
                          }));
                          refetch();
                        },
                        onError: () => toast.error("Rejection failed"),
                      }
                    );
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
