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
		"mtime": "2026-09-05T19:53:12.734Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-CtOC1xZ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-9L6dz7f5BdruRVa2QtSMJ1lna7Q\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 77,
		"path": "../public/assets/admin-CtOC1xZ_.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-05T19:53:12.734Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/build-DvPD6oDV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-laWoHDevbG+KML4w2PVi0fpLaa4\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 155,
		"path": "../public/assets/build-DvPD6oDV.js"
	},
	"/assets/analytics-CkAIuHkR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-BMMioxx0SDkav+xnYpc6QxS/czA\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 156,
		"path": "../public/assets/analytics-CkAIuHkR.js"
	},
	"/assets/auth-atFtBtXk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-HR6Byt1HxkxgI9vaWIwi9Q6jCQ0\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 77,
		"path": "../public/assets/auth-atFtBtXk.js"
	},
	"/assets/career-DZQ2NUAR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hqEuGRspqUO6LsPfsgcY4AvbXLw\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 153,
		"path": "../public/assets/career-DZQ2NUAR.js"
	},
	"/assets/career-roadmap-DZQ2NUAR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-hqEuGRspqUO6LsPfsgcY4AvbXLw\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-DZQ2NUAR.js"
	},
	"/assets/challenge-2XrzaUWS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-eMN1Jn/IFatuei7NZPjGRILn2Q4\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 574,
		"path": "../public/assets/challenge-2XrzaUWS.js"
	},
	"/assets/challenges-BVlHtsOO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-4khvV0tMACMazLrj5sBcN8hMO0o\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 622,
		"path": "../public/assets/challenges-BVlHtsOO.js"
	},
	"/assets/challenge-Cx_2cZK1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-eeVO0g+FHYdwsT4qfPJsQPb09pQ\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 293,
		"path": "../public/assets/challenge-Cx_2cZK1.js"
	},
	"/assets/coding-lab-CjAstz6A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-QmNHLCs7hFPxgLoDIvNaS4X5Bpc\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 538,
		"path": "../public/assets/coding-lab-CjAstz6A.js"
	},
	"/assets/coding-lab-DR5kbuFT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-VKI6DPLTFXGulJo5Yp0OM7yi6kw\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 252,
		"path": "../public/assets/coding-lab-DR5kbuFT.js"
	},
	"/assets/curriculum-BX474fZV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-CpgapYwqYy+xMAouqwdnfMKiOtQ\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 150,
		"path": "../public/assets/curriculum-BX474fZV.js"
	},
	"/assets/dashboard-kaLG8r8z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-99F9Wqc79GJh2VdbjjYSN87S/JU\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 156,
		"path": "../public/assets/dashboard-kaLG8r8z.js"
	},
	"/assets/curriculum-map-BX474fZV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-CpgapYwqYy+xMAouqwdnfMKiOtQ\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-BX474fZV.js"
	},
	"/assets/challenges-Dm6s2a-J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-OhvT9GiiatlaNTn5sAdZqQ/xiHA\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 326,
		"path": "../public/assets/challenges-Dm6s2a-J.js"
	},
	"/assets/index-C5_VvtSJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc73-tOnXbhyBrIutHymXVCmw5oOvh4U\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 310387,
		"path": "../public/assets/index-C5_VvtSJ.js"
	},
	"/assets/learning-mode-_7vI_SOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-X/SzFiF9uAv4ArYPJSVOD0SN04U\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 328,
		"path": "../public/assets/learning-mode-_7vI_SOV.js"
	},
	"/assets/learning-mode-U1WQBirx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-H3q3ivY/4kUOoc/f0mqkjxeYack\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 631,
		"path": "../public/assets/learning-mode-U1WQBirx.js"
	},
	"/assets/link-DPT17Rzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a71-EFLLr2tSiGxPMwmuj/7YlZtJNLo\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 35441,
		"path": "../public/assets/link-DPT17Rzw.js"
	},
	"/assets/onboarding-DOh7Gwa_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-1zPzThLo5/XTQeQuSFJVWN2KCzI\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 77,
		"path": "../public/assets/onboarding-DOh7Gwa_.js"
	},
	"/assets/portfolio-BW-2hSxS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-qAOiLg6mI+ErZ04h9MJVJSHac/Y\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 154,
		"path": "../public/assets/portfolio-BW-2hSxS.js"
	},
	"/assets/preload-helper-psnANCaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-NSLNnCSS3sScAI2h2HNs46WH5z0\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-psnANCaL.js"
	},
	"/assets/CodepathApp-flCvIbzF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7a84-ITuAylzDLE4yE44HE8ujUJl6b78\"",
		"mtime": "2026-09-05T19:53:12.550Z",
		"size": 686724,
		"path": "../public/assets/CodepathApp-flCvIbzF.js"
	},
	"/assets/profile-BW-2hSxS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-qAOiLg6mI+ErZ04h9MJVJSHac/Y\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 154,
		"path": "../public/assets/profile-BW-2hSxS.js"
	},
	"/assets/projects-DvPD6oDV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-laWoHDevbG+KML4w2PVi0fpLaa4\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 155,
		"path": "../public/assets/projects-DvPD6oDV.js"
	},
	"/assets/recovery-oQ_ErNmn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-U/5MNU9r98+QCUaHXWa2lUR7ltU\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 155,
		"path": "../public/assets/recovery-oQ_ErNmn.js"
	},
	"/assets/routes-kaLG8r8z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-99F9Wqc79GJh2VdbjjYSN87S/JU\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 156,
		"path": "../public/assets/routes-kaLG8r8z.js"
	},
	"/assets/skills-CkAIuHkR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-BMMioxx0SDkav+xnYpc6QxS/czA\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 156,
		"path": "../public/assets/skills-CkAIuHkR.js"
	},
	"/assets/styles-FosNWiGX.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2193f-pHcOBGHcgG+60xkefKY5iE1aMio\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 137535,
		"path": "../public/assets/styles-FosNWiGX.css"
	},
	"/assets/tutor-4zM-aMXe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-IGl6CY8+37KlutvWYREVAd6m+3w\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 152,
		"path": "../public/assets/tutor-4zM-aMXe.js"
	},
	"/assets/verify._certificateId-BkbDxa6m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-+jxMfW5CK8+e9fEvkIfp3jPniqw\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-BkbDxa6m.js"
	},
	"/assets/verify._certificateId-DuMaGI17.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-X/egmvQNUVwPpD//WXTvgHy9Yuo\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-DuMaGI17.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-05T19:53:12.551Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
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
