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
		"mtime": "2026-09-06T14:35:46.590Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-06T14:35:46.590Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/analytics-CIq57yKW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-9KZjgKY7Lxc8fufIzBXk98WftIs\"",
		"mtime": "2026-09-06T14:35:46.468Z",
		"size": 156,
		"path": "../public/assets/analytics-CIq57yKW.js"
	},
	"/assets/auth-dXMuuoS_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-8P7k2/y4niGEGC4/EBkMGkoSkBo\"",
		"mtime": "2026-09-06T14:35:46.468Z",
		"size": 77,
		"path": "../public/assets/auth-dXMuuoS_.js"
	},
	"/assets/build-BkqW3RCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-FVcoRy/RZ7D2btQ7n95JkHnAods\"",
		"mtime": "2026-09-06T14:35:46.468Z",
		"size": 155,
		"path": "../public/assets/build-BkqW3RCk.js"
	},
	"/assets/admin-w1j3B3qq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Qpb728OkE4pOsJJesGlUp5kHMIs\"",
		"mtime": "2026-09-06T14:35:46.468Z",
		"size": 77,
		"path": "../public/assets/admin-w1j3B3qq.js"
	},
	"/assets/career-roadmap-yT3FGlN0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-tXA5ajp0tyJhcWzzXylZT9jibXw\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-yT3FGlN0.js"
	},
	"/assets/career-yT3FGlN0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-tXA5ajp0tyJhcWzzXylZT9jibXw\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 153,
		"path": "../public/assets/career-yT3FGlN0.js"
	},
	"/assets/challenge-v6cTfB5-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-MzU+4z1UV9KAfLgVf1fQwBDYU8Y\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 293,
		"path": "../public/assets/challenge-v6cTfB5-.js"
	},
	"/assets/challenges-By0CK2n9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-OqRxIlPHaqjx2GXVpCP7BGUz/p4\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 622,
		"path": "../public/assets/challenges-By0CK2n9.js"
	},
	"/assets/challenge-DU6RoakF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-xtjPLuQuUvyEBV/u67a1IbeP2wA\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 574,
		"path": "../public/assets/challenge-DU6RoakF.js"
	},
	"/assets/challenges-D3g80Iz1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-SdwTiTssP62ykye7/adz6Viza9A\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 327,
		"path": "../public/assets/challenges-D3g80Iz1.js"
	},
	"/assets/coding-lab-B5kOjeE6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-DyvyVT+l1fe9PN19ZxlSMLNlw3Y\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 252,
		"path": "../public/assets/coding-lab-B5kOjeE6.js"
	},
	"/assets/coding-lab-CzqdLLX3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-a/O0btLXgTJkaNw58dg1UHm1akM\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 538,
		"path": "../public/assets/coding-lab-CzqdLLX3.js"
	},
	"/assets/curriculum-D7sHkMjs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-4kLf7Auw/4LoMFNSYG6naWxX+7o\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 150,
		"path": "../public/assets/curriculum-D7sHkMjs.js"
	},
	"/assets/curriculum-map-D7sHkMjs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-4kLf7Auw/4LoMFNSYG6naWxX+7o\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-D7sHkMjs.js"
	},
	"/assets/dashboard-CEVJpiLk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-XkfPX57gZwIshnwzqkrodRRy8j0\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 156,
		"path": "../public/assets/dashboard-CEVJpiLk.js"
	},
	"/assets/index-mmQJLwmf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc73-newVB0dww/bJ4CO4yu/KIPXoqDU\"",
		"mtime": "2026-09-06T14:35:46.468Z",
		"size": 310387,
		"path": "../public/assets/index-mmQJLwmf.js"
	},
	"/assets/learning-mode-BBPzwbhT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-MZm89ud8HLmHw99R/k7TrRW5ERs\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 328,
		"path": "../public/assets/learning-mode-BBPzwbhT.js"
	},
	"/assets/link-DPT17Rzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a71-EFLLr2tSiGxPMwmuj/7YlZtJNLo\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 35441,
		"path": "../public/assets/link-DPT17Rzw.js"
	},
	"/assets/learning-mode-BRPbGI9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-xHIGg0kagLgUVFB8FnOWODGdLwk\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 631,
		"path": "../public/assets/learning-mode-BRPbGI9C.js"
	},
	"/assets/portfolio-BfHmcMMS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YSIwEvhfghKusC24vB+kzJHtWoo\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 154,
		"path": "../public/assets/portfolio-BfHmcMMS.js"
	},
	"/assets/CodepathApp-C-KjSiVe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a76a2-t0ZVAIOIUaZWmj7Gw1tzDYZAJXU\"",
		"mtime": "2026-09-06T14:35:46.468Z",
		"size": 685730,
		"path": "../public/assets/CodepathApp-C-KjSiVe.js"
	},
	"/assets/onboarding-Bze_UiMK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-tSkVQbe+N5poxolYj2YxAsqaxqc\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 77,
		"path": "../public/assets/onboarding-Bze_UiMK.js"
	},
	"/assets/preload-helper-psnANCaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-NSLNnCSS3sScAI2h2HNs46WH5z0\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-psnANCaL.js"
	},
	"/assets/profile-BfHmcMMS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-YSIwEvhfghKusC24vB+kzJHtWoo\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 154,
		"path": "../public/assets/profile-BfHmcMMS.js"
	},
	"/assets/projects-BkqW3RCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-FVcoRy/RZ7D2btQ7n95JkHnAods\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 155,
		"path": "../public/assets/projects-BkqW3RCk.js"
	},
	"/assets/recovery-Wj9EXGMS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-p23wP93Q7cjLIoDlXonF0MdWtjs\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 155,
		"path": "../public/assets/recovery-Wj9EXGMS.js"
	},
	"/assets/routes-CEVJpiLk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-XkfPX57gZwIshnwzqkrodRRy8j0\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 156,
		"path": "../public/assets/routes-CEVJpiLk.js"
	},
	"/assets/skills-CIq57yKW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-9KZjgKY7Lxc8fufIzBXk98WftIs\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 156,
		"path": "../public/assets/skills-CIq57yKW.js"
	},
	"/assets/styles-BVqulG9n.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"21915-2EPNXuA06OxU2N47W3hNf+jKIKc\"",
		"mtime": "2026-09-06T14:35:46.470Z",
		"size": 137493,
		"path": "../public/assets/styles-BVqulG9n.css"
	},
	"/assets/tutor-lCvQM835.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-nq7F0J7ojsHz9MdSEMnjvJWie6A\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 152,
		"path": "../public/assets/tutor-lCvQM835.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-06T14:35:46.469Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/verify._certificateId-8hbEHN-A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-10a7dJUZsP44Yoi/tjPN8smJWTM\"",
		"mtime": "2026-09-06T14:35:46.470Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-8hbEHN-A.js"
	},
	"/assets/verify._certificateId-B-Imzh72.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-yXStEGoDdd4rIQwdgw4L11Jfwd0\"",
		"mtime": "2026-09-06T14:35:46.470Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-B-Imzh72.js"
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
