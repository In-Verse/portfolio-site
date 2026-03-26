/**
 * Returns back some attributes based on whether the
 * link is active or a parent of an active item
 * 
 * From: https://learneleventy.dev/lesson/7/
 * @param {String} itemUrl The link in question
 * @param {String} pageUrl The page context
 * @returns {String} The attributes or empty
 */

export function getLinkActiveState(itemUrl, pageUrl) {
	let response = '';

	if (itemUrl === pageUrl) {
		response = ' aria-current="page"';
	}

    /* We can style the active section */
    /* See when on /posts */
	if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
		response += ' data-state="active"';
	}

	return response;
}