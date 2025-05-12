import GalleryCard from "./GalleryCard";

const dummyGalleries = [
  {
    id: "1",
    name: "Spring Exhibition 2024",
    coverImage: "/galleries/spring.jpg",
    artworkCount: 12,
    createdAt: "2024-03-10",
  },
  {
    id: "2",
    name: "Modern Minimalism",
    coverImage: "/galleries/minimal.jpg",
    artworkCount: 8,
    createdAt: "2024-04-01",
  },
  {
    id: "3",
    name: "Color Explosion",
    coverImage: "/galleries/color.jpg",
    artworkCount: 15,
    createdAt: "2024-05-05",
  },
];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyGalleries.map((gallery) => (
        <GalleryCard key={gallery.id} {...gallery} />
      ))}
    </div>
  );
}