const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/diego4lbarracin"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-2xl no-underline"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")
              }
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="https://github.com/diego4lbarracin/The_Solar_System"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-2xl no-underline"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")
              }
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://diego4lbarracin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-2xl no-underline"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")
              }
              aria-label="Website"
            >
              <i className="fas fa-globe" />
            </a>
          </div>
          {/* Copyright */}
          <div className="text-center md:text-right">
            <p
              className="font-[Inter]"
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.875rem",
              }}
            >
              © 2026 All rights reserved
            </p>
            <p
              className="font-[Inter] mt-1"
              style={{
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "0.875rem",
              }}
            >
              Developed by{" "}
              <a
                href="https://diego4lbarracin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors no-underline"
                style={{ color: "rgba(251, 191, 36, 0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(251, 191, 36, 0.6)")
                }
              >
                diego4lbarracin
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
