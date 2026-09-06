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
		"mtime": "2026-09-06T14:04:44.308Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/admin-D8zUD88c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-m2kUuds4EWXkL93NoGAJkm8qkDY\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 77,
		"path": "../public/assets/admin-D8zUD88c.js"
	},
	"/assets/analytics-BzSvLxHl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-YnW0WjtVWfUe1h+Q9x/6sdRsGv0\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 156,
		"path": "../public/assets/analytics-BzSvLxHl.js"
	},
	"/assets/auth-Cbek2SBr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-lC7jb83pfMm0R+EkST9FQeQyxs4\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 77,
		"path": "../public/assets/auth-Cbek2SBr.js"
	},
	"/assets/career-D1XQdOu7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-9k1F471kujMxVuZ2Ig4JiD+gf1w\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 153,
		"path": "../public/assets/career-D1XQdOu7.js"
	},
	"/assets/career-roadmap-D1XQdOu7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-9k1F471kujMxVuZ2Ig4JiD+gf1w\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-D1XQdOu7.js"
	},
	"/assets/build-4PF0LRb_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-DuMEnXVDExFoL2eeIPz+ZowZ7i8\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 155,
		"path": "../public/assets/build-4PF0LRb_.js"
	},
	"/assets/challenge-Ch4ZWkdY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-kMNFexNlk3IHkm/k/jOH/c2tMTM\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 574,
		"path": "../public/assets/challenge-Ch4ZWkdY.js"
	},
	"/assets/challenges-DdW-gyLd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-XDPSTCja6gvjCU6p/+HjfabjAg4\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 327,
		"path": "../public/assets/challenges-DdW-gyLd.js"
	},
	"/assets/challenges-DSGBmV3J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-H5fsiLKrMq9iXfjOkbdcNMosb9w\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 622,
		"path": "../public/assets/challenges-DSGBmV3J.js"
	},
	"/assets/challenge-CR8a-pR2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-hvn59Q1Lq8SwT3dJzI6CV//tXPs\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 293,
		"path": "../public/assets/challenge-CR8a-pR2.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-06T14:04:44.308Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/curriculum-map-pwkhfEhi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-nGuJapg0qIHtL7nM4ixZlZNezQw\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-pwkhfEhi.js"
	},
	"/assets/dashboard-DKnzIv7E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-rXo4dQ5hy/lFIdaz4RYU3NxPf54\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 156,
		"path": "../public/assets/dashboard-DKnzIv7E.js"
	},
	"/assets/coding-lab-CpFweH8O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-ikIqwi0GjoDxWYhIc8vqw/Cox4s\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 538,
		"path": "../public/assets/coding-lab-CpFweH8O.js"
	},
	"/assets/coding-lab-Bz0MiUwe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-ypH5heQnhH6+i72BY5zmaOVJcZc\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 252,
		"path": "../public/assets/coding-lab-Bz0MiUwe.js"
	},
	"/assets/curriculum-pwkhfEhi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-nGuJapg0qIHtL7nM4ixZlZNezQw\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 150,
		"path": "../public/assets/curriculum-pwkhfEhi.js"
	},
	"/assets/learning-mode-C66DUBce.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-2O+svJ1/pEDkYGkSLF+xUeI3HDo\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 328,
		"path": "../public/assets/learning-mode-C66DUBce.js"
	},
	"/assets/onboarding-DFOY-QGh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-9DbLw0uB4N7qieN1W5JX7bzHRLg\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 77,
		"path": "../public/assets/onboarding-DFOY-QGh.js"
	},
	"/assets/learning-mode-LpzOLJeH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-gMJ5i/Wfg2AjU8FWwaws2ojeZxE\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 631,
		"path": "../public/assets/learning-mode-LpzOLJeH.js"
	},
	"/assets/preload-helper-psnANCaL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-NSLNnCSS3sScAI2h2HNs46WH5z0\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-psnANCaL.js"
	},
	"/assets/portfolio-aaQneuUr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-cO2m+pIIT07LhKlXPStodp067n0\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 154,
		"path": "../public/assets/portfolio-aaQneuUr.js"
	},
	"/assets/link-DPT17Rzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a71-EFLLr2tSiGxPMwmuj/7YlZtJNLo\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 35441,
		"path": "../public/assets/link-DPT17Rzw.js"
	},
	"/assets/index-D6lylJk2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc73-6PCz82A/4T1Iwsj4uQXnUJCXUGI\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 310387,
		"path": "../public/assets/index-D6lylJk2.js"
	},
	"/assets/CodepathApp-C1YOfslP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7235-XUGBshEk+EI02KxOyJYyjEHNkTQ\"",
		"mtime": "2026-09-06T14:04:44.182Z",
		"size": 684597,
		"path": "../public/assets/CodepathApp-C1YOfslP.js"
	},
	"/assets/profile-aaQneuUr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-cO2m+pIIT07LhKlXPStodp067n0\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 154,
		"path": "../public/assets/profile-aaQneuUr.js"
	},
	"/assets/projects-4PF0LRb_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-DuMEnXVDExFoL2eeIPz+ZowZ7i8\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 155,
		"path": "../public/assets/projects-4PF0LRb_.js"
	},
	"/assets/routes-DKnzIv7E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-rXo4dQ5hy/lFIdaz4RYU3NxPf54\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 156,
		"path": "../public/assets/routes-DKnzIv7E.js"
	},
	"/assets/skills-BzSvLxHl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-YnW0WjtVWfUe1h+Q9x/6sdRsGv0\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 156,
		"path": "../public/assets/skills-BzSvLxHl.js"
	},
	"/assets/recovery-C5vNu4Pw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-u88MZqkRGPu06gpI9YtPzLVpf/Y\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 155,
		"path": "../public/assets/recovery-C5vNu4Pw.js"
	},
	"/assets/tutor-DRfNXJnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-B3h1RukRu0gZAs3vRuR6CtNn8AA\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 152,
		"path": "../public/assets/tutor-DRfNXJnZ.js"
	},
	"/assets/styles-DCR3W-PB.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"21aa8-KPqQF089rghBPH9d4TedF513bRs\"",
		"mtime": "2026-09-06T14:04:44.184Z",
		"size": 137896,
		"path": "../public/assets/styles-DCR3W-PB.css"
	},
	"/assets/verify._certificateId-CJGbUjoN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-yAF2czYlNQ0zLX/Fh3Io4d9hx+A\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-CJGbUjoN.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/verify._certificateId-CauE6TSJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-eRWHbxZf5l0fN5QsrFyIzIeJupA\"",
		"mtime": "2026-09-06T14:04:44.183Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-CauE6TSJ.js"
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
