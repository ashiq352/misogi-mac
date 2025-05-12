"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { TextInput } from "@/components/form/TextInput";

export default function FilterPanel() {
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [artistName, setArtistName] = useState("");

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Artworks</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Style/Tag Filter */}
        <div>
          <Label htmlFor="tag">Style (Tag)</Label>
          <select
            id="tag"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Styles</option>
            <option value="Abstract">Abstract</option>
            <option value="Portrait">Portrait</option>
            <option value="Landscape">Landscape</option>
            <option value="Conceptual">Conceptual</option>
          </select>
        </div>

        {/* Medium Filter */}
        <div>
          <Label htmlFor="medium">Medium</Label>
          <select
            id="medium"
            value={selectedMedium}
            onChange={(e) => setSelectedMedium(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Mediums</option>
            <option value="Oil">Oil</option>
            <option value="Watercolor">Watercolor</option>
            <option value="Digital">Digital</option>
            <option value="Acrylic">Acrylic</option>
          </select>
        </div>

        {/* Artist Filter */}
        <div>
          <Label htmlFor="artistName">Artist</Label>
          <TextInput
            id="artistName"
            label=""
            placeholder="Search by artist"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
