import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as CodepathApp } from "./CodepathApp-C7czP9b2.mjs";
import { t as Route } from "./challenges-BzHLP7Yf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/challenges-DKKyehT-.js
var import_jsx_runtime = require_jsx_runtime();
function ChallengesRoute() {
	const { module, concept, step } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodepathApp, {
		view: "challenges",
		...module ? { moduleId: module } : {},
		...concept ? { concept } : {},
		...step !== void 0 ? { stepIndex: step } : {}
	});
}
//#endregion
export { ChallengesRoute as component };
