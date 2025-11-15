const express = require("express");
const router = express.Router();
const urlController = require("../controller/urlController");

router.get("/:shortUrlCode", async (req, res) => {
  const shortUrlCode = req.params.shortUrlCode;
  try {
    const longUrl = await urlController.redirectToLongUrl(shortUrlCode);
    if (longUrl == null || longUrl == undefined) {
      return res.status(404).json({
        message: "This short URL does not exist or has expired.",
      });
    }
    return res.redirect(302, longUrl);
  } catch (error) {
    console.error("Error during redirection:", error.message);
    res.status(500).json({ error: "Internal server error during lookup." });
  }
});

module.exports = router;
