import ArtworkCard from "./ArtworkCard";

const mockArtworks = [
  {
    title: "Dreamscape",
    medium: "Digital",
    imageUrl: "/artworks/dreamscape.jpg",
    status: "PENDING",
  },
  {
    title: "The Mist",
    medium: "Oil",
    imageUrl: "/artworks/mist.jpg",
    status: "APPROVED",
  },
  {
    title: "Broken Silence",
    medium: "Acrylic",
    imageUrl: "/artworks/silence.jpg",
    status: "REJECTED",
    feedback: "Consider refining the background details.",
  },
] as const;

export default function SubmissionsList() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {mockArtworks.map((artwork, idx) => (
        <ArtworkCard key={idx} {...artwork} />
      ))}
    </div>
  );
}
