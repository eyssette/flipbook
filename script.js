function createBook(w, h) {
	let usePortrait = false;
	if (w < 350) {
		usePortrait = true;
		w = (80 * window.innerWidth) / 100;
		h = (70 * window.innerHeight) / 100;
	}
	const pageFlip = new St.PageFlip(document.getElementById("book"), {
		width: w,
		height: h,
		showCover: true,
		usePortrait: usePortrait,
		flippingTime: 500,
	});

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
		} else if (e.data + 1 == numPages || usePortrait) {
			currentPage = e.data + 1;
		} else {
			currentPage = (e.data + 1) + '-' + (e.data+2)
		}
		document.querySelector(".page-current").innerText = currentPage;
	});
}

function calculateDimensions() {
	let bookWidth = (40 * window.innerWidth) / 100;
	let bookHeight = (bookWidth / 400) * 600;
	const maxBookHeight = (70 * window.innerHeight) / 100;

	if (bookHeight > maxBookHeight) {
		bookHeight = maxBookHeight;
		bookWidth = (bookHeight / 600) * 400;
	}
	return [bookWidth, bookHeight];
}

document.addEventListener("DOMContentLoaded", function () {
	const [bookWidth, bookHeight] = calculateDimensions();

	createBook(bookWidth, bookHeight);
	window.addEventListener("resize", function () {
		const [bookWidth, bookHeight] = calculateDimensions();
		createBook(bookWidth, bookHeight);
		location.reload();
	});
});
