"use client";

interface ArtworkCardProps {
  title: string;
  medium: string;
  imageUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedback?: string;
}

export default function ArtworkCard({
  title,
  medium,
  imageUrl,
  status,
  feedback,
}: ArtworkCardProps) {
  const statusColor = {
    PENDING: "text-yellow-500",
    APPROVED: "text-green-600",
    REJECTED: "text-red-500",
  }[status];

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">Medium: {medium}</p>
      <p className={`text-sm font-medium ${statusColor}`}>Status: {status}</p>
      {status === "REJECTED" && feedback && (
        <p className="text-sm mt-2 text-gray-700 italic">
          Feedback: {feedback}
        </p>
      )}
    </div>
  );
}
