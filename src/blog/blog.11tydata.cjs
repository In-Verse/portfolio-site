// Common JS style
// From: https://olets.dev/posts/draft-posts-in-eleventy/
// This uses collection level JS to exclude draft posts from the main collection (permalink to false), so they won't be generated in production.
require("dotenv").config(); // or ESM: `import 'dotenv/config'`

const dev = process.env.DEV === "true";

const now = new Date();

/**
 * If a post is a `draft`, it is for dev mode only.
 *
 * @param {object} data Post data
 * @param {boolean} [data.draft=false] Post draft status
 * @returns {boolean}
 */
function devOnly(data) {
  return Boolean(data.draft);
}

module.exports = {
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => {
      if (!dev && devOnly(data)) {
        return true;
      }

      return data.eleventyExcludeFromCollections;
    },
    permalink: (data) => {
      if (!dev && devOnly(data)) {
        return false;
      }

      return data.permalink;
    },
  },
};