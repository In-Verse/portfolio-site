// From: https://olets.dev/posts/draft-posts-in-eleventy/
// This uses collection level JS to exclude draft posts from the main collection (permalink to false), so they won't be generated in production.
import "dotenv/config";

const dev = process.env.DEV === "true";

function devOnly(data) {
  return Boolean(data.draft);
}

export default {
  eleventyComputed: {
    // eleventyExcludeFromCollections lets us exclude files from the automatically generated collections collections.posts
    eleventyExcludeFromCollections: (data) => {
      if (!dev && devOnly(data)) return true;
      return data.eleventyExcludeFromCollections;
    },
    // Having a permalink means a file will be generated
    permalink: (data) => {
      if (!dev && devOnly(data)) {
        return undefined; 
      }
      return data.permalink;
    },
  },
};