export function processSummary(flipbookDataArray) {
	let summaryPageNumber = -1;
	const regexTitleH2 = /(\n|^)## (.*)/;
	let titlesH2 = [];
	for (const [pageNumber, pageContent] of flipbookDataArray.entries()) {
		if (summaryPageNumber > -1) {
			const findTitlesH2 = pageContent.match(regexTitleH2);
			if (findTitlesH2) {
				const titleH2 = findTitlesH2[2];
				titlesH2.push(
					'<li><a href="?page=' +
						(pageNumber + 1) +
						'">' +
						titleH2 +
						"</a></li>",
				);
			}
		} else if (pageContent.includes("!summary")) {
			summaryPageNumber = pageNumber;
		}
	}
	const summaryContent = '<ul class="summary">' + titlesH2.join("\n") + "</ul>";
	flipbookDataArray[summaryPageNumber] = flipbookDataArray[
		summaryPageNumber
	].replace("!summary", summaryContent);
	return flipbookDataArray;
}
