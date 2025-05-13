"use client";

import ArtworkModal from "@/module/galleries/components/ArtworkModal";
import { useState } from "react";

export default function ArtworkDetailPage() {
  const [activeArtwork, setActiveArtwork] = useState(null);

  return (
    <div className="p-6">
      {activeArtwork && (
        <ArtworkModal
          artwork={activeArtwork}
          onClose={() => setActiveArtwork(null)}
        />
      )}
    </div>
  );
}
