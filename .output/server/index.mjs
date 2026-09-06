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
		"mtime": "2026-09-06T14:27:08.142Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-06T14:27:08.142Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/admin-DSls-gvj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-O7byoFamaJdQgVJ5YnTkpXeYtRk\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 77,
		"path": "../public/assets/admin-DSls-gvj.js"
	},
	"/assets/analytics-C1PtlCGC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-4KGx6mVR+1DYvHLeTvSJRPkD5Bs\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 156,
		"path": "../public/assets/analytics-C1PtlCGC.js"
	},
	"/assets/auth-CWtHimEy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-EUWzPZsZ1haZYibt9bYREpdQNFQ\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 77,
		"path": "../public/assets/auth-CWtHimEy.js"
	},
	"/assets/build-CSBr0Lvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-KshafPgE04d2YM4dTbcwvj3rbY8\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 155,
		"path": "../public/assets/build-CSBr0Lvd.js"
	},
	"/assets/career-DASb9T3w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-sEPOJSE5qT+ZULPxjsUgOF7GndY\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 153,
		"path": "../public/assets/career-DASb9T3w.js"
	},
	"/assets/career-roadmap-DASb9T3w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-sEPOJSE5qT+ZULPxjsUgOF7GndY\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-DASb9T3w.js"
	},
	"/assets/challenge-3USo_Ksg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-WxRm1ov9xD9VuInrirwOiI8C+G0\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 293,
		"path": "../public/assets/challenge-3USo_Ksg.js"
	},
	"/assets/challenge-C1BMz5VM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-7xNpZGb77+IoiX2b3nChKx8sewY\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 574,
		"path": "../public/assets/challenge-C1BMz5VM.js"
	},
	"/assets/challenges--pYCv3qs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-xvZlDYyrN+K1s+DoMZHfvjzO1ks\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 622,
		"path": "../public/assets/challenges--pYCv3qs.js"
	},
	"/assets/challenges-BXI0iRGQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-xJrIN2s2R/a3DvOynWZXbuwTfmI\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 327,
		"path": "../public/assets/challenges-BXI0iRGQ.js"
	},
	"/assets/coding-lab-B1F0fINB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-8xA366cDj6T6+8LkzuqeCJbtubk\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 252,
		"path": "../public/assets/coding-lab-B1F0fINB.js"
	},
	"/assets/coding-lab-DNyz7vAW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-cKtA/49f6Va4FpDyGzhgh6b45uE\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 538,
		"path": "../public/assets/coding-lab-DNyz7vAW.js"
	},
	"/assets/dashboard-DqnWYOwk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-zBHyJagb6FzluUm9HsZp5vkEsrc\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 156,
		"path": "../public/assets/dashboard-DqnWYOwk.js"
	},
	"/assets/learning-mode-BGF75jJT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-Rzzc6VfiDfODAVThH9C1kb2tBpA\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 631,
		"path": "../public/assets/learning-mode-BGF75jJT.js"
	},
	"/assets/curriculum-CWmm8JJG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-1jVeOOmMXw4rD5c30StOHuRwG1g\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 150,
		"path": "../public/assets/curriculum-CWmm8JJG.js"
	},
	"/assets/curriculum-map-CWmm8JJG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-1jVeOOmMXw4rD5c30StOHuRwG1g\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-CWmm8JJG.js"
	},
	"/assets/learning-mode-DHGBYivm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-hppdgx+rB74oet4hIhwcLZmdETQ\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 328,
		"path": "../public/assets/learning-mode-DHGBYivm.js"
	},
	"/assets/onboarding-CjfxE_bG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-2os62xQtHQy0+MV6t9ylaNsrVIc\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 77,
		"path": "../public/assets/onboarding-CjfxE_bG.js"
	},
	"/assets/preload-helper-psnANCaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-NSLNnCSS3sScAI2h2HNs46WH5z0\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-psnANCaL.js"
	},
	"/assets/link-DPT17Rzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a71-EFLLr2tSiGxPMwmuj/7YlZtJNLo\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 35441,
		"path": "../public/assets/link-DPT17Rzw.js"
	},
	"/assets/portfolio-B68Lt6TI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-PYwjdXvUQCMPSmFOLmXEDyn5U6o\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 154,
		"path": "../public/assets/portfolio-B68Lt6TI.js"
	},
	"/assets/index-C6AbQdLm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc73-6Q7oaXK7bOUN+gs+Q0WLRsr2IDc\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 310387,
		"path": "../public/assets/index-C6AbQdLm.js"
	},
	"/assets/CodepathApp-C9s-tk4j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6f6c-QKjNohEVPXIr0Um2vNahHSt0HgM\"",
		"mtime": "2026-09-06T14:27:08.016Z",
		"size": 683884,
		"path": "../public/assets/CodepathApp-C9s-tk4j.js"
	},
	"/assets/recovery-DQUn7b3y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-jw7/HBko8tvFGhm0aeqeWp1nKN0\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 155,
		"path": "../public/assets/recovery-DQUn7b3y.js"
	},
	"/assets/profile-B68Lt6TI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-PYwjdXvUQCMPSmFOLmXEDyn5U6o\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 154,
		"path": "../public/assets/profile-B68Lt6TI.js"
	},
	"/assets/projects-CSBr0Lvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-KshafPgE04d2YM4dTbcwvj3rbY8\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 155,
		"path": "../public/assets/projects-CSBr0Lvd.js"
	},
	"/assets/tutor-CrVWUiIz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-HNJGkhKv65dmYETb8ZxYrnzDvdA\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 152,
		"path": "../public/assets/tutor-CrVWUiIz.js"
	},
	"/assets/routes-DqnWYOwk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-zBHyJagb6FzluUm9HsZp5vkEsrc\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 156,
		"path": "../public/assets/routes-DqnWYOwk.js"
	},
	"/assets/verify._certificateId-BFJPncBw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-iZ/hLbLDeXP+sn9Z2t6E1F/RNDI\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-BFJPncBw.js"
	},
	"/assets/skills-C1PtlCGC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-4KGx6mVR+1DYvHLeTvSJRPkD5Bs\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 156,
		"path": "../public/assets/skills-C1PtlCGC.js"
	},
	"/assets/styles-BVqulG9n.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"21915-2EPNXuA06OxU2N47W3hNf+jKIKc\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 137493,
		"path": "../public/assets/styles-BVqulG9n.css"
	},
	"/assets/verify._certificateId-CNU0v30S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-ORCYNUd3P1ij6k9lv5zw9eX2WiA\"",
		"mtime": "2026-09-06T14:27:08.017Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-CNU0v30S.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-06T14:27:08.017Z",
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
