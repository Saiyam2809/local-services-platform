import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <div className="card">
        <h1 className="title">Local Services Platform</h1>
        <p className="subtitle">Please login or register</p>

        <div className="buttonGroup">
          <Link href="/register">
            <button className="btn primary">Register</button>
          </Link>

          <Link href="/login">
            <button className="btn secondary">Login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}