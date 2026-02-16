const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../db");
const { calculateTravelTime } = require("../services/travelCalculator");

// GET /api/planets — Fetch all planets
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (error) {
    console.error("Error fetching planets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/planets/travel?origin=Earth&destination=Mars — Calculate travel time between planets
router.get("/travel", async (req, res) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        error: "Both 'origin' and 'destination' query parameters are required",
      });
    }

    // Normalize planet names (first letter uppercase)
    const originName =
      origin.charAt(0).toUpperCase() + origin.slice(1).toLowerCase();
    const destinationName =
      destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();

    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);

    // Fetch both planets
    const originPlanet = await collection.findOne({ name: originName });
    const destinationPlanet = await collection.findOne({
      name: destinationName,
    });

    if (!originPlanet) {
      return res
        .status(404)
        .json({ error: `Origin planet '${originName}' not found` });
    }

    if (!destinationPlanet) {
      return res
        .status(404)
        .json({ error: `Destination planet '${destinationName}' not found` });
    }

    // Calculate travel time
    const travelData = calculateTravelTime(originPlanet, destinationPlanet);

    res.json(travelData);
  } catch (error) {
    console.error("Error calculating travel time:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/planets/:name/image — Fetch only the image of a planet by name
router.get("/:name/image", async (req, res) => {
  try {
    const name =
      req.params.name.charAt(0).toUpperCase() +
      req.params.name.slice(1).toLowerCase();
    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const planet = await collection.findOne(
      { name },
      { projection: { image_url: 1, name: 1, _id: 0 } },
    );

    if (!planet) {
      return res.status(404).json({ error: `Planet '${name}' not found` });
    }

    if (!planet.image_url) {
      return res
        .status(404)
        .json({ error: `Image not found for planet '${name}'` });
    }

    res.json({ name: planet.name, image_url: planet.image_url });
  } catch (error) {
    console.error("Error fetching planet image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/planets/:name — Fetch a planet by name (first letter uppercase)
router.get("/:name", async (req, res) => {
  try {
    const name =
      req.params.name.charAt(0).toUpperCase() +
      req.params.name.slice(1).toLowerCase();
    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const planet = await collection.findOne({ name });

    if (!planet) {
      return res.status(404).json({ error: `Planet '${name}' not found` });
    }

    res.json(planet);
  } catch (error) {
    console.error("Error fetching planet:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
