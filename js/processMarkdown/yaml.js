import jsYaml from "../externals/js-yaml.js";
import { loadScript, loadCSS } from "../utils.js";

export let yaml;

export function processYAML(markdownContent) {
	try {
		// Traitement des propriétés dans le YAML
		yaml = jsYaml.load(markdownContent.split("---")[1]);
		if (yaml.maths === true) {
			Promise.all([
				loadScript(
					"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
				),
				loadCSS("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"),
			]);
		}
		if (yaml.style) {
			const styleElement = document.createElement("style");
			styleElement.innerHTML = yaml.style.replaceAll("\\", "");
			document.body.appendChild(styleElement);
		}
	} catch (e) {
		console.log("erreur processYAML : " + e);
	}
}
