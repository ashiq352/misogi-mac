"use client";
import Link from "next/link";
import { useArtworkAPI } from "../hooks/useArtworkAPI";
import ArtworkCard from "./ArtworkCard";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { IArtworkCard } from "../types";


export default function SubmissionsList() {
  const { useMyArtworks } = useArtworkAPI();
  const { data: artworks, refetch, isLoading, isError } = useMyArtworks();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load artworks.</p>;

  if (!artworks?.length)
    return <p className="text-gray-500">No artworks submitted yet.</p>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork: IArtworkCard) => (
        <ArtworkCard
          refetch={refetch}
          key={artwork?._id}
          id={artwork?._id}
          {...artwork}
        />
      ))}
      <Link href={routes.artist.newArtwork}>
        <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Upload New Artwork
        </Button>
      </Link>
    </div>
  );
}
