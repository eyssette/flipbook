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

let isPortrait = false;
const portraitThreshold = 290;
const bookElement = document.getElementById("book");

const regexSetImageHeight = /h:(.*)?%/;
const regexGoToPage = /\?page=([0-9]+)/;

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

	const goToPageLinksElements = document.querySelectorAll('a[href*="?page"]');
	for (const goToPageLinkElement of goToPageLinksElements) {
		goToPageLinkElement.addEventListener("click", (e) => {
			e.preventDefault();
			const link = e.target.href;
			const pageNumberMatch = link.match(regexGoToPage);
			if (pageNumberMatch) {
				const pageNumber = parseInt(pageNumberMatch[1]);
				pageFlip.flip(pageNumber - 1);
				changeURL(pageNumber);
				actualPage = isEven(pageNumber) ? pageNumber : pageNumber - 1;
				updateCurrentPageCounter(actualPage, numPages, isPortrait);
			}
		});
	}
}

function changeToHardPages(pages) {
	pages.forEach((page) => {
		page.setAttribute("data-density", "hard");
	});
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

	// Gestion du redimensionnement
	// On ne redimensionne pas si on a cliqué sur un élément (comme une vidéo) pour passer en plein écran ou revenir en écran normal
	let previousWindowWidth = window.innerWidth;
	function onResize() {
		const newWindowWidth = window.innerWidth;
		if (!document.fullscreenElement && previousWindowWidth != newWindowWidth) {
			location.reload();
		}
		if (!document.fullscreenElement) {
			focusOutIframe(pages);
			previousWindowWidth = newWindowWidth;
		}
	}
	let timeout;
	window.addEventListener("resize", function () {
		clearTimeout(timeout);
		timeout = setTimeout(onResize, 250);
	});
}
