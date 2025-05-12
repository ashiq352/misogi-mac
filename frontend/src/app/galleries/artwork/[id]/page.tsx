import ArtworkModal from "@/module/galleries/components/ArtworkModal";

const dummyArtwork = {
  id: "art1",
  title: "Whispers of Spring",
  imageUrl: "/artworks/spring1.jpg",
  artistName: "Aarav Mehta",
  medium: "Watercolor",
  dimensions: "30x40 cm",
  likes: 58,
};

export default function ArtworkDetailPage() {
  return (
    <div className="p-6">
      <ArtworkModal artwork={dummyArtwork} onClose={() => {}} />
    </div>
  );
}
