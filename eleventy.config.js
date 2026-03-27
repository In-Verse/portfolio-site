import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");

	// Passthrough copy
	eleventyConfig.addPassthroughCopy({
		"src/fonts": "fonts",
		"src/images": "images",
		"src/assets": "assets",
		"src/css": "css"
	});

	// Plugins
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin);

	// Date filter for post metadata
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return new Date(dateObj).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return new Date(dateObj).toISOString().split("T")[0];
	});


	// Group drafts together with a collection
	eleventyConfig.addFilter("collectionOrder", (posts) => {
    const drafts = [];
    const published = [];

    for (const post of posts) {
      if (post?.data?.draft) {
        drafts.push(post);
        continue;
      }

      published.push(post);
    }

    return [...drafts, ...published];
  });

}

export const config = {
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};
