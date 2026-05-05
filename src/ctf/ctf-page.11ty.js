// Im leveraging 11ty's pagination features 
// Lets generate one page per unique CTF name at /ctf/[ctf-name]/
// 1 CTF -> 1 page listing all writeups for that CTF
// eg. /ctf/Some-Cool-CTF/ with all writeups for "Some Cool CTF"
export default class CtfPage {
	data() {
		return {
			pagination: {
				data: "collections.writeups",
				size: 1,
				before: function (allWriteups) {
					// Deduplicate by ctf name, returning one entry per unique CTF
					const seen = new Set();
					const unique = [];
					for (const post of allWriteups) {
						const name = post.data.ctf;
						if (name && !seen.has(name)) {
							seen.add(name);
							unique.push(name);
						}
					}
					return unique.sort();
				},
				alias: "ctfName",
				addAllPagesToCollections: true,
			},
            // Layout for each CTF page
			layout: "layouts/ctf.html",
			tags: ["ctfPages"],
			eleventyComputed: {
				title: (data) => `CTF: ${data.ctfName}`,
				permalink: (data) => `/ctf/${data.ctfName
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-|-$/g, "")}/`,
				ctfWriteups: (data) =>
					(data.collections.writeups || []).filter(
						(w) => w.data.ctf === data.ctfName
					),
			},
		};
	}

    // Layout handles the rendering
	render() {
		return "";
	}
}
