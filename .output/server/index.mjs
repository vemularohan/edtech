globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-19T15:52:29.540Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-19T15:52:29.540Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/admin-C5lTyfbO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-j6Yk+EEJJ6oBmgfqseqDuojwa/w\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 77,
		"path": "../public/assets/admin-C5lTyfbO.js"
	},
	"/assets/auth-D8IX3Ln7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-SpW8DcfgvdxcpxPtA6tA4pPD7UI\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 77,
		"path": "../public/assets/auth-D8IX3Ln7.js"
	},
	"/assets/CodepathApp-BhdMccMZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61076-t+OydVIsGIYjcLNKsZFJJ/jK258\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 397430,
		"path": "../public/assets/CodepathApp-BhdMccMZ.js"
	},
	"/assets/build-CSkzEGnb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-mD5v/dOrIS92UdLvd9UsTNCefzY\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 155,
		"path": "../public/assets/build-CSkzEGnb.js"
	},
	"/assets/career-roadmap-feKDv5hy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-PtxZOnIIzPwvsIyLqjf+T4vtyns\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-feKDv5hy.js"
	},
	"/assets/analytics-wbqDiv2T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-N3SHry5kuC1URrhxlzu2/lgzvlI\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 156,
		"path": "../public/assets/analytics-wbqDiv2T.js"
	},
	"/assets/challenge-Ibnx9AGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-ATVq8qwBHH/fy/oO39OpwLCDOq8\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 293,
		"path": "../public/assets/challenge-Ibnx9AGc.js"
	},
	"/assets/career-feKDv5hy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-PtxZOnIIzPwvsIyLqjf+T4vtyns\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 153,
		"path": "../public/assets/career-feKDv5hy.js"
	},
	"/assets/challenges-C4NtZTb8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-o4U79EAEabaL5qkr/MCW1H9+9dc\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 622,
		"path": "../public/assets/challenges-C4NtZTb8.js"
	},
	"/assets/challenge-DZN8BudG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-vjcYTbGLXwi5+mgTTz8vI1ZzmM4\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 574,
		"path": "../public/assets/challenge-DZN8BudG.js"
	},
	"/assets/challenges-D7bvsu-o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-CSuV+ChjWMyl0xgY1l0JQ3udSSQ\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 327,
		"path": "../public/assets/challenges-D7bvsu-o.js"
	},
	"/assets/coding-lab-CkH5F9K0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-pqBkBfXQ7W4rw9nj+Vi2ogDI/8M\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 538,
		"path": "../public/assets/coding-lab-CkH5F9K0.js"
	},
	"/assets/curriculum-CqfkPSnR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-hQcWniL6y/cmoT+X5qnuMtVjLu8\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 150,
		"path": "../public/assets/curriculum-CqfkPSnR.js"
	},
	"/assets/curriculum-map-CqfkPSnR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-hQcWniL6y/cmoT+X5qnuMtVjLu8\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-CqfkPSnR.js"
	},
	"/assets/dashboard-C9F5xi-p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-NzYyze0ZbX00fRjdot0Hc/BdMGE\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 156,
		"path": "../public/assets/dashboard-C9F5xi-p.js"
	},
	"/assets/coding-lab-fQfpY5Eq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-73GojkzfLlZopQD8cT8yhtbqR5U\"",
		"mtime": "2026-09-19T15:52:29.377Z",
		"size": 252,
		"path": "../public/assets/coding-lab-fQfpY5Eq.js"
	},
	"/assets/onboarding-CeDZsf9u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-HGNG4j8KzzOwa+S4TWNpfjmq1hI\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 77,
		"path": "../public/assets/onboarding-CeDZsf9u.js"
	},
	"/assets/link-DIt654cv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89ee-g1xPSHpPKZJtIJEka9p237x55iU\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 35310,
		"path": "../public/assets/link-DIt654cv.js"
	},
	"/assets/learning-mode-DzyFXoJB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4-aVkAVPT/0Oyf3GW3qP5xXkFS9SQ\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 756,
		"path": "../public/assets/learning-mode-DzyFXoJB.js"
	},
	"/assets/portfolio-Uotuu9_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-STgNs78PAYAVa+Zug3y5ezpvG3U\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 154,
		"path": "../public/assets/portfolio-Uotuu9_Z.js"
	},
	"/assets/preload-helper-Ucm0VEts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-AEfftRosRNarkU/QLujUN9Mvgew\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-Ucm0VEts.js"
	},
	"/assets/index-BPmNOnMN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc7b-eBIzJYuPOIap0Cu0ckMbKCwsXHE\"",
		"mtime": "2026-09-19T15:52:29.376Z",
		"size": 310395,
		"path": "../public/assets/index-BPmNOnMN.js"
	},
	"/assets/learning-mode-D5kWn-ro.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-EWLAZ01wzwWrzCC0n6XB+ViPJgQ\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 328,
		"path": "../public/assets/learning-mode-D5kWn-ro.js"
	},
	"/assets/profile-Uotuu9_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-STgNs78PAYAVa+Zug3y5ezpvG3U\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 154,
		"path": "../public/assets/profile-Uotuu9_Z.js"
	},
	"/assets/projects-CSkzEGnb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-mD5v/dOrIS92UdLvd9UsTNCefzY\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 155,
		"path": "../public/assets/projects-CSkzEGnb.js"
	},
	"/assets/recovery-DyJvxN3r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-rHKyBdFdgHvBweCZbKE7qVXRgko\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 155,
		"path": "../public/assets/recovery-DyJvxN3r.js"
	},
	"/assets/routes-C9F5xi-p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-NzYyze0ZbX00fRjdot0Hc/BdMGE\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 156,
		"path": "../public/assets/routes-C9F5xi-p.js"
	},
	"/assets/tutor-thrhVWoZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-7DgdbUHcLF9pbNtRN0yQC76JBdc\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 152,
		"path": "../public/assets/tutor-thrhVWoZ.js"
	},
	"/assets/skills-wbqDiv2T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-N3SHry5kuC1URrhxlzu2/lgzvlI\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 156,
		"path": "../public/assets/skills-wbqDiv2T.js"
	},
	"/assets/styles-hRPOclJd.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"238cb-33xT6v9WCJMp8AwLbIDtYTgU2YM\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 145611,
		"path": "../public/assets/styles-hRPOclJd.css"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/verify._certificateId-B_wcJppj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-cwIibRGazEoZ2Fiq8R9nEHwoKE8\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-B_wcJppj.js"
	},
	"/assets/verify._certificateId-DmR52WmT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-X9K44TytdsytKbXAdqyjAiCWh6w\"",
		"mtime": "2026-09-19T15:52:29.378Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-DmR52WmT.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_3LFEn1 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_3LFEn1
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
