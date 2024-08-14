// On change l'affichage de l'URL sans recharger la page
const hash = window.location.hash.substring(1);
const baseURL = window.location.origin + window.location.pathname;

export function changeURL(page) {
	const newURL = baseURL + "?page=" + page + "#" + hash;
	history.pushState({ path: newURL }, "", newURL);
}