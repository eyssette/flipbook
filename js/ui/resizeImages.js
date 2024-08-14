const regexSetImageHeight = /h:(.*)?%/;

export function resizeImages() {
	const imagesToResize = document.querySelectorAll('img[alt*="h:"]');
	imagesToResize.forEach((image) => {
		const setImageHeight = image.alt.match(regexSetImageHeight)
			? image.alt.match(regexSetImageHeight)[1]
			: undefined;
		if (setImageHeight) {
			image.style.height = setImageHeight + "vh";
			image.style.maxWidth = "";
		}
	});
}