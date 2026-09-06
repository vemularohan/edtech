import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as CodepathApp } from "./CodepathApp-BeENH3ic.mjs";
import { t as Route } from "./challenge-B2eCyyZK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/challenge-CP0q6BEd.js
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
