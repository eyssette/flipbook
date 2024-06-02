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

function createBook(w, h) {
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
	});

	const pages = document.querySelectorAll(".page");
	for (const page of pages) {
		page.style.width = w + "px";
		page.style.height = h + "px";
	}
	textFit(pages, { multiLine: true, alignHoriz: true, alignVert: true });

	pageFlip.loadFromHTML(document.querySelectorAll(".page"));

	const numPages = pageFlip.getPageCount();
	document.querySelector(".page-total").innerText = numPages;

	document.querySelector(".btn-prev").addEventListener("click", () => {
		pageFlip.flipPrev();
	});

	document.querySelector(".btn-next").addEventListener("click", () => {
		pageFlip.flipNext();
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "ArrowLeft") {
			pageFlip.flipPrev();
		}
		if (event.key === "ArrowRight") {
			pageFlip.flipNext();
		}
	});

	let currentPage = "";
	pageFlip.on("flip", (e) => {
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
			previousWindowWidth = newWindowWidth;
		}
	}
	let timeout;
	window.addEventListener("resize", function () {
		clearTimeout(timeout);
		timeout = setTimeout(onResize, 250);
	});
}