const { nanoid } = require("nanoid");
const { URL } = require("../../init_sequelize");
const CODE_LENGTH = 7;

async function generateUniqueCode() {
  let shortUrl;
  let existingShortUrl;
  do {
    shortUrl = nanoid(CODE_LENGTH);
    existingShortUrl = await URL.findOne({
      where: { shortURL: shortUrl },
    });
  } while (existingShortUrl);
  return shortUrl;
}

function validateLongUrl(longUrl) {
  if (!longUrl || longUrl.length < 5) {
    const error = new Error("Input must be a valid URL (too short or empty).");
    error.statusCode = 400;
    throw error;
  }
  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;

  if (!urlRegex.test(longUrl) && !longUrl.startsWith("http")) {
    const error = new Error(
      "Input is not a recognizable domain or URL format."
    );
    error.statusCode = 400;
    throw error;
  }
  if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
    longUrl = "http://" + longUrl;
  }

  return longUrl;
}
module.exports = {
  generateUniqueCode,
  validateLongUrl,
};
