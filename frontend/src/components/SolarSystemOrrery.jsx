import { motion } from "framer-motion";

const PLANETS = [
  { name: "Mercury", color: "#b5b5b5", size: 32, orbitRadius: 16 },
  { name: "Venus", color: "#e8cda0", size: 36, orbitRadius: 26 },
  { name: "Earth", color: "#4da6ff", size: 38, orbitRadius: 38 },
  { name: "Mars", color: "#e07a5f", size: 33, orbitRadius: 50 },
  { name: "Jupiter", color: "#d4a56a", size: 56, orbitRadius: 64 },
  { name: "Saturn", color: "#e8d5a3", size: 50, orbitRadius: 78 },
  { name: "Uranus", color: "#7ec8e3", size: 42, orbitRadius: 92 },
  { name: "Neptune", color: "#4a6fa5", size: 42, orbitRadius: 106 },
];

const SolarSystemOrrery = () => {
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
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
                borderRadius: "50%",
                boxShadow: `0 0 ${planet.size}px 2px ${planet.color}44`,
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
