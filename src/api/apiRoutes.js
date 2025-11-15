const express = require("express");
const router = express.Router();
const urlController = require("../controller/urlController");

router.post("/shorten", async (req, res) => {
  try {
    const shortUrlCode = await urlController.shortenUrl(req.body.longURL);
    res.status(201).json({
      message: "URL shortened successfully",
      shortCode: shortUrlCode,
      fullShortUrl: `${req.protocol}://${req.get("host")}/${shortUrlCode}`,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    console.error("Error during shortening:", error.message);

    if (error.statusCode === 400) {
      return res.status(400).json({ error: error.message });
    }
    res.status(statusCode).json({
      error: error.message || "Failed to create short URL.",
    });
  }
});

module.exports = router;
