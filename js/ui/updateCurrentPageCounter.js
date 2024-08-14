import { isEven } from "../utils";

export function updateCurrentPageCounter(numberPage, totalNumberPage, isPortrait) {
	numberPage = isEven(numberPage) && !isPortrait ? numberPage : numberPage + 1;
	let currentPage = "";
	if (numberPage == 0) {
		currentPage = "1";
	} else if (numberPage == totalNumberPage || isPortrait) {
		currentPage = numberPage;
	} else {
		currentPage = numberPage + "-" + (numberPage + 1);
	}
	document.querySelector(".page-current").innerText = currentPage;
}