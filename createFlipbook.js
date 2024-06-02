const portraitThreshold = 290;
let yamlMaths;
let yamlStyle;
const bookElement = document.getElementById("book");

function convertLatexExpressions(string) {
	string = string
		.replace(/\$\$(.*?)\$\$/g, "&#92;[$1&#92;]")
		.replace(/\$(.*?)\$/g, "&#92;($1&#92;)");
	let expressionsLatex = string.match(
		new RegExp(/&#92;\[.*?&#92;\]|&#92;\(.*?&#92;\)/g)
	);
	if (expressionsLatex) {
		// On n'utilise Katex que s'il y a des expressions en Latex dans le Markdown
		for (let expressionLatex of expressionsLatex) {
			// On vérifie si le mode d'affichage de l'expression (inline ou block)
			const inlineMaths = expressionLatex.includes("&#92;[") ? true : false;
			// On récupère la formule mathématique
			let mathInExpressionLatex = expressionLatex
				.replace("&#92;[", "")
				.replace("&#92;]", "");
			mathInExpressionLatex = mathInExpressionLatex
				.replace("&#92;(", "")
				.replace("&#92;)", "");
			// On convertit la formule mathématique en HTML avec Katex
			stringWithLatex = katex.renderToString(mathInExpressionLatex, {
				displayMode: inlineMaths,
			});
			string = string.replace(expressionLatex, stringWithLatex);
		}
	}
	return string;
}

// Pour sortir d'une iframe : permet de stopper la vidéo, et remet le focus sur le livre pour pouvoir le contrôler avec le clavier
let pages;
function resetIframe(iframe) {
	const srcIframe = iframe.src;
	iframe.blur();
	iframe.src = "";
	iframe.src = srcIframe;
}
function focusOutIframe() {
	activeIframe = document.activeElement;
	if (activeIframe.type == "iframe") {
		resetIframe(activeIframe);
	} else {
		for (const page of pages) {
			if (page.style.display == "block") {
				iframe = page.querySelector("iframe");
				if (iframe) {
					resetIframe(iframe);
				}
			}
		}
	}
}

function createBook(w, h) {
	pages = document.querySelectorAll(".page");

	const hash = window.location.hash.substring(1);
	const baseURL = window.location.origin + window.location.pathname;
	const params = new URLSearchParams(document.location.search);
	const pageParam = parseInt(params.get("page"))
		? parseInt(params.get("page"))
		: 0;
	let actualPage = pageParam;
	let portrait = false;
	if (w < portraitThreshold) {
		portrait = true;
		w = (90 * window.innerWidth) / 100;
		h = (80 * window.innerHeight) / 100;
	}

	const pageFlip = new St.PageFlip(bookElement, {
		width: w,
		height: h,
		showCover: true,
		usePortrait: portrait,
		flippingTime: 500,
		startPage: pageParam,
	});

	for (const page of pages) {
		page.style.width = w + "px";
		page.style.height = h + "px";
	}
	textFit(pages, { multiLine: true, alignHoriz: true, alignVert: true });

	pageFlip.loadFromHTML(document.querySelectorAll(".page"));

	const numPages = pageFlip.getPageCount();
	document.querySelector(".page-total").innerText = numPages;

	// On change l'affichage de l'URL sans recharger la page
	function changeURL(page) {
		const newURL = baseURL + "?page=" + page + "#" + hash;
		history.pushState({ path: newURL }, "", newURL);
	}

	function gotToPreviousPage() {
		if (actualPage > 1) {
			actualPage = actualPage - 2;
		} else {
			actualPage = 0;
		}
		pageFlip.flipPrev();
		changeURL(actualPage);
	}

	function gotToNextPage() {
		if (actualPage == 0) {
			actualPage = actualPage + 1;
		} else {
			actualPage = actualPage + 2 <= numPages ? actualPage + 2 : actualPage;
		}
		pageFlip.flipNext();
		changeURL(actualPage);
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

	let currentPage = "";
	pageFlip.on("flip", (e) => {
		// On stoppe le focus sur l'iframe s'il y en a une qui est active
		focusOutIframe();
		if (e.data == 0) {
			currentPage = "1";
		} else if (e.data + 1 == numPages || portrait) {
			currentPage = e.data + 1;
		} else {
			currentPage = e.data + 1 + "-" + (e.data + 2);
		}
		document.querySelector(".page-current").innerText = currentPage;
	});
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

function createFlipbook() {
	const [bookWidth, bookHeight] = calculateDimensions();
	if (bookWidth < portraitThreshold) {
		changeToHardPages();
	}
	createBook(bookWidth, bookHeight);
	setTimeout(() => {
		if (yamlMaths) {
			contentDivs = document.querySelectorAll(".textFitted");
			contentDivs.forEach((contentDiv) => {
				contentDiv.innerHTML = convertLatexExpressions(contentDiv.innerHTML);
			});
		}
	}, 200);

	// Gestion du redimensionnement
	// On ne redimensionne pas si on a cliqué sur un élément (comme une vidéo) pour passer en plein écran ou revenir en écran normal
	let previousWindowWidth = window.innerWidth;
	function onResize() {
		newWindowWidth = window.innerWidth;
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
