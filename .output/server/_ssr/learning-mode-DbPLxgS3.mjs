import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, n as objectType, r as preprocessType, t as coerce } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learning-mode-DbPLxgS3.js
var $$splitComponentImporter = () => import("./learning-mode-CPmU-SQf.mjs");
function normalizeModuleCode(val) {
	if (!val) return void 0;
	const str = String(val).replace(/^["']|["']$/g, "").trim();
	if (/^3\.\d+$/.test(str)) return str;
	const match = str.match(/^(?:module-?|mod-?)?(\d+)$/i);
	if (match && match[1]) {
		const num = parseInt(match[1], 10);
		if (num >= 1 && num <= 20) return `3.${num + 1}`;
		if (num === 0) return "3.1";
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
