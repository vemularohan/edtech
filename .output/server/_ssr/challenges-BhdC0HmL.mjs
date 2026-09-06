import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as CodepathApp } from "./CodepathApp-CrtfISs8.mjs";
import { t as Route } from "./challenges-Ba6ZYEFs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/challenges-BhdC0HmL.js
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
