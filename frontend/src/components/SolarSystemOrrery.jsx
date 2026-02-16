import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PLANETS = [
  { name: "Mercury", color: "#b5b5b5", size: 40, orbitRadius: 16 },
  { name: "Venus", color: "#e8cda0", size: 46, orbitRadius: 26 },
  { name: "Earth", color: "#4da6ff", size: 48, orbitRadius: 38 },
  { name: "Mars", color: "#e07a5f", size: 42, orbitRadius: 50 },
  { name: "Jupiter", color: "#d4a56a", size: 70, orbitRadius: 64 },
  { name: "Saturn", color: "#e8d5a3", size: 64, orbitRadius: 78 },
  { name: "Uranus", color: "#7ec8e3", size: 52, orbitRadius: 92 },
  { name: "Neptune", color: "#4a6fa5", size: 52, orbitRadius: 106 },
];

const SolarSystemOrrery = () => {
  const [planetImages, setPlanetImages] = useState({});

  useEffect(() => {
    // Fetch images for all planets
    const fetchImages = async () => {
      const images = {};
      for (const planet of PLANETS) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/planets/${planet.name.toLowerCase()}/image`,
          );
          if (response.ok) {
            const data = await response.json();
            images[planet.name] = data.image_url;
          } else {
            console.warn(
              `Failed to fetch image for ${planet.name}: ${response.status}`,
            );
          }
        } catch (error) {
          console.error(`Failed to fetch image for ${planet.name}:`, error);
        }
      }
      setPlanetImages(images);
    };

    fetchImages();
  }, []);

  return (
    <div className="orrery-container">
      {/* Sun */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: 70,
          height: 70,
          background:
            "radial-gradient(circle, #fff7a0, #fbbf24, #f59e0b, #d97706)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 60px 20px rgba(251,191,36,0.5)",
        }}
        animate={{
          boxShadow: [
            "0 0 50px 15px rgba(251,191,36,0.4)",
            "0 0 70px 25px rgba(251,191,36,0.6)",
            "0 0 50px 15px rgba(251,191,36,0.4)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Sun Label */}
      <span
        className="planet-label"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 50px)",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "rgba(251, 191, 36, 0.9)",
        }}
      >
        Sun
      </span>

      {/* Orbits */}
      {PLANETS.map((planet) => {
        const orbitSize = `${planet.orbitRadius}%`;
        return (
          <div
            key={`orbit-${planet.name}`}
            className="orbit-ring"
            style={{ width: orbitSize, height: orbitSize }}
          />
        );
      })}

      {/* Orbiting Planets */}
      {PLANETS.map((planet) => {
        // Calculate orbit radius in pixels (475px is half of max container width 950px)
        const orbitRadiusPx = (planet.orbitRadius / 100) * 475;

        return (
          <motion.div
            key={`planet-${planet.name}`}
            className="absolute top-1/2 left-1/2"
            style={{
              width: 0,
              height: 0,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 15 + planet.orbitRadius * 0.6,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Planet positioned on the orbit */}
            <div
              style={{
                position: "absolute",
                left: orbitRadiusPx - planet.size / 2,
                top: -planet.size / 2,
                width: planet.size,
                height: planet.size,
                background: planetImages[planet.name]
                  ? `url(${planetImages[planet.name]}) center/cover`
                  : `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                borderRadius: "50%",
                boxShadow: `0 0 ${planet.size}px 2px ${planet.color}44`,
                overflow: "hidden",
              }}
            />
            {/* Planet label */}
            <span
              className="planet-label"
              style={{
                left: orbitRadiusPx + planet.size / 2 + 8,
                top: -planet.size / 2 - 2,
                fontSize: "0.95rem",
                fontWeight: "600",
              }}
            >
              {planet.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SolarSystemOrrery;
