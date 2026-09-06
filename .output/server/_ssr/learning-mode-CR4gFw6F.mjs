import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as CodepathApp } from "./CodepathApp-CrtfISs8.mjs";
import { t as Route } from "./learning-mode-_dXCL68G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learning-mode-CR4gFw6F.js
var import_jsx_runtime = require_jsx_runtime();
function LearningModeRoute() {
	const { module, concept, step } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodepathApp, {
		view: "learning",
		...module ? { moduleId: module } : {},
		...concept ? { concept } : {},
		...step !== void 0 ? { stepIndex: step } : {}
	});
}
//#endregion
export { LearningModeRoute as component };
