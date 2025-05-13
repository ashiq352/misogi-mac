import ReviewQueue from "@/module/curator/components/ReviewQueue";

export default function CuratorReviewPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Artworks for Review</h1>
      <ReviewQueue />
    </div>
  );
}
