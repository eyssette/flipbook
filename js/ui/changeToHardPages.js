export function changeToHardPages(pages) {
	pages.forEach((page) => {
		page.setAttribute("data-density", "hard");
	});
}