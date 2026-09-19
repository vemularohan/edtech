import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as CodepathApp } from "./CodepathApp-BhPDt6mW.mjs";
import { t as Route } from "./challenge-DR92LTIm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/challenge-DbnuoJ7H.js
var import_jsx_runtime = require_jsx_runtime();
function ChallengeRoute() {
	const { module, challenge } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodepathApp, {
		view: "challenge",
		...module ? { moduleId: module } : {},
		...challenge ? { challengeId: challenge } : {}
	});
}
//#endregion
export { ChallengeRoute as component };
