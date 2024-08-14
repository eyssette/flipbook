import { changeURL } from "./changeURL";

function gotToPreviousPage(pageFlip, actualPage, numPages, isPortrait) {
	if (isPortrait) {
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
	return actualPage;
}

function gotToNextPage(pageFlip, actualPage, numPages, isPortrait) {
	if (isPortrait) {
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
	return actualPage;
}

export function handleNavigation(pageFlip, actualPage, numPages, isPortrait) {
	document.querySelector(".btn-prev").addEventListener("click", () => {
		actualPage = gotToPreviousPage(pageFlip, actualPage, numPages, isPortrait);
	});
	document.querySelector(".btn-next").addEventListener("click", () => {
		actualPage = gotToNextPage(pageFlip, actualPage, numPages, isPortrait);
	});
	document.addEventListener("keydown", function (event) {
		if (event.key === "ArrowLeft") {
			actualPage = gotToPreviousPage(pageFlip, actualPage, numPages, isPortrait);
		}
		if (event.key === "ArrowRight") {
			actualPage = gotToNextPage(pageFlip, actualPage, numPages, isPortrait);
		}
	});
	return actualPage;
}