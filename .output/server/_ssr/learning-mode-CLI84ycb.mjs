import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, n as objectType, r as preprocessType, t as coerce } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learning-mode-CLI84ycb.js
var $$splitComponentImporter = () => import("./learning-mode-BqasBS6v.mjs");
function normalizeModuleCode(val) {
	if (!val) return void 0;
	const str = String(val).replace(/^"|"$/g, "").trim();
	if (/^3\.\d+$/.test(str)) return str;
	const num = parseInt(str, 10);
	if (!Number.isNaN(num)) {
		if (num === 1) return "3.2";
		if (num === 0) return "3.1";
		return `3.${num + 1}`;
	}
}
var Route = createFileRoute("/learning-mode")({
	validateSearch: objectType({
		module: preprocessType(normalizeModuleCode, stringType().optional()),
		concept: stringType().trim().min(1).optional(),
		step: coerce.number().int().min(0).optional()
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
