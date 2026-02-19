// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const sections = [
  { name: "Home", path: "/" },
  { name: "Spotlight Stories", path: "/section/spotlight" },
  { name: "Understanding Cancer", path: "/section/understanding" },
  { name: "Prevention & Wellness", path: "/section/prevention" },
  { name: "In the News", path: "/section/news" },
  { name: "Creative Corner", path: "/section/creative" },
];

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-green-50/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="text-green-900 font-serif text-lg tracking-widest uppercase whitespace-nowrap">
          curingwithCARE Blog
        </div>

        {/* Links + Profile */}
        <div className="flex items-center gap-6">

          {/* Section Links */}
          {sections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              className={({ isActive }) =>
                `text-green-900 font-light tracking-wide uppercase text-sm transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-b border-green-800 pb-0.5"
                    : "hover:text-green-700"
                }`
              }
            >
              {section.name}
            </NavLink>
          ))}

          {/* Profile Icon */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-green-900 hover:text-green-700 transition"
            >
              <User size={20} />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white border border-black/5 rounded-md shadow-sm py-2 text-sm font-light tracking-wide uppercase text-green-900">
                
                {!user ? (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-50/60"
                  >
                    Login
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/editor");
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-50/60"
                    >
                      Editor Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-green-50/60"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
