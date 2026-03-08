"use client";

export default function Header() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="header">

      <h3>Welcome Back</h3>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}