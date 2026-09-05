import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, n as objectType, r as preprocessType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coding-lab-jPDdqxP2.js
var $$splitComponentImporter = () => import("./coding-lab-BUEpup52.mjs");
var Route = createFileRoute("/coding-lab")({
	validateSearch: objectType({ module: preprocessType((value) => value === void 0 ? void 0 : String(value).replace(/^"|"$/g, ""), stringType().regex(/^3\.\d+$/).optional()) }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
