import { PageFlip } from "../externals/page-flip.module";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";
import { textFit } from "../externals/textFit";

let portrait = false;
const portraitThreshold = 290;
let yamlMaths;
const bookElement = document.getElementById("book");

// Pour sortir d'une iframe : permet de stopper la vidéo, et remet le focus sur le livre pour pouvoir le contrôler avec le clavier
let pages;
function resetIframe(iframe) {
	const srcIframe = iframe.src;
	iframe.blur();
	iframe.src = "";
	iframe.src = srcIframe;
}
function focusOutIframe() {
	const activeIframe = document.activeElement;
	if (activeIframe.type == "iframe") {
		resetIframe(activeIframe);
	} else {
		for (const page of pages) {
			if (page.style.display == "block") {
				const iframe = page.querySelector("iframe");
				if (iframe) {
					resetIframe(iframe);
				}
			}
		}
	}
}

function isEven(n) {
	return n % 2 == 0;
}

function updateCurrentPageCounter(numberPage, totalNumberPage) {
	numberPage = isEven(numberPage) && !portrait ? numberPage : numberPage + 1;
	let currentPage = "";
	if (numberPage == 0) {
		currentPage = "1";
	} else if (numberPage == totalNumberPage || portrait) {
		currentPage = numberPage;
	} else {
		currentPage = numberPage + "-" + (numberPage + 1);
	}
	document.querySelector(".page-current").innerText = currentPage;
}

function createBook(w, h) {
	pages = document.querySelectorAll(".page");

	const hash = window.location.hash.substring(1);
	const baseURL = window.location.origin + window.location.pathname;

	if (w < portraitThreshold) {
		portrait = true;
		w = (90 * window.innerWidth) / 100;
		h = (80 * window.innerHeight) / 100;
	}
	const params = new URLSearchParams(document.location.search);
	let pageParam = parseInt(params.get("page"))
		? parseInt(params.get("page"))
		: 0;
	if (portrait && pageParam == 0) {
		pageParam = 1;
		changeURL(1);
	}
	let actualPage = portrait
		? pageParam - 1
		: isEven(pageParam)
			? pageParam
			: pageParam - 1;

	const pageFlip = new PageFlip(bookElement, {
		width: w,
		height: h,
		showCover: true,
		usePortrait: portrait,
		flippingTime: 500,
		startPage: actualPage,
	});

	for (const page of pages) {
		page.style.width = w + "px";
		page.style.height = h + "px";
	}

	const regexSetImageHeight = /h:(.*)?%/;
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

	const numPages = pageFlip.getPageCount();
	document.querySelector(".page-total").innerText = numPages;
	updateCurrentPageCounter(actualPage, numPages);

	// On change l'affichage de l'URL sans recharger la page
	function changeURL(page) {
		const newURL = baseURL + "?page=" + page + "#" + hash;
		history.pushState({ path: newURL }, "", newURL);
	}

	function gotToPreviousPage() {
		if (portrait) {
			if (actualPage > 1) {
				actualPage = actualPage - 1;
				changeURL(actualPage + 1);
			} else {
				actualPage = 0;
				changeURL(1);
			}
		} else {
			if (actualPage > 1) {
				actualPage = actualPage - 2;
			} else {
				actualPage = 0;
			}
			changeURL(actualPage);
		}
		pageFlip.flipPrev();
	}

	function gotToNextPage() {
		if (portrait) {
			if (actualPage + 1 < numPages) {
				actualPage = actualPage + 1;
				changeURL(actualPage + 1);
			}
		} else {
			if (actualPage == 0) {
				actualPage = actualPage + 2;
			} else {
				actualPage = actualPage + 2 <= numPages ? actualPage + 2 : actualPage;
			}
			changeURL(actualPage);
		}
		pageFlip.flipNext();
	}

	document.querySelector(".btn-prev").addEventListener("click", () => {
		gotToPreviousPage();
	});

	document.querySelector(".btn-next").addEventListener("click", () => {
		gotToNextPage();
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "ArrowLeft") {
			gotToPreviousPage();
		}
		if (event.key === "ArrowRight") {
			gotToNextPage();
		}
	});

	pageFlip.on("flip", (e) => {
		// On stoppe le focus sur l'iframe s'il y en a une qui est active
		focusOutIframe();
		updateCurrentPageCounter(e.data, numPages);
	});

	const goToPageLinksElements = document.querySelectorAll('a[href*="?page"]');
	const regexGoToPage = /\?page=([0-9]+)/;
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
				updateCurrentPageCounter(actualPage, numPages);
			}
		});
	}
}

function calculateDimensions() {
	let bookWidth = (40 * window.innerWidth) / 100;
	let bookHeight = (bookWidth / 500) * 600;
	const maxBookHeight = (85 * window.innerHeight) / 100;

	if (bookHeight > maxBookHeight) {
		bookHeight = maxBookHeight;
		bookWidth = (bookHeight / 600) * 500;
	}
	return [bookWidth, bookHeight];
}

function changeToHardPages() {
	const pages = document.querySelectorAll(".page");
	pages.forEach((page) => {
		page.setAttribute("data-density", "hard");
	});
}

export function createFlipbook() {
	const [bookWidth, bookHeight] = calculateDimensions();
	if (bookWidth < portraitThreshold) {
		changeToHardPages();
	}
	createBook(bookWidth, bookHeight);
	setTimeout(() => {
		if (yamlMaths) {
			const contentDivs = document.querySelectorAll(".textFitted");
			contentDivs.forEach((contentDiv) => {
				contentDiv.innerHTML = convertLatexExpressions(contentDiv.innerHTML);
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
			focusOutIframe();
			previousWindowWidth = newWindowWidth;
		}
	}
	let timeout;
	window.addEventListener("resize", function () {
		clearTimeout(timeout);
		timeout = setTimeout(onResize, 250);
	});
}
