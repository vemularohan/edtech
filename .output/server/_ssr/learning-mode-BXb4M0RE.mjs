import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, n as objectType, r as preprocessType, t as coerce } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learning-mode-BXb4M0RE.js
var $$splitComponentImporter = () => import("./learning-mode-COYWdzMK.mjs");
var Route = createFileRoute("/learning-mode")({
	validateSearch: objectType({
		module: preprocessType((value) => value === void 0 ? void 0 : String(value).replace(/^"|"$/g, ""), stringType().regex(/^3\.\d+$/).optional()),
		concept: stringType().trim().min(1).optional(),
		step: coerce.number().int().min(0).optional()
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
