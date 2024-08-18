import { focusOutIframe } from "./iframes";

// Gestion du redimensionnement
// On ne redimensionne pas si on a cliqué sur un élément (comme une vidéo) pour passer en plein écran ou revenir en écran normal
let previousWindowWidth = window.innerWidth;
function onResize(pages) {
	const newWindowWidth = window.innerWidth;
	if (!document.fullscreenElement && previousWindowWidth != newWindowWidth) {
		location.reload();
	}
	if (!document.fullscreenElement) {
		focusOutIframe(pages);
		previousWindowWidth = newWindowWidth;
	}
}

export function handleResizeWindow(pages) {
	let timeout;
	window.addEventListener("resize", function () {
		clearTimeout(timeout);
		timeout = setTimeout(onResize(pages), 250);
	});
}
