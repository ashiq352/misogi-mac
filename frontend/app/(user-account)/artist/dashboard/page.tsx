"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";

export default function ArtistDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome to your Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your submissions and view feedback from curators.
      </p>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <DashboardCard title="Total Uploads" count={24} />
        <DashboardCard title="Pending Review" count={5} />
        <DashboardCard title="Approved" count={15} />
        <DashboardCard title="Rejected" count={4} />
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <Link href={routes.artist.newArtwork}>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Upload New Artwork
          </Button>
        </Link>
        <Link href={routes.artist.submissions}>
          <Button className="border px-4 py-2 rounded hover:bg-gray-50">
            View All Submissions
          </Button>
        </Link>
      </div>

      {/* Optional: Latest feedback */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Feedback</h2>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
          <li>
            &quot;Great concept, try enhancing the background.&quot; – on
            *Abstract Dawn*
          </li>
          <li>
            &quot;Use bolder strokes for impact.&quot; – on *Urban Dreams*
          </li>
        </ul>
      </div>
    </div>
  );
}

function DashboardCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white border rounded shadow-sm p-4">
      <h3 className="text-md font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-1">{count}</p>
    </div>
  );
}
