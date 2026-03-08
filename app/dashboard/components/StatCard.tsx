export default function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="stat-card">

      <h3>{value}</h3>

      <p>{title}</p>

    </div>
  );
}