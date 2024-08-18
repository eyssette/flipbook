import defaultMD from "../../content.md";
import { createFlipbook } from "../ui/createFlipBook";
import { handleURL, splitText, loadCSS } from "../utils";
import { markdownToHTML } from "./markdownToHTML";
import { processYAML } from "./yaml";
import { processSummary } from "./processSummary";

let flipbookData;
let md = defaultMD;

export function getMarkdownContentAndCreateFlipbook() {
	// On récupère l'URL du hashtag sans le #
	const url = window.location.hash.substring(1).replace(/\?.*/, "");
	// On traite l'URL pour pouvoir récupérer correctement la source du chatbot
	const sourceFlipbook = handleURL(url);
	if (sourceFlipbook !== "") {
		fetch(sourceFlipbook)
			.then((response) => response.text())
			.then((data) => {
				md = data;
				flipbookData = parseMarkdown(md);
				createHTMLelements(flipbookData);
				createFlipbook();
			})
			.catch((error) => console.error(error));
	} else {
		createHTMLelements(parseMarkdown(md));
		createFlipbook();
	}
}

function fixImageDimensionsCodiMD(md) {
	md = md.replaceAll(/=x([0-9]*)\)/g, "=*x$1)");
	md = md.replaceAll(/=([0-9]*)x\)/g, "=$1x*)");
	return md;
}

function parseMarkdown(markdownContent) {
	if (markdownContent.includes(":::")) {
		loadCSS("css/admonitions.min.css", "admonitions");
	}
	let flipbookDataArray = [];

	markdownContent = fixImageDimensionsCodiMD(markdownContent);
	const markdownContentSplitted = splitText(markdownContent);

	if (markdownContentSplitted.length > 2 && markdownContent.startsWith("---")) {
		processYAML(markdownContent);
		markdownContentSplitted.shift();
		markdownContentSplitted.shift();
		flipbookDataArray = markdownContentSplitted;
	} else {
		flipbookDataArray = markdownContentSplitted;
	}

	if (markdownContent.includes("!summary")) {
		flipbookDataArray = processSummary(flipbookDataArray);
	}

	return flipbookDataArray;
}

function createHTMLelements(flipbookDataArray) {
	const regexBackgroundImage = /.*src="(.*?)" alt="bg.*/;
	for (let index = 0; index < flipbookDataArray.length; index++) {
		let pageHTML = markdownToHTML(flipbookDataArray[index]);
		const div = document.createElement("div");
		if (pageHTML.includes('alt="bg')) {
			pageHTML = pageHTML.replace(
				regexBackgroundImage,
				function (match, srcImage) {
					return (
						"<style>div.page:nth-of-type(" +
						(index + 1) +
						'){background-image:url("' +
						srcImage +
						'"); background-size: contain; background-repeat: no-repeat; background-position: center center;}</style>'
					);
				},
			);
		}
		div.innerHTML = pageHTML;
		div.classList.add("page");
		if (index === 0 || index === flipbookDataArray.length - 1) {
			div.setAttribute("data-density", "hard");
		}
		document.body.appendChild(div);
	}
}
