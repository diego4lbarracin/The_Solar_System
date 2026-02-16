import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const PLANET_NAMES = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

const TravelCalculator = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originImage, setOriginImage] = useState(null);
  const [destinationImage, setDestinationImage] = useState(null);

  // Fetch planet image
  const fetchPlanetImage = async (planetName) => {
    if (!planetName) return null;
    try {
      const response = await fetch(
        `${API_URL}/planets/${planetName.toLowerCase()}/image`,
      );
      if (!response.ok) return null;
      const data = await response.json();
      return data.image_url;
    } catch (err) {
      console.error(`Failed to fetch image for ${planetName}:`, err);
      return null;
    }
  };

  // Fetch origin planet image
  useEffect(() => {
    if (origin) {
      fetchPlanetImage(origin).then(setOriginImage);
    } else {
      setOriginImage(null);
    }
  }, [origin]);

  // Fetch destination planet image
  useEffect(() => {
    if (destination) {
      fetchPlanetImage(destination).then(setDestinationImage);
    } else {
      setDestinationImage(null);
    }
  }, [destination]);

  const handleCalculate = async () => {
    if (!origin || !destination) {
      setError("Please select both an origin and a destination.");
      return;
    }
    if (origin === destination) {
      setError("Origin and destination must be different planets.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${API_URL}/planets/travel?origin=${origin}&destination=${destination}`,
      );
      if (!response.ok) throw new Error("Failed to calculate travel time");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-[Orbitron] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "#fbbf24" }}
          >
            How long does it take
            <br />
            to travel to …?
          </h1>
          <p
            className="font-[Inter] text-sm mt-4 max-w-lg mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            Select an origin and destination planet to calculate the travel time
            at the speed of light and at ~39,400 km/h (fastest human-rated
            spacecraft).
          </p>
        </motion.div>

        {/* Selector */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Origin */}
              <div>
                <label
                  className="block text-xs uppercase tracking-wider font-[Orbitron] mb-2"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  Origin
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-[Inter] text-sm focus:outline-none focus:border-solar-gold/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-gray-900">
                    Select a planet
                  </option>
                  {PLANET_NAMES.map((p) => (
                    <option key={p} value={p} className="bg-gray-900">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label
                  className="block text-xs uppercase tracking-wider font-[Orbitron] mb-2"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-[Inter] text-sm focus:outline-none focus:border-solar-gold/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-gray-900">
                    Select a planet
                  </option>
                  {PLANET_NAMES.map((p) => (
                    <option key={p} value={p} className="bg-gray-900">
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => {
                  const tempOrigin = origin;
                  const tempOriginImage = originImage;
                  setOrigin(destination);
                  setOriginImage(destinationImage);
                  setDestination(tempOrigin);
                  setDestinationImage(tempOriginImage);
                }}
                className="bg-white/5 hover:bg-white/10 border rounded-full w-10 h-10 flex items-center justify-center transition-all cursor-pointer"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
                aria-label="Swap planets"
              >
                <i
                  className="fas fa-exchange-alt text-sm"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              </button>
            </div>

            {/* Planet Images */}
            {(originImage || destinationImage) && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Origin Image */}
                {originImage && (
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-white/5 border border-white/10">
                    <img
                      src={originImage}
                      alt={origin}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white font-[Orbitron] text-sm font-semibold">
                        {origin}
                      </p>
                      <p className="text-white/50 font-[Inter] text-xs">
                        Origin
                      </p>
                    </div>
                  </div>
                )}
                {/* Destination Image */}
                {destinationImage && (
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-white/5 border border-white/10">
                    <img
                      src={destinationImage}
                      alt={destination}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white font-[Orbitron] text-sm font-semibold">
                        {destination}
                      </p>
                      <p className="text-white/50 font-[Inter] text-xs">
                        Destination
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Calculate button */}
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full hover:bg-opacity-30 border font-[Orbitron] text-sm py-3 rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "rgba(251, 191, 36, 0.2)",
                borderColor: "rgba(251, 191, 36, 0.4)",
                color: "#fbbf24",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin" />
                  Calculating...
                </span>
              ) : (
                "Calculate Travel Time"
              )}
            </button>

            {/* Error */}
            {error && (
              <motion.p
                className="text-red-400 text-sm text-center mt-4 font-[Inter]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              className="max-w-4xl mx-auto mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Route Header */}
              <div className="text-center mb-8">
                <p className="font-[Orbitron] text-lg sm:text-xl text-white">
                  <span style={{ color: "#fbbf24" }}>{result.origin}</span>
                  <i
                    className="fas fa-arrow-right mx-3 text-sm"
                    style={{ color: "rgba(255, 255, 255, 0.3)" }}
                  />
                  <span style={{ color: "#fbbf24" }}>{result.destination}</span>
                </p>
              </div>

              {/* Straight Radial Line */}
              {result.straight_radial_line && (
                <ResultSection
                  title="Straight Radial Line"
                  description={result.straight_radial_line.description}
                  distance={result.straight_radial_line.distance_km}
                  lightSpeed={result.straight_radial_line.travel_at_light_speed}
                  rocketSpeed={
                    result.straight_radial_line.travel_at_rocket_speed
                  }
                  icon="fa-ruler"
                />
              )}

              {/* Hohmann Transfer Orbit */}
              {result.hohmann_transfer_orbit && (
                <ResultSection
                  title="Hohmann Transfer Orbit"
                  description={result.hohmann_transfer_orbit.description}
                  distance={result.hohmann_transfer_orbit.arc_distance_km}
                  lightSpeed={
                    result.hohmann_transfer_orbit.travel_at_light_speed
                  }
                  rocketSpeed={
                    result.hohmann_transfer_orbit.travel_at_rocket_speed
                  }
                  transferTime={result.hohmann_transfer_orbit.transfer_time}
                  icon="fa-satellite"
                  extra={
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4 mb-4">
                      <p className="text-white/40 text-[0.65rem] uppercase tracking-wider font-[Orbitron] mb-1">
                        Semi-Major Axis
                      </p>
                      <p className="text-white text-sm font-semibold font-[Inter]">
                        {result.hohmann_transfer_orbit.semi_major_axis_km} km
                      </p>
                    </div>
                  }
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ResultSection = ({
  title,
  description,
  distance,
  lightSpeed,
  rocketSpeed,
  transferTime,
  icon,
  extra,
}) => (
  <motion.div
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-3 mb-4">
      <i className={`fas ${icon}`} style={{ color: "#fbbf24" }} />
      <h3
        className="font-[Orbitron] text-base sm:text-lg"
        style={{ color: "#fbbf24" }}
      >
        {title}
      </h3>
    </div>

    {description && (
      <p
        className="text-xs sm:text-sm font-[Inter] mb-6"
        style={{ color: "rgba(255, 255, 255, 0.4)" }}
      >
        {description}
      </p>
    )}

    {/* Distance */}
    <div className="bg-white/5 rounded-lg p-3 sm:p-4 mb-4">
      <p
        className="text-[0.65rem] uppercase tracking-wider font-[Orbitron] mb-1"
        style={{ color: "rgba(255, 255, 255, 0.4)" }}
      >
        Distance
      </p>
      <p className="text-white text-lg sm:text-xl font-semibold font-[Inter]">
        {distance} km
      </p>
    </div>

    {extra}

    {/* Transfer time (Hohmann only) */}
    {transferTime && (
      <div
        className="rounded-lg p-3 sm:p-4 mb-4"
        style={{
          backgroundColor: "rgba(251, 191, 36, 0.1)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgba(251, 191, 36, 0.2)",
        }}
      >
        <p
          className="text-[0.65rem] uppercase tracking-wider font-[Orbitron] mb-1"
          style={{ color: "rgba(251, 191, 36, 0.7)" }}
        >
          {transferTime.description || "Orbital Transfer Time"}
        </p>
        <p
          className="text-lg sm:text-xl font-bold font-[Inter]"
          style={{ color: "#fbbf24" }}
        >
          {transferTime.formatted}
        </p>
      </div>
    )}

    {/* Speed Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Light Speed */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <i className="fas fa-bolt text-xs" style={{ color: "#fde047" }} />
          <p
            className="text-[0.65rem] uppercase tracking-wider font-[Orbitron]"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            Speed of Light
          </p>
        </div>
        <p
          className="text-xs font-[Inter] mb-2"
          style={{ color: "rgba(255, 255, 255, 0.3)" }}
        >
          {lightSpeed.speed}
        </p>
        <p className="text-white text-base font-semibold font-[Inter]">
          {lightSpeed.formatted}
        </p>
      </div>

      {/* Rocket Speed */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <i className="fas fa-rocket text-xs" style={{ color: "#fb923c" }} />
          <p
            className="text-[0.65rem] uppercase tracking-wider font-[Orbitron]"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            Fastest Rocket
          </p>
        </div>
        <p
          className="text-xs font-[Inter] mb-2"
          style={{ color: "rgba(255, 255, 255, 0.3)" }}
        >
          {rocketSpeed.speed}
        </p>
        <p className="text-white text-base font-semibold font-[Inter]">
          {rocketSpeed.formatted}
        </p>
      </div>
    </div>
  </motion.div>
);

export default TravelCalculator;
