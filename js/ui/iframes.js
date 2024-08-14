// Pour sortir d'une iframe : permet de stopper la vidéo, et remet le focus sur le livre pour pouvoir le contrôler avec le clavier
function resetIframe(iframe) {
	const srcIframe = iframe.src;
	iframe.blur();
	iframe.src = "";
	iframe.src = srcIframe;
}
export function focusOutIframe(pages) {
	const activeIframe = document.activeElement;
	if (activeIframe.type == "iframe") {
		resetIframe(activeIframe);
	} else {
		for (const page of pages) {
			if (page.style.display == "block") {
				const iframe = page.querySelector("iframe");
				if (iframe) {
					resetIframe(iframe);
				}
			}
		}
	}
}