import { motion } from "framer-motion";

const PLANETS = [
  { name: "Mercury", color: "#b5b5b5", size: 10, orbitRadius: 12 },
  { name: "Venus", color: "#e8cda0", size: 13, orbitRadius: 18 },
  { name: "Earth", color: "#4da6ff", size: 14, orbitRadius: 24 },
  { name: "Mars", color: "#e07a5f", size: 11, orbitRadius: 30 },
  { name: "Jupiter", color: "#d4a56a", size: 22, orbitRadius: 40 },
  { name: "Saturn", color: "#e8d5a3", size: 19, orbitRadius: 50 },
  { name: "Uranus", color: "#7ec8e3", size: 16, orbitRadius: 60 },
  { name: "Neptune", color: "#4a6fa5", size: 16, orbitRadius: 70 },
];

const SolarSystemOrrery = () => {
  return (
    <div className="orrery-container">
      {/* Sun */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: 45,
          height: 45,
          background:
            "radial-gradient(circle, #fff7a0, #fbbf24, #f59e0b, #d97706)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 40px 15px rgba(251,191,36,0.4)",
        }}
        animate={{
          boxShadow: [
            "0 0 30px 10px rgba(251,191,36,0.3)",
            "0 0 50px 15px rgba(251,191,36,0.5)",
            "0 0 30px 10px rgba(251,191,36,0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Orbits and Planets */}
      {PLANETS.map((planet) => {
        const orbitSize = `${planet.orbitRadius * 2}%`;

        return (
          <div key={planet.name}>
            {/* Orbit Ring */}
            <div
              className="orbit-ring"
              style={{ width: orbitSize, height: orbitSize }}
            />
          </div>
        );
      })}

      {/* Orbiting planets using rotate trick */}
      {PLANETS.map((planet) => {
        const orbitPx = (planet.orbitRadius / 100) * 475;
        return (
          <motion.div
            key={`orbit-${planet.name}`}
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
            <div
              style={{
                position: "absolute",
                left: orbitPx,
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
                left: orbitPx + planet.size + 6,
                top: -planet.size / 2 - 2,
                fontSize: "0.7rem",
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
