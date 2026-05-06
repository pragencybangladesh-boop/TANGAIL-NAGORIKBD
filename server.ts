import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Weather proxy - Fallback for browser-blocked requests
  app.get("/api/weather-proxy", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon" });

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_hours=24&timezone=auto`;
      const response = await fetch(url);
      if (!response.ok) {
          const text = await response.text();
          throw new Error(`Open-Meteo API error: ${response.status} ${text}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("Weather Proxy Error:", error);
      res.status(500).json({ 
          error: "Failed to fetch weather from proxy", 
          details: error.message 
      });
    }
  });

  // Geocoding proxy to avoid CORS/Blocked domain issues
  app.get("/api/reverse-geo", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon" });

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&email=pr.agency.bangladesh@gmail.com`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'NagorikBD-Portal'
        }
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Geocoding API error: ${response.status} ${text}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("Geocoding Proxy Error:", error);
      res.status(500).json({ 
          error: "Failed to fetch geocoding from proxy",
          details: error.message
      });
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Gemini Chat Proxy
  app.post("/api/chat", async (req, res) => {
    const { prompt, context } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    try {
      const { getAIResponse } = await import("./src/lib/gemini.ts");
      const response = await getAIResponse(prompt, context);
      res.json({ text: response });
    } catch (error: any) {
      console.error("Gemini Proxy Error:", error);
      res.status(500).json({ 
        error: "Failed to fetch from Gemini", 
        details: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
