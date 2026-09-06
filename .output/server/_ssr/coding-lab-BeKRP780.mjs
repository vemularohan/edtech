import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as CodepathApp } from "./CodepathApp-DZoGDqxG.mjs";
import { t as Route } from "./coding-lab-DybjLnhY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coding-lab-BeKRP780.js
var import_jsx_runtime = require_jsx_runtime();
function CodingLabRoute() {
	const { module } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodepathApp, {
		view: "lab",
		...module ? { moduleId: module } : {}
	});
}
//#endregion
export { CodingLabRoute as component };
