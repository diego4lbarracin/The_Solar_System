/**
 * Service for calculating travel time between planets
 */

const SPEED_OF_LIGHT_KM_S = 299792; // km/s
const FASTEST_ROCKET_KM_H = 39400; // km/h
const SUN_GRAVITATIONAL_PARAMETER = 1.327e11; // km³/s² (μ for the Sun)

/**
 * Parse distance string with commas to number
 * @param {string} distanceStr - Distance string like "149,598,262"
 * @returns {number} - Distance as number
 */
function parseDistance(distanceStr) {
  return parseFloat(distanceStr.replace(/,/g, ""));
}

/**
 * Format time duration into human-readable format
 * @param {number} seconds - Time in seconds
 * @returns {object} - Object with different time units
 */
function formatTime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return {
    total_seconds: seconds,
    days,
    hours,
    minutes,
    seconds: secs,
    formatted: `${days} days, ${hours} hours, ${minutes} minutes, ${secs} seconds`,
  };
}

/**
 * Calculate Hohmann transfer orbit parameters
 * @param {number} r1 - Origin orbit radius (km from sun)
 * @param {number} r2 - Destination orbit radius (km from sun)
 * @returns {object} - Hohmann transfer parameters
 */
function calculateHohmannTransfer(r1, r2) {
  // Semi-major axis of the transfer ellipse
  const semiMajorAxis = (r1 + r2) / 2;

  // Transfer time (half period of the elliptical orbit): t = π * sqrt(a³ / μ)
  const transferTimeSeconds =
    Math.PI *
    Math.sqrt(Math.pow(semiMajorAxis, 3) / SUN_GRAVITATIONAL_PARAMETER);

  // Approximate arc length of half the ellipse
  // Using Ramanujan's approximation: L ≈ π * (a + b) - π * sqrt(2*a*b)
  // For Hohmann transfer: semi-minor axis b = sqrt(r1 * r2)
  const semiMinorAxis = Math.sqrt(r1 * r2);
  const arcDistance =
    Math.PI * (semiMajorAxis + semiMinorAxis) -
    Math.PI * Math.sqrt(2 * semiMajorAxis * semiMinorAxis);

  return {
    semi_major_axis_km: semiMajorAxis,
    arc_distance_km: arcDistance,
    transfer_time_seconds: transferTimeSeconds,
  };
}

/**
 * Calculate travel time between two planets
 * @param {object} originPlanet - Origin planet data
 * @param {object} destinationPlanet - Destination planet data
 * @returns {object} - Travel time calculations
 */
function calculateTravelTime(originPlanet, destinationPlanet) {
  const originDistance = parseDistance(originPlanet.distance_from_sun.km);
  const destinationDistance = parseDistance(
    destinationPlanet.distance_from_sun.km,
  );

  // Straight radial line distance (absolute difference in orbital radii)
  const radialDistance = Math.abs(destinationDistance - originDistance);

  // Calculate time at speed of light (in seconds) for radial distance
  const timeAtLightSpeedRadial = radialDistance / SPEED_OF_LIGHT_KM_S;

  // Calculate time at rocket speed for radial distance
  const rocketSpeedKmPerSecond = FASTEST_ROCKET_KM_H / 3600;
  const timeAtRocketSpeedRadial = radialDistance / rocketSpeedKmPerSecond;

  // Calculate Hohmann transfer orbit
  const hohmannTransfer = calculateHohmannTransfer(
    originDistance,
    destinationDistance,
  );

  // Calculate travel time at rocket speed for Hohmann arc distance
  const timeAtRocketSpeedHohmann =
    hohmannTransfer.arc_distance_km / rocketSpeedKmPerSecond;

  // Calculate travel time at light speed for Hohmann arc distance
  const timeAtLightSpeedHohmann =
    hohmannTransfer.arc_distance_km / SPEED_OF_LIGHT_KM_S;

  return {
    origin: originPlanet.name,
    destination: destinationPlanet.name,
    straight_radial_line: {
      distance_km: radialDistance.toLocaleString("en-US"),
      description:
        "Direct radial distance between orbital radious (not accounting for orbital mechanics)",
      travel_at_light_speed: {
        speed: `${SPEED_OF_LIGHT_KM_S.toLocaleString("en-US")} km/s`,
        ...formatTime(timeAtLightSpeedRadial),
      },
      travel_at_rocket_speed: {
        speed: `${FASTEST_ROCKET_KM_H.toLocaleString("en-US")} km/h`,
        ...formatTime(timeAtRocketSpeedRadial),
      },
    },
    hohmann_transfer_orbit: {
      description:
        "Most fuel-efficient trajectory using elliptical transfer orbit",
      semi_major_axis_km:
        hohmannTransfer.semi_major_axis_km.toLocaleString("en-US"),
      arc_distance_km: hohmannTransfer.arc_distance_km.toLocaleString("en-US"),
      transfer_time: {
        description: "Actual transfer time following orbital mechanics",
        ...formatTime(hohmannTransfer.transfer_time_seconds),
      },
      travel_at_light_speed: {
        description:
          "Hypothetical time at light speed following the arc distance",
        speed: `${SPEED_OF_LIGHT_KM_S.toLocaleString("en-US")} km/s`,
        ...formatTime(timeAtLightSpeedHohmann),
      },
      travel_at_rocket_speed: {
        description:
          "Hypothetical time at constant rocket speed following the arc distance",
        speed: `${FASTEST_ROCKET_KM_H.toLocaleString("en-US")} km/h`,
        ...formatTime(timeAtRocketSpeedHohmann),
      },
    },
  };
}

module.exports = { calculateTravelTime };
