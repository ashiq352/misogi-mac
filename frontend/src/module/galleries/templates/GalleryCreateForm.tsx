"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useArtworkAPI } from "@/module/artist/hooks/useArtworkAPI";
import { Textarea } from "@/components/ui/text-area";
import { useGalleryAPI } from "../hooks/useGalleryAPI";
import Link from "next/link";

type Artwork = {
  _id: string;
  title: string;
  imageUrl: string;
  medium: string;
};

export default function GalleryCreateForm() {
  const { useApprovedArtworks } = useArtworkAPI();
  const { data: artworks = [], isLoading } = useApprovedArtworks();
  const { useCreateGallery } = useGalleryAPI();
  const createMutation = useCreateGallery();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const toggleArtwork = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!name || selectedIds.length === 0) {
      toast.error("Gallery name and artworks are required.");
      return;
    }
    createMutation.mutate(
      {
        name,
        description,
        artworkRefs: selectedIds,
      },
      {
        onSuccess: () => {
          toast.success("Gallery published");
        },
        onError: () => {
          toast.error("Failed to publish gallery");
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold">Create New Gallery</h2>

      <div className="space-y-4">
        <Input
          placeholder="Gallery Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Select Artworks</h3>
        {isLoading ? (
          <p>Loading artworks...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {artworks.map((art: Artwork) => (
              <div
                key={art._id}
                onClick={() => toggleArtwork(art._id)}
                className={`cursor-pointer border rounded p-3 ${
                  selectedIds.includes(art._id)
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-medium">{art.title}</h4>
                <p className="text-sm text-gray-500">{art.medium}</p>
              </div>
            ))}
          </div>
        )}
        <p className="text-sm mt-2">{selectedIds.length} artwork(s) selected</p>
      </div>

      <Button onClick={handleSubmit} className="mt-4">
        Publish Gallery
      </Button>
      <Link href="/galleries" className="mt-4">
        Show Gallery
      </Link>
    </div>
  );
}
