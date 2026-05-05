// From: https://olets.dev/posts/draft-posts-in-eleventy/
// This uses collection level JS to exclude draft posts from the main collection (permalink to false), so they won't be generated in production.
import { draftComputed } from "../_data/draft-control.js";

export default {
  eleventyComputed: draftComputed,
};