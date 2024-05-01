const shortcuts = [
	["modèle", "https://codimd.apps.education.fr/NuU3detpS0amHKFZ1ImX8Q"],
];

let md = `# Flipbook

Un outil pour créer facilement un livre numérique que l'on peut feuilleter en ligne

---

---

![](https://picsum.photos/500/300 =x300)

La taille de la police est ajustée pour que le contenu tienne sur la page.
Pour pouvoir prendre en compte les images, il faut leur donner une hauteur explicite.

---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum mauris nec venenatis convallis. Vivamus ultrices fermentum dapibus. Sed quis erat maximus, scelerisque tellus eget, suscipit nisl. Donec vulputate purus ultricies dolor tristique bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur vel diam non eleifend. Proin ultrices leo pulvinar ipsum lobortis, vel sodales quam sagittis.
Nam sed libero magna. Aliquam ut eleifend libero, ac malesuada massa. Nulla iaculis mi nisl, vitae tempor mi volutpat eu. Aliquam erat volutpat. Mauris sodales ultrices ante, maximus pulvinar dolor. Nullam mattis sem non orci mollis porttitor. Sed aliquam eros velit. Fusce interdum enim sed volutpat accumsan. Proin consequat, nisi in congue varius, ipsum erat elementum elit, eget mollis metus nulla eget risus. Donec aliquet, massa quis feugiat congue, lacus tellus elementum sapien, nec iaculis libero nunc vitae mi. Curabitur eget felis in sapien aliquam volutpat vel vitae urna. Quisque a ipsum a massa convallis eleifend. Nulla facilisi.
Morbi justo diam, pellentesque quis porta ac, pulvinar nec elit. Ut dignissim efficitur libero non convallis. Nullam eu tincidunt libero, sed tempus elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer a imperdiet sem, vel eleifend purus. Nullam urna enim, mollis sit amet augue eget, sodales euismod erat. Maecenas maximus arcu eu volutpat bibendum. Duis placerat malesuada libero, et feugiat massa feugiat sit amet. Donec auctor lacinia pellentesque. Donec molestie dolor bibendum, luctus lacus a, euismod lorem. Aliquam elementum quam id ex ornare auctor. Maecenas interdum, ligula eleifend viverra posuere, sem massa mattis velit, nec aliquet turpis urna vitae erat. Vestibulum eu purus nibh.

---

Morbi aliquet, metus at sagittis rhoncus, sapien purus tempus diam, sit amet hendrerit ipsum ex nec leo. Integer molestie commodo urna vitae condimentum. Maecenas pharetra, mi sit amet pretium pharetra, neque elit venenatis justo, a aliquam elit enim vitae orci. Suspendisse quis arcu sed erat rhoncus accumsan a non leo. Duis at diam eu felis interdum commodo ac quis justo. Suspendisse semper nisl sit amet interdum volutpat. Aliquam elit ex, cursus at pellentesque sed, varius ac diam. Aliquam quis nibh non elit semper efficitur. Sed malesuada urna tellus, eu rhoncus erat porttitor vel. Nullam a mi vitae erat accumsan sagittis at nec sem. Praesent mi justo, efficitur vel diam ut, ullamcorper vestibulum sem. Nunc vitae faucibus quam.
Morbi suscipit ultricies turpis quis varius. Proin luctus, erat in feugiat pulvinar, dolor ante finibus magna, id lacinia lacus est at mi. Phasellus felis diam, rhoncus vitae maximus luctus, interdum a sapien. Vivamus iaculis vel ex id ornare. Donec condimentum ligula ac sollicitudin dictum. Sed ornare rutrum convallis. Integer sollicitudin tempus quam at suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in odio ut augue convallis posuere vitae in nisi. Ut a mattis turpis. Nam vulputate non sapien sit amet aliquet. Suspendisse quis erat felis. Maecenas lobortis porttitor pellentesque. Integer ullamcorper quis nisi vitae suscipit. Ut at est tempor, pretium tortor id, rutrum diam. Aenean tempor ullamcorper hendrerit.

---

Morbi justo diam, pellentesque quis porta ac, pulvinar nec elit. Ut dignissim efficitur libero non convallis. Nullam eu tincidunt libero, sed tempus elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer a imperdiet sem, vel eleifend purus. Nullam urna enim, mollis sit amet augue eget, sodales euismod erat. Maecenas maximus arcu eu volutpat bibendum. Duis placerat malesuada libero, et feugiat massa feugiat sit amet. Donec auctor lacinia pellentesque. Donec molestie dolor bibendum, luctus lacus a, euismod lorem. Aliquam elementum quam id ex ornare auctor. Maecenas interdum, ligula eleifend viverra posuere, sem massa mattis velit, nec aliquet turpis urna vitae erat. Vestibulum eu purus nibh.
Morbi suscipit ultricies turpis quis varius. Proin luctus, erat in feugiat pulvinar, dolor ante finibus magna, id lacinia lacus est at mi. Phasellus felis diam, rhoncus vitae maximus luctus, interdum a sapien. Vivamus iaculis vel ex id ornare. Donec condimentum ligula ac sollicitudin dictum. Sed ornare rutrum convallis. Integer sollicitudin tempus quam at suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in odio ut augue convallis posuere vitae in nisi. Ut a mattis turpis. Nam vulputate non sapien sit amet aliquet. Suspendisse quis erat felis. Maecenas lobortis porttitor pellentesque. Integer ullamcorper quis nisi vitae suscipit. Ut at est tempor, pretium tortor id, rutrum diam. Aenean tempor ullamcorper hendrerit.

---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum mauris nec venenatis convallis. Vivamus ultrices fermentum dapibus. Sed quis erat maximus, scelerisque tellus eget, suscipit nisl. Donec vulputate purus ultricies dolor tristique bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur vel diam non eleifend. Proin ultrices leo pulvinar ipsum lobortis, vel sodales quam sagittis.

---

## Dernière page

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
							const type = matchInformations[1];
							let title = matchInformations[2];
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

// Gestion du markdown dans les réponses du chatbot
const converter = new showdown.Converter({
	emoji: true,
	parseImgDimensions: true,
	simpleLineBreaks: true,
	simplifiedAutoLink: true,
	tables: true,
	openLinksInNewWindow: true,
	extensions: [showdownExtensionAdmonitions],
});

function markdownToHTML(text) {
	const html = converter.makeHtml(text);
	return html;
}

let flipbookData;

function getMarkdownContent() {
	// Récupération du markdown externe
	let urlMD = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	if (urlMD !== "") {
		// Gestion des fichiers hébergés sur github
		if (urlMD.startsWith("https://github.com")) {
			urlMD = urlMD.replace(
				"https://github.com",
				"https://raw.githubusercontent.com"
			);
			urlMD = urlMD.replace("/blob/", "/");
		}
		// Gestion des fichiers hébergés sur codiMD
		if (
			urlMD.startsWith("https://codimd") &&
			urlMD.indexOf("download") === -1
		) {
			urlMD =
				urlMD
					.replace("?edit", "")
					.replace("?both", "")
					.replace("?view", "")
					.replace(/#$/, "") + "/download";
		}
		// Vérification de la présence d'un raccourci
		shortcut = shortcuts.find((element) => element[0] == urlMD);
		if (shortcut) {
			urlMD = shortcut[1];
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

function parseMarkdown(markdownContent) {
	let flipbookDataArray = [];

	markdownContent = fixImageDimensionsCodiMD(markdownContent);

	const markdownContentSplitted = markdownContent.split("---");
	if (markdownContentSplitted.length > 2 && markdownContent.startsWith("---")) {
		try {
			yamlData = jsyaml.load(markdownContentSplitted[1]);
			for (const property in yamlData) {
			}
		} catch (e) {}
		flipbookDataArray = markdownContentSplitted.shift();
	} else {
		flipbookDataArray = markdownContentSplitted;
	}

	return flipbookDataArray;
}

function createHTMLelements(flipbookDataArray) {
	for (let index = 0; index < flipbookDataArray.length; index++) {
		const pageHTML = markdownToHTML(flipbookDataArray[index]);
		const div = document.createElement("div");
		div.innerHTML = pageHTML;
		div.classList.add("page");
		if (index === 0 || index === flipbookDataArray.length - 1) {
			div.setAttribute("data-density", "hard");
		}
		document.body.appendChild(div);
	}
}
