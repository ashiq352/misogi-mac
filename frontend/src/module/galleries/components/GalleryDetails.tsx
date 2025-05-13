/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import ArtworkModal from "./ArtworkModal";
import { useGalleryAPI } from "../hooks/useGalleryAPI";
import { Modal } from "@/components/modal";
import { useModalStore } from "@/store/use-modal-store";

export default function GalleryDetail() {
  const { id } = useParams();
  const { useGalleryById } = useGalleryAPI();
  const { data: gallery, isLoading } = useGalleryById(id as string);

  const [activeArtwork, setActiveArtwork] = useState<any | null>(null);

  if (isLoading) return <p className="p-6">Loading gallery...</p>;
  if (!gallery) return <p className="p-6 text-red-500">Gallery not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{gallery.name}</h1>
      {gallery.description && (
        <p className="text-gray-600 mb-4">{gallery.description}</p>
      )}

      <div className="flex flex-wrap gap-6">
        {gallery.artworkRefs.map((artwork: any) => (
          <div
            key={artwork._id}
            className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]
              cursor-pointer border rounded shadow-sm bg-white hover:shadow transition"
            onClick={() => {
              setActiveArtwork(artwork);
              useModalStore.getState().openModal("artwork-preview");
            }}
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-3">
              <h3 className="font-medium">{artwork.title}</h3>
              <p className="text-sm text-gray-500">{artwork.medium}</p>
              <p className="text-sm text-gray-500 italic">
                by {artwork.artistRef?.fullName || "Unknown Artist"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activeArtwork && (
        <Modal
          modalId="artwork-preview"
          onClose={() => setActiveArtwork(null)}
          title={activeArtwork?.title}
          width="max-w-4xl"
        >
          <ArtworkModal
            artwork={{
              _id: activeArtwork._id,
              title: activeArtwork.title,
              imageUrl: activeArtwork.imageUrl,
              medium: activeArtwork.medium,
              dimensions: activeArtwork.dimensions,
              artistRef: activeArtwork.artistRef,
            }}
            onClose={() => setActiveArtwork(null)}
          />
        </Modal>
      )}
    </div>
  );
}
