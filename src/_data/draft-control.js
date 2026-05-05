// Centralized draft control for all content types
import "dotenv/config";

const dev = process.env.DEV === "true";

function devOnly(data) {
  return Boolean(data.draft);
}

export const draftComputed = {
  eleventyExcludeFromCollections: (data) => {
    if (!dev && devOnly(data)) return true;
    return data.eleventyExcludeFromCollections;
  },
  permalink: (data) => {
    if (!dev && devOnly(data)) {
      return undefined;
    }
    return data.permalink;
  },
};
