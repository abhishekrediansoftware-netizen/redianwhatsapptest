const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "as"; // fallback for testing

// WEBHOOK VERIFICATION (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// WEBHOOK EVENT HANDLER (POST)
app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running"));
