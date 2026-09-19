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
		"mtime": "2026-09-19T14:27:13.365Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-19T14:27:13.365Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-HcOd80kA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-J4l2jzjzidKanQiY3JwhxXu0OYo\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 77,
		"path": "../public/assets/admin-HcOd80kA.js"
	},
	"/assets/analytics-DiyU-xM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-/PnAK+RLr/Q7dh5aPavMi3chqLM\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 156,
		"path": "../public/assets/analytics-DiyU-xM6.js"
	},
	"/assets/auth-DAX_Hrhl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-qAlYEit/9W6uDRQ06aaj4qcP1/M\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 77,
		"path": "../public/assets/auth-DAX_Hrhl.js"
	},
	"/assets/career-0jQM-5YL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-3MXriKq5NOrlZQBGjSyxAPVlgps\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 153,
		"path": "../public/assets/career-0jQM-5YL.js"
	},
	"/assets/career-roadmap-0jQM-5YL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-3MXriKq5NOrlZQBGjSyxAPVlgps\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-0jQM-5YL.js"
	},
	"/assets/challenge-Hd2i_twy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-JCdzEs3FvIunh6pIvTmDasi26z8\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 574,
		"path": "../public/assets/challenge-Hd2i_twy.js"
	},
	"/assets/build-DllM8uvp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-/S66FRGAFM7ub6QoXS9B5i5UiVQ\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 155,
		"path": "../public/assets/build-DllM8uvp.js"
	},
	"/assets/challenges-BidRpTVn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-1kZ5G7YaOV60/0ZhSXKW/Y1Umrg\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 622,
		"path": "../public/assets/challenges-BidRpTVn.js"
	},
	"/assets/challenge-B7ZINYGW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-YB5hpUJaRWw3LGhR/DWe+U/oTws\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 293,
		"path": "../public/assets/challenge-B7ZINYGW.js"
	},
	"/assets/coding-lab-BASic0va.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-gjXIy+tKsTboe49sV/OK0zKabVE\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 538,
		"path": "../public/assets/coding-lab-BASic0va.js"
	},
	"/assets/curriculum-CGzMlr48.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-AqmVyTu0IMBgso1ek1XLa2ogRx0\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 150,
		"path": "../public/assets/curriculum-CGzMlr48.js"
	},
	"/assets/coding-lab-Dp8TJ28K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-Y9Nsqd40+w94Ya5NRvn2d7s7CyQ\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 252,
		"path": "../public/assets/coding-lab-Dp8TJ28K.js"
	},
	"/assets/curriculum-map-CGzMlr48.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-AqmVyTu0IMBgso1ek1XLa2ogRx0\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-CGzMlr48.js"
	},
	"/assets/learning-mode-BJ33peDk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4-1V+UziuXvgxkKDPN1PRNkO4/GQw\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 756,
		"path": "../public/assets/learning-mode-BJ33peDk.js"
	},
	"/assets/dashboard-mbLqA0Q9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-LwTCZSKHd8hulD/9mmv09gNUJ0w\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 156,
		"path": "../public/assets/dashboard-mbLqA0Q9.js"
	},
	"/assets/challenges-Df9domQK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-GfK8UhVXv1y/lySMomDnbD73x4I\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 327,
		"path": "../public/assets/challenges-Df9domQK.js"
	},
	"/assets/learning-mode-ifrzDYjn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-rzasiEz2/LnTNdWeBSWUYrNZuvA\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 328,
		"path": "../public/assets/learning-mode-ifrzDYjn.js"
	},
	"/assets/preload-helper-psnANCaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-NSLNnCSS3sScAI2h2HNs46WH5z0\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-psnANCaL.js"
	},
	"/assets/index-DI25BGrm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc73-nJdFaTRcCoTcXeX2Oo4MFMwLg4s\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 310387,
		"path": "../public/assets/index-DI25BGrm.js"
	},
	"/assets/onboarding-Cnje4sK4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-yq6zLt7COWr2v9pPlK1VgMY+Fnw\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 77,
		"path": "../public/assets/onboarding-Cnje4sK4.js"
	},
	"/assets/link-DPT17Rzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a71-EFLLr2tSiGxPMwmuj/7YlZtJNLo\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 35441,
		"path": "../public/assets/link-DPT17Rzw.js"
	},
	"/assets/portfolio-Da_qQnqa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-2uFnTvvlA6oRBeCpjVjDFTBaSTk\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 154,
		"path": "../public/assets/portfolio-Da_qQnqa.js"
	},
	"/assets/CodepathApp-D0XYqaoy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc4e6-38RsPRJIworIFmq71vdr/wWdoTw\"",
		"mtime": "2026-09-19T14:27:13.177Z",
		"size": 771302,
		"path": "../public/assets/CodepathApp-D0XYqaoy.js"
	},
	"/assets/profile-Da_qQnqa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-2uFnTvvlA6oRBeCpjVjDFTBaSTk\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 154,
		"path": "../public/assets/profile-Da_qQnqa.js"
	},
	"/assets/projects-DllM8uvp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-/S66FRGAFM7ub6QoXS9B5i5UiVQ\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 155,
		"path": "../public/assets/projects-DllM8uvp.js"
	},
	"/assets/recovery-BX4ZQHjw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-4caWXmW/oQ79AvJ7/HXu6j64N6Y\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 155,
		"path": "../public/assets/recovery-BX4ZQHjw.js"
	},
	"/assets/routes-mbLqA0Q9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-LwTCZSKHd8hulD/9mmv09gNUJ0w\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 156,
		"path": "../public/assets/routes-mbLqA0Q9.js"
	},
	"/assets/styles-B0HqNIDK.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"26c00-RNZImVXZuf7s20q/KGOEanS9gCE\"",
		"mtime": "2026-09-19T14:27:13.179Z",
		"size": 158720,
		"path": "../public/assets/styles-B0HqNIDK.css"
	},
	"/assets/tutor-C7oqa58e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-ds0sgo7Ud+pT26m1QlWFevLm6m0\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 152,
		"path": "../public/assets/tutor-C7oqa58e.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/skills-DiyU-xM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-/PnAK+RLr/Q7dh5aPavMi3chqLM\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 156,
		"path": "../public/assets/skills-DiyU-xM6.js"
	},
	"/assets/verify._certificateId-Dqx4xLC6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-eQOkU8NROBL2kLiOalyfQknjZmI\"",
		"mtime": "2026-09-19T14:27:13.178Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-Dqx4xLC6.js"
	},
	"/assets/verify._certificateId-DsvyxxPa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-CVLVpS+7eiSEIk0TR5pMHmiINsg\"",
		"mtime": "2026-09-19T14:27:13.179Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-DsvyxxPa.js"
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
