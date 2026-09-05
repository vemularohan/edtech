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
		"mtime": "2026-09-05T15:21:25.112Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-05T15:21:25.112Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/admin-sVwKOY-a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-G1Mz+vV48pvE2bQ7DJP1OTSzE4w\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 77,
		"path": "../public/assets/admin-sVwKOY-a.js"
	},
	"/assets/auth-C2C2DV28.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-b8ofdMXqghqJ9nlAtKSGD8G0ooY\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 77,
		"path": "../public/assets/auth-C2C2DV28.js"
	},
	"/assets/build-EZgSDDnz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-7OzUiVGpk8E8yWolJHV8zEVM8hY\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 155,
		"path": "../public/assets/build-EZgSDDnz.js"
	},
	"/assets/analytics-BbmeqdYH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-7X6IChkHHvr+7b2+9MBpRsvUEIY\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 156,
		"path": "../public/assets/analytics-BbmeqdYH.js"
	},
	"/assets/career-roadmap-Dkkmx-44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-EdUCwgVRF0WrIkOY3Zclfa9O/lc\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-Dkkmx-44.js"
	},
	"/assets/career-Dkkmx-44.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-EdUCwgVRF0WrIkOY3Zclfa9O/lc\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 153,
		"path": "../public/assets/career-Dkkmx-44.js"
	},
	"/assets/challenge-Caq4Ziwt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-ndC1tN32pZNYq8Lvm1pUihLnZ/A\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 574,
		"path": "../public/assets/challenge-Caq4Ziwt.js"
	},
	"/assets/challenges-BQ2iUOAY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-/SdYMWpwn9D6FcvhZylhoZZNr4s\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 622,
		"path": "../public/assets/challenges-BQ2iUOAY.js"
	},
	"/assets/challenge-CLYIcA3o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-9k7VgMoh4GyLL5GotboSn4MDPvs\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 293,
		"path": "../public/assets/challenge-CLYIcA3o.js"
	},
	"/assets/coding-lab-B5BeiFGd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-r7Vgt4Z+Lne97h9fABAd6P9fRQ8\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 252,
		"path": "../public/assets/coding-lab-B5BeiFGd.js"
	},
	"/assets/coding-lab-DxnbvHdS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-TovGsuTTPkSQNikXeSTNKkSAz/w\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 538,
		"path": "../public/assets/coding-lab-DxnbvHdS.js"
	},
	"/assets/challenges-UqMO0Ekp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-WzmpNslialVJNcX791aHXoEXDUE\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 326,
		"path": "../public/assets/challenges-UqMO0Ekp.js"
	},
	"/assets/curriculum-DBOjKngY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-FKxhCAtkGXlSRqgOvnOHm30wP8o\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 150,
		"path": "../public/assets/curriculum-DBOjKngY.js"
	},
	"/assets/curriculum-map-DBOjKngY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-FKxhCAtkGXlSRqgOvnOHm30wP8o\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-DBOjKngY.js"
	},
	"/assets/index-DMbOWCUz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc73-R84HDRI2Npd/LmmXAbXgET9dMWw\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 310387,
		"path": "../public/assets/index-DMbOWCUz.js"
	},
	"/assets/dashboard-xa6FFROH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-8HoAY5SwxLITJX2pSg63ZQ/fSus\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 156,
		"path": "../public/assets/dashboard-xa6FFROH.js"
	},
	"/assets/learning-mode-CVZ4I_ls.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-X+03rWoKG84BuRYU86UxzAsHKuQ\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 631,
		"path": "../public/assets/learning-mode-CVZ4I_ls.js"
	},
	"/assets/learning-mode-BhuJGdpv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-fiZe5IF1C28tBSb5PZuhiszsW0s\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 328,
		"path": "../public/assets/learning-mode-BhuJGdpv.js"
	},
	"/assets/link-DPT17Rzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a71-EFLLr2tSiGxPMwmuj/7YlZtJNLo\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 35441,
		"path": "../public/assets/link-DPT17Rzw.js"
	},
	"/assets/onboarding-C5WM24Tw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-TRni7dDrTv0BGSWH0vrLfE6DEA0\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 77,
		"path": "../public/assets/onboarding-C5WM24Tw.js"
	},
	"/assets/portfolio-BCpeAiCo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-kxTJxungvMuhXDrItvqOAUqh3to\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 154,
		"path": "../public/assets/portfolio-BCpeAiCo.js"
	},
	"/assets/preload-helper-psnANCaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-NSLNnCSS3sScAI2h2HNs46WH5z0\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-psnANCaL.js"
	},
	"/assets/CodepathApp-C4yZiTqX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2bef-69ssfdsq7onJyYFaxykwy87TWpM\"",
		"mtime": "2026-09-05T15:21:24.997Z",
		"size": 666607,
		"path": "../public/assets/CodepathApp-C4yZiTqX.js"
	},
	"/assets/profile-BCpeAiCo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-kxTJxungvMuhXDrItvqOAUqh3to\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 154,
		"path": "../public/assets/profile-BCpeAiCo.js"
	},
	"/assets/projects-EZgSDDnz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-7OzUiVGpk8E8yWolJHV8zEVM8hY\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 155,
		"path": "../public/assets/projects-EZgSDDnz.js"
	},
	"/assets/recovery-CHrcHAMy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-cUZ26OyOmPRAc4+186epaRV0wIM\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 155,
		"path": "../public/assets/recovery-CHrcHAMy.js"
	},
	"/assets/routes-xa6FFROH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-8HoAY5SwxLITJX2pSg63ZQ/fSus\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 156,
		"path": "../public/assets/routes-xa6FFROH.js"
	},
	"/assets/skills-BbmeqdYH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-7X6IChkHHvr+7b2+9MBpRsvUEIY\"",
		"mtime": "2026-09-05T15:21:24.998Z",
		"size": 156,
		"path": "../public/assets/skills-BbmeqdYH.js"
	},
	"/assets/styles-alVGbpai.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1b9de-uKbHCMv4jXEblYHowZpcKF+keck\"",
		"mtime": "2026-09-05T15:21:24.999Z",
		"size": 113118,
		"path": "../public/assets/styles-alVGbpai.css"
	},
	"/assets/verify._certificateId-B05ccXDC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-qDCGD9c9pkEZ9VviL63Fvn3ljLs\"",
		"mtime": "2026-09-05T15:21:24.999Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-B05ccXDC.js"
	},
	"/assets/tutor-DGC0LnG6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-2klpaFe1P8i2c7EC9XRcGvv2Rrg\"",
		"mtime": "2026-09-05T15:21:24.999Z",
		"size": 152,
		"path": "../public/assets/tutor-DGC0LnG6.js"
	},
	"/assets/verify._certificateId-CHvq1fp7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-KduGJ0HDlOl8NuFHPBsoe51VVRs\"",
		"mtime": "2026-09-05T15:21:24.999Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-CHvq1fp7.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-05T15:21:24.999Z",
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
