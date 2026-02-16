import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/planets", label: "The Planets" },
    { to: "/travel", label: "How long does it take to travel to …?" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16">
          {/* Logo / Title */}
          <Link
            to="/"
            className="font-[Orbitron] text-xl sm:text-2xl font-bold hover:opacity-80 transition-opacity no-underline"
            style={{ color: "#fbbf24" }}
          >
            The Solar System
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="font-[Inter] text-base transition-colors no-underline"
                style={({ isActive }) => ({
                  color: isActive ? "#fbbf24" : "#ffffff",
                })}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
                onMouseLeave={(e) => {
                  const isActive = window.location.pathname === link.to;
                  e.currentTarget.style.color = isActive
                    ? "#fbbf24"
                    : "#ffffff";
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer text-xl"
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/90 border-b border-white/10"
          >
            <div style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
              <div className="max-w-[1400px] mx-auto py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="font-[Inter] text-base transition-colors no-underline"
                    style={({ isActive }) => ({
                      color: isActive ? "#fbbf24" : "#ffffff",
                    })}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#fbbf24")
                    }
                    onMouseLeave={(e) => {
                      const isActive = window.location.pathname === link.to;
                      e.currentTarget.style.color = isActive
                        ? "#fbbf24"
                        : "#ffffff";
                    }}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
