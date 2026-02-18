// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

const sections = [
  { name: "Home", path: "/" },
  { name: "Spotlight Stories", path: "/section/spotlight" },
  { name: "Understanding Cancer", path: "/section/understanding" },
  { name: "Prevention & Wellness", path: "/section/prevention" },
  { name: "In the News", path: "/section/news" },
  { name: "Creative Corner", path: "/section/creative" },
];

export default function Navbar() {
  return (
    <nav className="bg-green-50/50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-green-900 font-serif text-lg tracking-widest uppercase">
          curingwithCARE Blog
        </div>
        <div className="flex gap-6">
          {sections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              className={({ isActive }) =>
                `text-green-900 font-light tracking-wide uppercase text-sm transition-colors ${
                  isActive
                    ? "border-b-2 border-green-700 pb-0.5"
                    : "hover:text-green-700"
                }`
              }
            >
              {section.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
