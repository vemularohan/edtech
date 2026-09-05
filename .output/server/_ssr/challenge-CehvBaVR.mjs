import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, n as objectType, r as preprocessType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/challenge-CehvBaVR.js
var $$splitComponentImporter = () => import("./challenge-D0uN4q3S.mjs");
var Route = createFileRoute("/challenge")({
	validateSearch: objectType({
		module: preprocessType((value) => value === void 0 ? void 0 : String(value).replace(/^"|"$/g, ""), stringType().regex(/^3\.\d+$/).optional()),
		challenge: stringType().trim().min(1).optional()
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
