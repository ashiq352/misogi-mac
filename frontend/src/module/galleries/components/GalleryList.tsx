/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GalleryCard from "./GalleryCard";
import FilterPanel from "./FilterPanel";
import { useState, useMemo, useEffect } from "react";
import { useTagAPI } from "@/module/tags/hooks/useTagAPI";
import { useGalleryAPI } from "../hooks/useGalleryAPI";
import { useRouter, useSearchParams } from "next/navigation";

type FilterState = {
  search: string;
  tag: string;
  medium: string;
  artist: string;
};

export default function GalleryList() {
  const { usePublicGalleries } = useGalleryAPI();
  const { useAllTags } = useTagAPI();

  const { data: galleries = [], isLoading } = usePublicGalleries();
  const { data: allTags = [] } = useAllTags();

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    tag: "",
    medium: "",
    artist: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      tag: searchParams.get("tag") || "",
      medium: searchParams.get("medium") || "",
      artist: searchParams.get("artist") || "",
    });
  }, [searchParams]);

  const updateFilters = (updated: FilterState) => {
    setFilters(updated);

    const params = new URLSearchParams();
    if (updated.search) params.set("search", updated.search);
    if (updated.tag) params.set("tag", updated.tag);
    if (updated.medium) params.set("medium", updated.medium);
    if (updated.artist) params.set("artist", updated.artist);

    router.push(`/galleries?${params.toString()}`);
  };

  const filteredGalleries = useMemo(() => {
    return galleries
      .map((g: any) => {
        const filteredArtworks = g.artworkRefs.filter((art: any) => {
          const matchTag =
            !filters.tag ||
            art.tags?.some((t: any) =>
              t.name.toLowerCase().includes(filters.tag.toLowerCase())
            );
          const matchMedium =
            !filters.medium ||
            art.medium.toLowerCase() === filters.medium.toLowerCase();
          const matchArtist =
            !filters.artist ||
            art.artistRef?.fullName
              ?.toLowerCase()
              .includes(filters.artist.toLowerCase());

          return matchTag && matchMedium && matchArtist;
        });

        return {
          ...g,
          filteredArtworks,
        };
      })
      .filter(
        (g: any) =>
          g.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          g.filteredArtworks.length > 0
      );
  }, [galleries, filters]);

  const mediumOptions: string[] = Array.from(
    new Set(
      galleries.flatMap((g: any) => g.artworkRefs.map((art: any) => art.medium))
    )
  );

  const artistOptions: string[] = Array.from(
    new Set(
      galleries
        .flatMap((g: any) =>
          g.artworkRefs.map((art: any) => art.artistRef?.fullName || "")
        )
        .filter(Boolean)
    )
  );

  const tagOptions = allTags.map((tag: any) => tag.name);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Explore Galleries</h1>

      <FilterPanel
        filters={filters}
        setFilters={updateFilters}
        tagOptions={tagOptions}
        mediumOptions={mediumOptions}
        artistOptions={artistOptions}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : filteredGalleries.length === 0 ? (
        <p>No galleries match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGalleries.map((g: any) => (
            <GalleryCard
              key={g._id}
              _id={g._id}
              name={g.name}
              artworkCount={g.filteredArtworks.length}
              thumbnailUrl={g.filteredArtworks?.[0]?.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
