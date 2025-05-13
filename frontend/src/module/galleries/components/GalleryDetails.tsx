"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import ArtworkModal from "./ArtworkModal";
import { useGalleryAPI } from "../hooks/useGalleryAPI";

export default function GalleryDetail() {
  const { id } = useParams();
  const { useGalleryById } = useGalleryAPI();
  const { data: gallery, isLoading } = useGalleryById(id as string);

  const [activeArtwork, setActiveArtwork] = useState(null);

  if (isLoading) return <p className="p-6">Loading gallery...</p>;
  if (!gallery) return <p className="p-6 text-red-500">Gallery not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{gallery.name}</h1>
      {gallery.description && (
        <p className="text-gray-600 mb-4">{gallery.description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.artworkRefs.map(
          (
            artwork: any
            //     {
            //     _id: string;
            //     title: string;
            //     medium: string;
            //     artistRef: { fullName: string };
            //   }
          ) => (
            <div
              key={artwork._id}
              className="cursor-pointer border rounded shadow-sm bg-white hover:shadow"
              onClick={() => setActiveArtwork(artwork)}
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
          )
        )}
      </div>

      {activeArtwork && (
        <ArtworkModal
          artwork={activeArtwork}
          onClose={() => setActiveArtwork(null)}
          onLike={function (): void {
            throw new Error("Function not implemented.");
          }}
          hasLiked={false}
        />
      )}
    </div>
  );
}
