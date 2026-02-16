import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(`${API_URL}/planets`);
        if (!response.ok) throw new Error("Failed to fetch planets");
        const data = await response.json();
        setPlanets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return planets.length - 1;
      if (next >= planets.length) return 0;
      return next;
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 600 : -600,
      opacity: 0,
      scale: 0.8,
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="font-[Orbitron] text-xl"
          style={{ color: "#fbbf24" }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading planets...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-red-400 text-4xl mb-4" />
          <p className="text-red-400 font-[Inter]">{error}</p>
          <p className="text-white/40 text-sm mt-2 font-[Inter]">
            Make sure the backend server is running.
          </p>
        </div>
      </div>
    );
  }

  if (planets.length === 0) return null;

  const planet = planets[currentIndex];

  return (
    <div className="relative z-10 min-h-screen py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-[Orbitron] text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: "#fbbf24" }}
          >
            The Planets
          </h1>
          <p
            className="font-[Inter] text-sm mt-3"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            Explore each planet in our Solar System
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/15 border rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all cursor-pointer -ml-2 sm:-ml-6"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            aria-label="Previous planet"
          >
            <i
              className="fas fa-chevron-left"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/15 border rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all cursor-pointer -mr-2 sm:-mr-6"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            aria-label="Next planet"
          >
            <i
              className="fas fa-chevron-right"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            />
          </button>

          {/* Planet Card */}
          <div className="overflow-hidden px-8 sm:px-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Planet Image */}
                {planet.image_url && (
                  <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                    <img
                      src={planet.image_url}
                      alt={planet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <h2 className="absolute bottom-4 left-6 font-[Orbitron] text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {planet.name}
                    </h2>
                  </div>
                )}

                {/* Planet Info */}
                <div className="p-6 sm:p-8 space-y-6">
                  {planet.description && (
                    <p
                      className="text-sm sm:text-base leading-relaxed font-[Inter]"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {planet.description}
                    </p>
                  )}

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {planet.distance_from_sun && (
                      <InfoCard
                        label="Distance from Sun"
                        value={`${planet.distance_from_sun.km} km`}
                        sub={`${planet.distance_from_sun.au} AU`}
                      />
                    )}
                    {planet.diameter && (
                      <InfoCard label="Diameter" value={planet.diameter} />
                    )}
                    {planet.day_length && (
                      <InfoCard label="Day Length" value={planet.day_length} />
                    )}
                    {planet.year_length && (
                      <InfoCard
                        label="Year Length"
                        value={planet.year_length}
                      />
                    )}
                    {planet.gravity && (
                      <InfoCard label="Gravity" value={planet.gravity} />
                    )}
                    {planet.moons !== undefined && (
                      <InfoCard
                        label="Moons"
                        value={
                          typeof planet.moons === "number"
                            ? planet.moons.toString()
                            : planet.moons
                        }
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {planets.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className="rounded-full transition-all cursor-pointer border-none hover:bg-white/40"
                style={{
                  backgroundColor:
                    i === currentIndex ? "#fbbf24" : "rgba(255, 255, 255, 0.2)",
                  width: i === currentIndex ? "1.5rem" : "0.5rem",
                  height: "0.5rem",
                }}
                aria-label={`Go to planet ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, sub }) => (
  <div className="bg-white/5 rounded-lg p-3 sm:p-4">
    <p
      className="text-[0.65rem] uppercase tracking-wider font-[Orbitron] mb-1"
      style={{ color: "rgba(255, 255, 255, 0.4)" }}
    >
      {label}
    </p>
    <p className="text-white text-sm font-semibold font-[Inter]">{value}</p>
    {sub && (
      <p
        className="text-xs font-[Inter] mt-0.5"
        style={{ color: "rgba(251, 191, 36, 0.6)" }}
      >
        {sub}
      </p>
    )}
  </div>
);

export default Planets;
