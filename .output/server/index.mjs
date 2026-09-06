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
		"mtime": "2026-09-06T15:26:18.131Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/admin-Cp9QpBuy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-1H4+MO4E4aWFom+XJh0/VY/A7Yk\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 77,
		"path": "../public/assets/admin-Cp9QpBuy.js"
	},
	"/assets/analytics-BeL3uF0Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-yQKTmiqLpd5jldrJG58j/Lb7vl8\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 156,
		"path": "../public/assets/analytics-BeL3uF0Z.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-06T15:26:18.131Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/career-CUK-vv7v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-qYu42t015SwIU/fSYvEDa0+CaqI\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 153,
		"path": "../public/assets/career-CUK-vv7v.js"
	},
	"/assets/career-roadmap-CUK-vv7v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-qYu42t015SwIU/fSYvEDa0+CaqI\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-CUK-vv7v.js"
	},
	"/assets/auth-Cr4O09m-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-50nVQhtGX1PFJhK+B4ZrsT1l+i4\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 77,
		"path": "../public/assets/auth-Cr4O09m-.js"
	},
	"/assets/build-4eo8Bb05.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-2PW06m4h/YcLe/Q4nZRL/ggdo5M\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 155,
		"path": "../public/assets/build-4eo8Bb05.js"
	},
	"/assets/challenges-Ds80WixG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-kNCBHtFx9RUHhlnT/+OJ2+3Kj7Y\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 327,
		"path": "../public/assets/challenges-Ds80WixG.js"
	},
	"/assets/challenge-BObiiqN9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-Z4KKWl6I9/96mGVqlBk06NfA9TY\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 293,
		"path": "../public/assets/challenge-BObiiqN9.js"
	},
	"/assets/coding-lab-BdjXPGZQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-ZMEOMb0qaWneSm5w5/Iw0unHHSY\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 538,
		"path": "../public/assets/coding-lab-BdjXPGZQ.js"
	},
	"/assets/challenge-BUVMRYqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-5QH+lMzxRCbL4v8aJnQ+5rCRGsE\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 574,
		"path": "../public/assets/challenge-BUVMRYqZ.js"
	},
	"/assets/coding-lab-Cd_gG4gA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-HBeev1vL8e0SzNGESj3YdjSDrG4\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 252,
		"path": "../public/assets/coding-lab-Cd_gG4gA.js"
	},
	"/assets/challenges-sa86kaEo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-b/JYI648+W6czI2bQFbUfL+9uTU\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 622,
		"path": "../public/assets/challenges-sa86kaEo.js"
	},
	"/assets/curriculum-B-8GFgdb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-Crih2VE4uAzglgdRg36hc0UAH3E\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 150,
		"path": "../public/assets/curriculum-B-8GFgdb.js"
	},
	"/assets/dashboard-DNKg--BN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-kuJ0B+lL4V1D/AASI3a/35etNLE\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 156,
		"path": "../public/assets/dashboard-DNKg--BN.js"
	},
	"/assets/curriculum-map-B-8GFgdb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-Crih2VE4uAzglgdRg36hc0UAH3E\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-B-8GFgdb.js"
	},
	"/assets/link-DPT17Rzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a71-EFLLr2tSiGxPMwmuj/7YlZtJNLo\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 35441,
		"path": "../public/assets/link-DPT17Rzw.js"
	},
	"/assets/learning-mode-DHWESZpz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-mDkMV1cJqSUrUUgYhaQhHwJ2RSo\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 631,
		"path": "../public/assets/learning-mode-DHWESZpz.js"
	},
	"/assets/learning-mode-rISkUjxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-0VFtZusYwmhjQqIEVT9oojQ02Jw\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 328,
		"path": "../public/assets/learning-mode-rISkUjxY.js"
	},
	"/assets/onboarding-WQzB8CcY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-ypI3yAhITvClSNXaTbKyv8PsRHU\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 77,
		"path": "../public/assets/onboarding-WQzB8CcY.js"
	},
	"/assets/preload-helper-psnANCaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-NSLNnCSS3sScAI2h2HNs46WH5z0\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-psnANCaL.js"
	},
	"/assets/portfolio-Cgc6o-0I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-R/MI3HPOVrSSjqwrQaalqMug9F8\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 154,
		"path": "../public/assets/portfolio-Cgc6o-0I.js"
	},
	"/assets/index-aVRln5NE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc73-WyU6q4mLCImcEOM5sg+NZ3wiZhg\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 310387,
		"path": "../public/assets/index-aVRln5NE.js"
	},
	"/assets/CodepathApp-esDvtMSC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8acd-nr3041Krg2S1zgVbtd5LGJ6jSqA\"",
		"mtime": "2026-09-06T15:26:17.988Z",
		"size": 690893,
		"path": "../public/assets/CodepathApp-esDvtMSC.js"
	},
	"/assets/profile-Cgc6o-0I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-R/MI3HPOVrSSjqwrQaalqMug9F8\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 154,
		"path": "../public/assets/profile-Cgc6o-0I.js"
	},
	"/assets/projects-4eo8Bb05.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-2PW06m4h/YcLe/Q4nZRL/ggdo5M\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 155,
		"path": "../public/assets/projects-4eo8Bb05.js"
	},
	"/assets/recovery-8j-Zi1fo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-AvnaMLqm00I5F81yKKYKGbwRdws\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 155,
		"path": "../public/assets/recovery-8j-Zi1fo.js"
	},
	"/assets/routes-DNKg--BN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-kuJ0B+lL4V1D/AASI3a/35etNLE\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 156,
		"path": "../public/assets/routes-DNKg--BN.js"
	},
	"/assets/skills-BeL3uF0Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-yQKTmiqLpd5jldrJG58j/Lb7vl8\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 156,
		"path": "../public/assets/skills-BeL3uF0Z.js"
	},
	"/assets/styles-BKzTAk5Z.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2200b-xyOucUTTexMJoYoYVFXkooAAV7I\"",
		"mtime": "2026-09-06T15:26:17.990Z",
		"size": 139275,
		"path": "../public/assets/styles-BKzTAk5Z.css"
	},
	"/assets/tutor-lF6vxdC6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-GIMD39oCh/PK5fpr6VhIiKlN+So\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 152,
		"path": "../public/assets/tutor-lF6vxdC6.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/verify._certificateId-pW0RDGed.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-/GOl2hcP2hWrzpeLeMwimUCesqc\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-pW0RDGed.js"
	},
	"/assets/verify._certificateId-uF3JI4oY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-GKa8XeEPYlfsS6219gbvLKAj/4o\"",
		"mtime": "2026-09-06T15:26:17.989Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-uF3JI4oY.js"
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
