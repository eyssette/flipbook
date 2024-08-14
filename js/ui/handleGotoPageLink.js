import { changeURL } from "./changeURL";
import { isEven } from "../utils";
import { updateCurrentPageCounter } from "./updateCurrentPageCounter";

const goToPageLinksElements = document.querySelectorAll('a[href*="?page"]');
const regexGoToPage = /\?page=([0-9]+)/;


export function handleGotoPageLink(pageFlip, actualPage, numPages, isPortrait) {
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
	return actualPage;
}