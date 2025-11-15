const { URL } = require("../../init_sequelize");
const {
  generateUniqueCode,
  validateLongUrl,
} = require("../services/urlService");

async function redirectToLongUrl(shortUrlCode) {
  try {
    const existingUrl = await URL.findOne({
      where: { shortURL: shortUrlCode },
    });
    if (!existingUrl) {
      return null;
    }

    return existingUrl.longURL;
  } catch (error) {
    console.error("Error retrieving URL from DB:", error);
    throw error;
  }
}

async function shortenUrl(longUrl) {
  longUrl = validateLongUrl(longUrl);
  const existingUrl = await URL.findOne({ where: { longURL: longUrl } });

  if (existingUrl) {
    return existingUrl.shortURL;
  }

  const shortUrl = await generateUniqueCode();

  const newUrl = await URL.create({
    longURL: longUrl,
    shortURL: shortUrl,
  });
  return newUrl.shortURL;
}
module.exports = {
  shortenUrl,
  redirectToLongUrl,
};
