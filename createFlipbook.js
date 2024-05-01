function createBook(w, h) {
	let portrait = false;
	if (w < 290) {
		portrait = true;
		w = (90 * window.innerWidth) / 100;
		h = (80 * window.innerHeight) / 100;
	}
	
	const pageFlip = new St.PageFlip(document.getElementById("book"), {
		width: w,
		height: h,
		showCover: true,
		usePortrait: portrait,
		flippingTime: 500,
	});


	const pages = document.querySelectorAll('.page');
	for (const page of pages) {
		page.style.width = w + 'px';
		page.style.height = h + 'px';
	}
	textFit(pages, {multiLine: true,alignHoriz: true, alignVert: true})

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

	let currentPage = '';
	pageFlip.on("flip", (e) => {
		if (e.data == 0) {
			currentPage = '1';
		} else if (e.data + 1 == numPages || portrait) {
			currentPage = e.data + 1;
		} else {
			currentPage = (e.data + 1) + '-' + (e.data+2)
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

document.addEventListener("DOMContentLoaded", function () {
	const [bookWidth, bookHeight] = calculateDimensions();

	createBook(bookWidth, bookHeight);
	window.addEventListener("resize", function () {
		location.reload();
	});
});
