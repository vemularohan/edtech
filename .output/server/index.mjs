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
		"mtime": "2026-09-06T16:14:07.576Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-06T16:14:07.576Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-8MuLyea1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-ybn+8OTfL31PjnBx5DeRbQnLr/g\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 77,
		"path": "../public/assets/admin-8MuLyea1.js"
	},
	"/assets/auth-CDKy_Twx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Xd5lJ2oPSQ7G0/flV0wDztXN4is\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 77,
		"path": "../public/assets/auth-CDKy_Twx.js"
	},
	"/assets/build-ouxxO7mK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-EhFsvfQO8OoRg/cck82u4xT1lks\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 155,
		"path": "../public/assets/build-ouxxO7mK.js"
	},
	"/assets/career-CuSvsIQq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-pv2Jt/uHlcGSTaXjlf4ssbTN3EI\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 153,
		"path": "../public/assets/career-CuSvsIQq.js"
	},
	"/assets/analytics-8YrtihWE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-S10Hra2Y93vxTnFbfPm3OT3ypS8\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 156,
		"path": "../public/assets/analytics-8YrtihWE.js"
	},
	"/assets/challenge-D9dM-9VN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-60HqZ9fklSS21yV4WY0224u8rxY\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 293,
		"path": "../public/assets/challenge-D9dM-9VN.js"
	},
	"/assets/challenge-CyEI5Px9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-lxH9a7W+SGw9C9sLehzc86ZA5YM\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 574,
		"path": "../public/assets/challenge-CyEI5Px9.js"
	},
	"/assets/career-roadmap-CuSvsIQq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-pv2Jt/uHlcGSTaXjlf4ssbTN3EI\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-CuSvsIQq.js"
	},
	"/assets/CodepathApp-CGkCf8n5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"438cd-Z67CAM4B7FqKjlzdrcd6FzvbNBA\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 276685,
		"path": "../public/assets/CodepathApp-CGkCf8n5.js"
	},
	"/assets/challenges-BHgCdQCr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-Tb9w3F0kO366d/rzCqIaV2OQb94\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 622,
		"path": "../public/assets/challenges-BHgCdQCr.js"
	},
	"/assets/challenges-AEylqDsr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-C+aEtJvrIN6O7GTxOSS0o2nww8g\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 327,
		"path": "../public/assets/challenges-AEylqDsr.js"
	},
	"/assets/coding-lab-LLq-I9xD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-b0yupNAmvhcs6JmU3X3rGbeplBY\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 538,
		"path": "../public/assets/coding-lab-LLq-I9xD.js"
	},
	"/assets/curriculum-D3qwFJez.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-0H74FSIBvVOiSyOZMTrgMbHc9mc\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 150,
		"path": "../public/assets/curriculum-D3qwFJez.js"
	},
	"/assets/coding-lab-DBZeLebi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-6RsKYde6uXKgpZ8Q5CMF1YE0WYI\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 252,
		"path": "../public/assets/coding-lab-DBZeLebi.js"
	},
	"/assets/dashboard-VIkP_JFM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-dSObbQBndy2Y+LA9O9Oqa8Y4kDI\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 156,
		"path": "../public/assets/dashboard-VIkP_JFM.js"
	},
	"/assets/curriculum-map-D3qwFJez.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-0H74FSIBvVOiSyOZMTrgMbHc9mc\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-D3qwFJez.js"
	},
	"/assets/learning-mode-BDIc41vV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-zP/JPEOye/8kp1sZkvsCFEBcf6s\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 328,
		"path": "../public/assets/learning-mode-BDIc41vV.js"
	},
	"/assets/learning-mode-DfeFXpMR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-ojkOMlVKVnAbd5GfrySg2vrsP9o\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 631,
		"path": "../public/assets/learning-mode-DfeFXpMR.js"
	},
	"/assets/onboarding-QfpdNPh3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-ABdvXz79/z/lfKCbLrKEtctRtF8\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 77,
		"path": "../public/assets/onboarding-QfpdNPh3.js"
	},
	"/assets/link-DIt654cv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89ee-g1xPSHpPKZJtIJEka9p237x55iU\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 35310,
		"path": "../public/assets/link-DIt654cv.js"
	},
	"/assets/portfolio-BX9C2dx7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-BUX0ziHOI2gx2ohQCE5IL2S2vgo\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 154,
		"path": "../public/assets/portfolio-BX9C2dx7.js"
	},
	"/assets/index-IH1mhFWX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc7b-piVj4LIIWI9ptVWkiGAMIf1DyuI\"",
		"mtime": "2026-09-06T16:14:07.440Z",
		"size": 310395,
		"path": "../public/assets/index-IH1mhFWX.js"
	},
	"/assets/preload-helper-Ucm0VEts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-AEfftRosRNarkU/QLujUN9Mvgew\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-Ucm0VEts.js"
	},
	"/assets/profile-BX9C2dx7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-BUX0ziHOI2gx2ohQCE5IL2S2vgo\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 154,
		"path": "../public/assets/profile-BX9C2dx7.js"
	},
	"/assets/projects-ouxxO7mK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-EhFsvfQO8OoRg/cck82u4xT1lks\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 155,
		"path": "../public/assets/projects-ouxxO7mK.js"
	},
	"/assets/routes-VIkP_JFM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-dSObbQBndy2Y+LA9O9Oqa8Y4kDI\"",
		"mtime": "2026-09-06T16:14:07.442Z",
		"size": 156,
		"path": "../public/assets/routes-VIkP_JFM.js"
	},
	"/assets/skills-8YrtihWE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-S10Hra2Y93vxTnFbfPm3OT3ypS8\"",
		"mtime": "2026-09-06T16:14:07.442Z",
		"size": 156,
		"path": "../public/assets/skills-8YrtihWE.js"
	},
	"/assets/tutor-hDedyoes.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-e7KE/12Zxp56clIFIakzGe6ULDI\"",
		"mtime": "2026-09-06T16:14:07.442Z",
		"size": 152,
		"path": "../public/assets/tutor-hDedyoes.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-06T16:14:07.442Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/verify._certificateId-BpcQGXaP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-Lh7pcV/n/IOe+GO/PPCthascZjk\"",
		"mtime": "2026-09-06T16:14:07.442Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-BpcQGXaP.js"
	},
	"/assets/styles-FxGriU97.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2159d-6ixp9Psb1uqxGBsVbYdUTPoQOpM\"",
		"mtime": "2026-09-06T16:14:07.442Z",
		"size": 136605,
		"path": "../public/assets/styles-FxGriU97.css"
	},
	"/assets/verify._certificateId-CF61HQTy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-lAtRRuC8A3tsphhVAJOw6u/Grrg\"",
		"mtime": "2026-09-06T16:14:07.442Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-CF61HQTy.js"
	},
	"/assets/recovery--SMtjpCo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-oJR7bcJNDEzP0ZXKJIx5dcOLF8s\"",
		"mtime": "2026-09-06T16:14:07.441Z",
		"size": 155,
		"path": "../public/assets/recovery--SMtjpCo.js"
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
