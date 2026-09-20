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
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-20T18:22:47.399Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-20T18:22:47.399Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/analytics-C_kseboc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-jXoiV0uNyahNm/fSaaG+IkuUFXI\"",
		"mtime": "2026-09-20T18:22:47.260Z",
		"size": 156,
		"path": "../public/assets/analytics-C_kseboc.js"
	},
	"/assets/admin-CRM-s1lv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Y5Zo7lIPgg6upkEm9rETFbWnKGo\"",
		"mtime": "2026-09-20T18:22:47.260Z",
		"size": 77,
		"path": "../public/assets/admin-CRM-s1lv.js"
	},
	"/assets/auth-DzrfX5Eg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-rtID28FDmH7T/zhaW8lYadV0NH8\"",
		"mtime": "2026-09-20T18:22:47.260Z",
		"size": 77,
		"path": "../public/assets/auth-DzrfX5Eg.js"
	},
	"/assets/career-BOqvMLBF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-n4AwCrucAGvjI2fGNznnyrBwBPI\"",
		"mtime": "2026-09-20T18:22:47.260Z",
		"size": 153,
		"path": "../public/assets/career-BOqvMLBF.js"
	},
	"/assets/career-roadmap-BOqvMLBF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-n4AwCrucAGvjI2fGNznnyrBwBPI\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-BOqvMLBF.js"
	},
	"/assets/build-D1dNwGrB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-GHfVroztdXFcZzL9HSkukuVyCsc\"",
		"mtime": "2026-09-20T18:22:47.260Z",
		"size": 155,
		"path": "../public/assets/build-D1dNwGrB.js"
	},
	"/assets/challenge-CsPD5T28.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-GxY7Gy+7WITi892w3Ioisjxa9EE\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 293,
		"path": "../public/assets/challenge-CsPD5T28.js"
	},
	"/assets/challenge-D48O4uir.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-zoUC+qmtO1Od5JOu3+dl3AGh2ic\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 574,
		"path": "../public/assets/challenge-D48O4uir.js"
	},
	"/assets/CodepathApp-wJQSU3OO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6151d-iAuV+MJzDlir6ZycrBXpYcE5jwY\"",
		"mtime": "2026-09-20T18:22:47.260Z",
		"size": 398621,
		"path": "../public/assets/CodepathApp-wJQSU3OO.js"
	},
	"/assets/challenges-B-pLgVjV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-eIRFKhs8KkH5A6slgpXaBxBUG6w\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 327,
		"path": "../public/assets/challenges-B-pLgVjV.js"
	},
	"/assets/challenges-D4ceXtjw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-pq5B75B8IAFzZyEB8TDQCAH0gso\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 622,
		"path": "../public/assets/challenges-D4ceXtjw.js"
	},
	"/assets/coding-lab-DdXnekSW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-gOqFPtAs8iN+yJU7Sm5r1hM+0QM\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 252,
		"path": "../public/assets/coding-lab-DdXnekSW.js"
	},
	"/assets/coding-lab-G0mO---1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-C9IV/QNv3YRiQ7/wbVsOHQMNaqI\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 538,
		"path": "../public/assets/coding-lab-G0mO---1.js"
	},
	"/assets/curriculum-map-wti-XGyn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-jT3FDrxNrSGBz4sL2Si0cJwLlVg\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-wti-XGyn.js"
	},
	"/assets/dashboard-6B9DTSAd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-NCFaoXrhprJza3loUumqShDmpsE\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 156,
		"path": "../public/assets/dashboard-6B9DTSAd.js"
	},
	"/assets/curriculum-wti-XGyn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-jT3FDrxNrSGBz4sL2Si0cJwLlVg\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 150,
		"path": "../public/assets/curriculum-wti-XGyn.js"
	},
	"/assets/index-M2fTuTs2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc7b-3aosK2P6xrAybmKVVh7cl/3ShGU\"",
		"mtime": "2026-09-20T18:22:47.260Z",
		"size": 310395,
		"path": "../public/assets/index-M2fTuTs2.js"
	},
	"/assets/learning-mode-DWaoCU7Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-WwlYe3CTMTGTBjZqvMhb9ZqnbD4\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 328,
		"path": "../public/assets/learning-mode-DWaoCU7Y.js"
	},
	"/assets/link-DIt654cv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89ee-g1xPSHpPKZJtIJEka9p237x55iU\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 35310,
		"path": "../public/assets/link-DIt654cv.js"
	},
	"/assets/learning-mode-CunqKgKG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32e-gF1mZpQ9mpcdGl7IFIK/pzrO0fk\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 814,
		"path": "../public/assets/learning-mode-CunqKgKG.js"
	},
	"/assets/onboarding-C_SgYBPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-WZjrpZuzPXopKk2ngG/gnFCHwy4\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 77,
		"path": "../public/assets/onboarding-C_SgYBPT.js"
	},
	"/assets/portfolio-D-I6i3VT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-iSOd6MM99kYgT8pOv7HPQKJjqcg\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 154,
		"path": "../public/assets/portfolio-D-I6i3VT.js"
	},
	"/assets/preload-helper-Ucm0VEts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-AEfftRosRNarkU/QLujUN9Mvgew\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-Ucm0VEts.js"
	},
	"/assets/profile-D-I6i3VT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-iSOd6MM99kYgT8pOv7HPQKJjqcg\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 154,
		"path": "../public/assets/profile-D-I6i3VT.js"
	},
	"/assets/projects-D1dNwGrB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-GHfVroztdXFcZzL9HSkukuVyCsc\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 155,
		"path": "../public/assets/projects-D1dNwGrB.js"
	},
	"/assets/recovery-C5nIPq9h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-M6sHzTCEj5XnInr6fCjN2OP+2HM\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 155,
		"path": "../public/assets/recovery-C5nIPq9h.js"
	},
	"/assets/routes-6B9DTSAd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-NCFaoXrhprJza3loUumqShDmpsE\"",
		"mtime": "2026-09-20T18:22:47.261Z",
		"size": 156,
		"path": "../public/assets/routes-6B9DTSAd.js"
	},
	"/assets/skills-C_kseboc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-jXoiV0uNyahNm/fSaaG+IkuUFXI\"",
		"mtime": "2026-09-20T18:22:47.262Z",
		"size": 156,
		"path": "../public/assets/skills-C_kseboc.js"
	},
	"/assets/tutor-C01Jq34O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-MVK+T9aLyB+BRehB7U0sCRJdff4\"",
		"mtime": "2026-09-20T18:22:47.262Z",
		"size": 152,
		"path": "../public/assets/tutor-C01Jq34O.js"
	},
	"/assets/styles-Cpeg-yYC.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"25353-WRRkMR0vIqOwZwc/rVISlxwF+/c\"",
		"mtime": "2026-09-20T18:22:47.262Z",
		"size": 152403,
		"path": "../public/assets/styles-Cpeg-yYC.css"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-20T18:22:47.262Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/verify._certificateId-BxbDLz9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-lUQbgQHq/0zqEu/KmU4SlY5jMMo\"",
		"mtime": "2026-09-20T18:22:47.262Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-BxbDLz9w.js"
	},
	"/assets/verify._certificateId-fLsLoWFB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-WLb452+fXfYskx/FduC3bWZUYSY\"",
		"mtime": "2026-09-20T18:22:47.262Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-fLsLoWFB.js"
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
