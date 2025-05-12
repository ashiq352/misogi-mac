"use client";

import { useState } from "react";
import ArtworkPreviewCard from "../components/ArtworkPreviewCard";
import ArtworkModal from "../components/ArtworkModal";
import FilterPanel from "../components/FilterPanel";

const dummyArtworks = [
  {
    id: "art1",
    title: "Whispers of Spring",
    imageUrl: "/artworks/spring1.jpg",
    artistName: "Aarav Mehta",
    medium: "Watercolor",
    dimensions: "30x40 cm",
    likes: 58,
  },
  {
    id: "art2",
    title: "Urban Dreams",
    imageUrl: "/artworks/urban.jpg",
    artistName: "Neha Kapoor",
    medium: "Digital",
    dimensions: "1920x1080 px",
    likes: 40,
  },
];

export default function GalleryDetail() {
  const [selectedArtwork, setSelectedArtwork] = useState<
    (typeof dummyArtworks)[0] | null
  >(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Spring Exhibition 2024</h1>

      <FilterPanel />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyArtworks.map((art) => (
          <div key={art.id} onClick={() => setSelectedArtwork(art)}>
            <ArtworkPreviewCard {...art} />
          </div>
        ))}
      </div>

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}
