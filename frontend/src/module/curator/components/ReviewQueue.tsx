"use client";
import CuratorReviewCard from "./CuratorReviewCard";

const mockReviewItems = [
  {
    id: "1",
    title: "Whispers of Nature",
    medium: "Watercolor",
    imageUrl: "/artworks/nature.jpg",
  },
  {
    id: "2",
    title: "Echoes of Time",
    medium: "Acrylic",
    imageUrl: "/artworks/echoes.jpg",
  },
];

export default function ReviewQueue() {
  const handleApprove = (id: string) => {
    console.log("Approved:", id);
  };

  const handleReject = (id: string, feedback: string) => {
    console.log("Rejected:", id, "with feedback:", feedback);
  };

  const handleTagChange = (id: string, tag: string) => {
    console.log("Tag changed for", id, "to", tag);
  };

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {mockReviewItems.map((item) => (
        <CuratorReviewCard
          key={item.id}
          {...item}
          onApprove={handleApprove}
          onReject={handleReject}
          onTagChange={handleTagChange}
        />
      ))}
    </div>
  );
}
