import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Player from "./models/Player.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://w0062870:test1234@clicker.19ongja.mongodb.net/clicker-game?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Click endpoint
app.post("/api/click", async (req, res) => {
  try {
    const { walletAddress, clicks } = req.body;

    if (!walletAddress || typeof clicks !== "number") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Find or create player
    let player = await Player.findOne({ walletAddress });

    if (!player) {
      player = new Player({ walletAddress });
    }

    // Update player data
    player.clicks += clicks;
    player.score += clicks;
    player.lastClick = Date.now();

    await player.save();

    res.json({
      walletAddress: player.walletAddress,
      score: player.score,
      clicks: player.clicks,
    });
  } catch (error) {
    console.error("Error processing click:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get player stats
app.get("/api/stats/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const player = await Player.findOne({ walletAddress });

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get leaderboard
app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Player.find()
      .sort({ score: -1 })
      .limit(100)
      .select("walletAddress score clicks");

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
