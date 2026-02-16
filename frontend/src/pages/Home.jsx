import { motion } from "framer-motion";
import SolarSystemOrrery from "../components/SolarSystemOrrery";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const Home = () => {
  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 text-center">
        <div className="max-w-[1200px] mx-auto w-full">
          <motion.h1
            className="font-[Orbitron] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider"
            style={{
              background:
                "linear-gradient(135deg, #fbbf24, #f59e0b, #fff7a0, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            The Solar System
          </motion.h1>

          <motion.div
            className="mt-14 max-w-3xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-[Inter]">
              Our Solar System is a gravitationally bound system comprising the
              Sun and the objects that orbit it. Formed approximately{" "}
              <span className="font-semibold" style={{ color: "#fbbf24" }}>
                4.6 billion years ago
              </span>{" "}
              from the collapse of a giant molecular cloud, it resides in the{" "}
              <span className="font-semibold" style={{ color: "#fbbf24" }}>
                Orion Arm
              </span>{" "}
              of the{" "}
              <span className="font-semibold" style={{ color: "#fbbf24" }}>
                Milky Way galaxy
              </span>
              , about 26,000 light-years from the Galactic Center.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 max-w-3xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <p
              className="text-sm sm:text-base leading-relaxed font-[Inter]"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              It consists of eight planets — Mercury, Venus, Earth, Mars,
              Jupiter, Saturn, Uranus, and Neptune — along with dwarf planets,
              hundreds of moons, millions of asteroids, comets, and other small
              bodies. The Sun, a G-type main-sequence star, contains 99.86% of
              the system's known mass and dominates it gravitationally. Jupiter
              and Saturn, the two largest planets, account for the bulk of the
              remaining mass.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 max-w-3xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <p
              className="text-sm sm:text-base leading-relaxed font-[Inter]"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              The four inner planets — Mercury, Venus, Earth, and Mars — are
              rocky terrestrial planets with solid surfaces. The four outer
              planets — Jupiter, Saturn, Uranus, and Neptune — are far more
              massive: Jupiter and Saturn are gas giants composed mainly of
              hydrogen and helium, while Uranus and Neptune are ice giants with
              mantles rich in water, ammonia, and methane. Beyond Neptune lies
              the Kuiper Belt and the Oort Cloud, vast regions populated by icy
              objects and the source of many comets that visit the inner Solar
              System.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <i
              className="fas fa-chevron-down text-2xl"
              style={{ color: "rgba(255, 255, 255, 0.3)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Solar System Orrery Section */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-[Orbitron] text-2xl sm:text-3xl md:text-4xl font-semibold mb-4"
              style={{ color: "#fbbf24" }}
            >
              The Planets in Orbit
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <SolarSystemOrrery />
          </motion.div>
        </div>
      </section>

      {/* Quick Facts Grid */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-[Orbitron] text-2xl sm:text-3xl md:text-4xl font-semibold mb-4"
              style={{ color: "#fbbf24" }}
            >
              Quick Facts
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "fa-sun", title: "Age", value: "~4.6 Billion Years" },
              { icon: "fa-globe", title: "Planets", value: "8" },
              { icon: "fa-star", title: "Galaxy", value: "Milky Way" },
              { icon: "fa-satellite", title: "Known Moons", value: "290+" },
            ].map((fact, i) => (
              <motion.div
                key={fact.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 text-center transition-all hover:border-white/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <i
                  className={`fas ${fact.icon} text-2xl mb-3`}
                  style={{ color: "#fbbf24" }}
                />
                <h3
                  className="font-[Orbitron] text-xs uppercase tracking-widest mb-2"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  {fact.title}
                </h3>
                <p className="font-[Inter] text-xl font-semibold text-white">
                  {fact.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
