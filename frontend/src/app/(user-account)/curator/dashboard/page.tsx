const stats = [
  {
    title: "Pending Reviews",
    count: 12,
    description: "Artworks awaiting your review",
  },
  {
    title: "Approved Artworks",
    count: 35,
    description: "Artworks approved and ready",
  },
  {
    title: "Published Galleries",
    count: 5,
    description: "Galleries visible to visitors",
  },
];

export default function CuratorDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Curator Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Track your review progress and manage published galleries.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-3xl font-bold my-2">{item.count}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
