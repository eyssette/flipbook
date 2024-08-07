const shortcuts = [
	["modèle", "https://codimd.apps.education.fr/NuU3detpS0amHKFZ1ImX8Q"],
];

let md = `---
style: small{font-size:0.7em}
---

# Flipbook

Un outil [libre](https://forge.apps.education.fr/flipbook/flipbook.forge.apps.education.fr) & gratuit pour créer facilement un livre numérique que l'on peut feuilleter en ligne

<small>Créé par : [Cédric Eyssette](https://eyssette.forge.apps.education.fr/)</small>

---

On peut créer son flipbook sur [CodiMD](https://codimd.apps.education.fr/).

On peut aussi utiliser d'autres outils accessibles aux élèves comme [Digipage](https://digipage.app/), [Framapad](https://framapad.org/abc/fr/) ou [Hedgedoc](https://demo.hedgedoc.org/).

---

Le flipbook sera alors à cette adresse :

\`\`\`md
https://flipbook.
forge.apps.
education.fr/
#URL_DU_FLIPBOOK
\`\`\`

Dans son fichier, on sépare simplement chaque page avec l'élément : \`\`\`---\`\`\`


---

On peut utiliser toute la syntaxe Markdown ou HTML.

- Par exemple,
- une liste
- d'éléments

---

## La taille de la police est ajustée automatiquement pour que le contenu tienne sur la page.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum mauris nec venenatis convallis. Vivamus ultrices fermentum dapibus. Sed quis erat maximus, scelerisque tellus eget, suscipit nisl. Donec vulputate purus ultricies dolor tristique bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur vel diam non eleifend. Proin ultrices leo pulvinar ipsum lobortis, vel sodales quam sagittis.
Nam sed libero magna. Aliquam ut eleifend libero, ac malesuada massa. Nulla iaculis mi nisl, vitae tempor mi volutpat eu. Aliquam erat volutpat. Mauris sodales ultrices ante, maximus pulvinar dolor. Nullam mattis sem non orci mollis porttitor. Sed aliquam eros velit. Fusce interdum enim sed volutpat accumsan. Proin consequat, nisi in congue varius, ipsum erat elementum elit, eget mollis metus nulla eget risus. Donec aliquet, massa quis feugiat congue, lacus tellus elementum sapien, nec iaculis libero nunc vitae mi. Curabitur eget felis in sapien aliquam volutpat vel vitae urna. Quisque a ipsum a massa convallis eleifend. Nulla facilisi.
Morbi justo diam, pellentesque quis porta ac, pulvinar nec elit. Ut dignissim efficitur libero non convallis. Nullam eu tincidunt libero, sed tempus elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer a imperdiet sem, vel eleifend purus. Nullam urna enim, mollis sit amet augue eget, sodales euismod erat. Maecenas maximus arcu eu volutpat bibendum. Duis placerat malesuada libero, et feugiat massa feugiat sit amet. Donec auctor lacinia pellentesque. Donec molestie dolor bibendum, luctus lacus a, euismod lorem. Aliquam elementum quam id ex ornare auctor. Maecenas interdum, ligula eleifend viverra posuere, sem massa mattis velit, nec aliquet turpis urna vitae erat. Vestibulum eu purus nibh.

---

## Images

On peut insérer des images, mais il faut leur donner une hauteur pour que la police soit ajustée correctement.

![h:20%](https://picsum.photos/500/300)

On peut indiquer une dimension en pixels :
\`![](URL_image =x300)\`

Ou en pourcentage de la hauteur de l'écran :
\`![h:40%](URL_image)\`

On peut enfin utiliser une image en fond de page en ajoutant \`bg\` au début du \`alt\` de l'image.
\`![bg](URL_image)\`

---

### Configuration plus avancée

On peut ajouter un en-tête YAML pour accéder à certaines options.

\`\`\`
\`\`​\`​
maths: true
style: p{color:red}
\`​\`​\`​
\`\`\`

- \`maths: true\` permet d'utiliser des formules mathématiques en Latex
- \`style: p{color:red}\` permet d'ajouter des styles personnalisés en CSS

---

On peut insérer un sommaire en écrivant : \`!​summary\`. Seuls les titres de niveau 2 seront pris en compte dans le sommaire.


Pour avoir un lien vers une page spécifique, on écrit :
\`[lien vers page 5](?page=5)\`

Exemple :
[lien vers la page 3](?page=3)


`;

// Extensions pour Showdown

// Gestion des admonitions
function showdownExtensionAdmonitions() {
	return [
		{
			type: "output",
			filter: (text) => {
				text = text.replaceAll("<p>:::", ":::");
				const regex = /:::(.*?)\n(.*?):::/gs;
				const matches = text.match(regex);
				if (matches) {
					let modifiedText = text;
					for (const match of matches) {
						const regex2 = /:::(.*?)\s(.*?)\n(.*?):::/s;
						const matchInformations = regex2.exec(match);
						const indexMatch = text.indexOf(match);
						// Pas de transformation de l'admonition en html si l'admonition est dans un bloc code
						const isInCode =
							text.substring(indexMatch - 6, indexMatch) == "<code>"
								? true
								: false;
						if (!isInCode) {
							let type = matchInformations[1];
							let title = matchInformations[2];
							if(type.includes('<br')) {
								type = type.replace('<br','')
								title = '';
							}
							const content = matchInformations[3];
							if (title.includes("collapsible")) {
								title = title.replace("collapsible", "");
								matchReplaced = `<div><div class="admonition ${type}"><details><summary class="admonitionTitle">${title}</summary><div class="admonitionContent">${content}</div></details></div></div>`;
							} else {
								matchReplaced = `<div><div class="admonition ${type}"><div class="admonitionTitle">${title}</div><div class="admonitionContent">${content}</div></div></div>`;
							}
							modifiedText = modifiedText.replaceAll(match, matchReplaced);
						}
					}
					return modifiedText;
				} else {
					return text;
				}
			},
		},
	];
}

// Gestion des éléments soulignés et surlignés
const showdownExtensionUnderline = {
    type: 'lang',
    regex: /\+\+(.*?)\+\+/g,
    replace: '<u>$1</u>'
};
const showdownExtensionHighlight = {
    type: 'lang',
    regex: /\=\=(.*?)\=\=/g,
    replace: '<mark>$1</mark>'
};

// Gestion du markdown avec Showdown
const converter = new showdown.Converter({
	emoji: true,
	parseImgDimensions: true,
	simpleLineBreaks: true,
	simplifiedAutoLink: true,
	tables: true,
	openLinksInNewWindow: true,
	extensions: [showdownExtensionAdmonitions, showdownExtensionUnderline, showdownExtensionHighlight],
});

function markdownToHTML(text) {
	let html = converter.makeHtml(text);
	// Optimisation de l'affichage des images
	html = html.replaceAll("<img ",'<img loading="lazy" ')
	return html;
}

let flipbookData;
let urlMD

function getMarkdownContent() {
	// Récupération du markdown externe
	urlMD = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	if (urlMD !== "") {
		// Vérification de la présence d'un raccourci
		const shortcut = shortcuts.find((element) => element[0] == urlMD);
		if (shortcut) {
			urlMD = shortcut[1];
		}
		// Gestion des fichiers hébergés sur github
		if (urlMD.startsWith("https://github.com")) {
			urlMD = urlMD.replace(
				"https://github.com",
				"https://raw.githubusercontent.com"
			);
			urlMD = urlMD.replace("/blob/", "/");
		}
		// gestion des fichiers hébergés sur codiMD / hedgedoc / digipage
		if (
			(urlMD.startsWith("https://codimd") || urlMD.includes("hedgedoc") || urlMD.includes("digipage") )
		) {
			urlMD =
				urlMD.replace("?edit", "").replace("?both", "").replace("?view", "").replace(/#$/,"").replace(/\/$/,'');
			urlMD = urlMD.indexOf("download") === -1 ? urlMD + "/download" : urlMD;
		}
		// gestion des fichiers hébergés sur framapad ou digidoc
		if ((urlMD.includes("framapad") || urlMD.includes("digidoc")) && !urlMD.endsWith("/export/txt")) {
			urlMD = urlMD.replace(/\?.*/,'') + '/export/txt';
		}
		// Récupération du contenu du fichier
		fetch(urlMD)
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

getMarkdownContent();

function fixImageDimensionsCodiMD(md) {
	md = md.replaceAll(/=x([0-9]*)\)/g, "=*x$1)");
	md = md.replaceAll(/=([0-9]*)x\)/g, "=$1x*)");
	return md;
}

function splitText(text) {
	let result = [];
	let parts = text.split("---");
	let temp = "";

	for (let i = 0; i < parts.length; i++) {
		if (parts[i].endsWith("`")) {
			temp += parts[i] + "---";
		} else {
			temp += parts[i];
			result.push(temp);
			temp = "";
		}
	}
	return result;
}

function loadScript(src) {
	// Fonction pour charger des scripts
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}
function loadCSS(src) {
	// Fonction pour charger des CSS
	return new Promise((resolve, reject) => {
		const styleElement = document.createElement("link");
		styleElement.href = src;
		styleElement.rel = "stylesheet";
		styleElement.onload = resolve;
		styleElement.onerror = reject;
		document.head.appendChild(styleElement);
	});
}

function parseMarkdown(markdownContent) {
	let flipbookDataArray = [];

	markdownContent = fixImageDimensionsCodiMD(markdownContent);

	const markdownContentSplitted = splitText(markdownContent);
	if (markdownContentSplitted.length > 2 && markdownContent.startsWith("---")) {
		try {
			yamlData = jsyaml.load(markdownContentSplitted[1]);
			for (const property in yamlData) {
				if (property == "maths") {
					yamlMaths = yamlData[property];
					if (yamlMaths === true) {
						Promise.all([
							loadScript(
								"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
							),
							loadCSS(
								"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
							),
						]);
					}
				}
				// Gestion des styles personnalisés
				if (property == "style") {
					yamlStyle = yamlData[property];
					const styleElement = document.createElement("style");
					styleElement.innerHTML = yamlStyle.replaceAll("\\","");
					document.body.appendChild(styleElement);
				}
			}
		} catch (e) {}
		markdownContentSplitted.shift();
		markdownContentSplitted.shift();
		flipbookDataArray = markdownContentSplitted;
		if (markdownContent.includes('!summary')) {
			let summaryPageNumber = -1;
			const regexTitleH2 = /(\n|^)## (.*)/
			let titlesH2 = []
			for (const [pageNumber,pageContent] of flipbookDataArray.entries()) {
				if (summaryPageNumber>-1) {
					const findTitlesH2 = pageContent.match(regexTitleH2)
					if(findTitlesH2) {
						const titleH2 = findTitlesH2[2]
						titlesH2.push('<li><a href="?page='+(pageNumber+1)+'">'+titleH2+'</a></li>')
					}
				} else if(pageContent.includes('!summary')) {
					summaryPageNumber = pageNumber;
				}
			}
			const summaryContent = '<ul class="summary">' + titlesH2.join('\n') + '</ul>';
			flipbookDataArray[summaryPageNumber] = flipbookDataArray[summaryPageNumber].replace('!summary',summaryContent)
		}
	} else {
		flipbookDataArray = markdownContentSplitted;
	}

	return flipbookDataArray;
}

function createHTMLelements(flipbookDataArray) {
	const regexBackgroundImage = /.*src="(.*?)" alt="bg.*/
	for (let index = 0; index < flipbookDataArray.length; index++) {
		let pageHTML = markdownToHTML(flipbookDataArray[index]);
		const div = document.createElement("div");
		if(pageHTML.includes('alt="bg')) {
			pageHTML = pageHTML.replace(regexBackgroundImage,function(match, srcImage) {
				return '<style>div.page:nth-of-type('+(index+1)+'){background-image:url("'+srcImage+'"); background-size: contain; background-repeat: no-repeat; background-position: center center;}</style>'
			})
		}
		div.innerHTML = pageHTML;
		div.classList.add("page");
		if (index === 0 || index === flipbookDataArray.length - 1) {
			div.setAttribute("data-density", "hard");
		}
		document.body.appendChild(div);
	}
}
