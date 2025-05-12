import SubmissionsList from "@/module/artist/components/SubmissionsList";

export default function ArtistSubmissionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Art Submissions</h1>
      <SubmissionsList />
    </div>
  );
}
