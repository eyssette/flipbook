export function calculateDimensions() {
	let bookWidth = (40 * window.innerWidth) / 100;
	let bookHeight = (bookWidth / 500) * 600;
	const maxBookHeight = (85 * window.innerHeight) / 100;

	if (bookHeight > maxBookHeight) {
		bookHeight = maxBookHeight;
		bookWidth = (bookHeight / 600) * 500;
	}
	return [bookWidth, bookHeight];
}