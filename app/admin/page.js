export default function AdminDashboard() {
  const cards = [
    { title: "Total Properties", value: "12", color: "text-brand-primary" },
    { title: "Active Cities", value: "5", color: "text-blue-500" },
    { title: "New Enquiries", value: "3", color: "text-purple-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-brand-dark">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md border border-gray-100"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {card.title}
            </h3>
            <p className={`mt-2 font-heading text-4xl ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="mt-10">
        <h2 className="mb-4 font-heading text-xl text-brand-dark">
          Recent Activity
        </h2>
        <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 text-center text-gray-400 italic">
            No recent activity to show.
          </div>
        </div>
      </div>
    </div>
  );
}
