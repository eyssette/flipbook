import { PageFlip } from "../externals/page-flip.module";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";
import { textFit } from "../externals/textFit";
import { isEven } from "../utils";
import { focusOutIframe } from "./iframes";
import { updateCurrentPageCounter } from "./updateCurrentPageCounter";
import { changeURL } from "./changeURL";
import { handleNavigation } from "./handleNavigation";
import { calculateDimensions } from "./calculateBookDimensions";
import { yaml } from "../processMarkdown/yaml";
import { changeToHardPages } from "./changeToHardPages";
import { handleResizeWindow } from "./handleResizeWindow";
import { resizeImages } from "./resizeImages";
import { handleGotoPageLink } from "./handleGotoPageLink";

let isPortrait = false;
const portraitThreshold = 290;
const bookElement = document.getElementById("book");

function createBook(pages, w, h) {
	const numPages = pages.length;
	if (w < portraitThreshold) {
		isPortrait = true;
		w = (90 * window.innerWidth) / 100;
		h = (80 * window.innerHeight) / 100;
	}
	const params = new URLSearchParams(document.location.search);
	let pageParam = parseInt(params.get("page"))
		? parseInt(params.get("page"))
		: 0;
	if (isPortrait && pageParam == 0) {
		pageParam = 1;
		changeURL(1);
	}
	let actualPage = isPortrait
		? pageParam - 1
		: isEven(pageParam)
			? pageParam
			: pageParam - 1;

	const startPage = (actualPage == numPages) ? actualPage - 1 : actualPage;

	const pageFlip = new PageFlip(bookElement, {
		width: w,
		height: h,
		showCover: true,
		usePortrait: isPortrait,
		flippingTime: 500,
		startPage: startPage,
	});

	for (const page of pages) {
		page.style.width = w + "px";
		page.style.height = h + "px";
	}

	resizeImages();

	textFit(pages, { multiLine: true, alignHoriz: true, alignVert: true });

	pageFlip.loadFromHTML(document.querySelectorAll(".page"));

	document.querySelector(".page-total").innerText = numPages;
	updateCurrentPageCounter(actualPage, numPages, isPortrait);

	actualPage = handleNavigation(pageFlip, actualPage, numPages, isPortrait);

	pageFlip.on("flip", (e) => {
		// On stoppe le focus sur l'iframe s'il y en a une qui est active
		focusOutIframe(pages);
		updateCurrentPageCounter(e.data, numPages, isPortrait);
	});

	actualPage = handleGotoPageLink(pageFlip, actualPage, numPages, isPortrait);
}

export function createFlipbook() {
	const pages = document.querySelectorAll(".page");
	const [bookWidth, bookHeight] = calculateDimensions();
	if (bookWidth < portraitThreshold) {
		changeToHardPages(pages);
	}
	createBook(pages, bookWidth, bookHeight);
	setTimeout(() => {
		if (yaml && yaml.maths) {
			pages.forEach((page) => {
				page.innerHTML = convertLatexExpressions(page.innerHTML);
			});
		}
	}, 200);
	const controlsElement = document.getElementById("controls");
	controlsElement.style.visibility = "visible";

	handleResizeWindow(pages);
}
