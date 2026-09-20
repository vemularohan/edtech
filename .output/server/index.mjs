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
		"mtime": "2026-09-20T18:04:22.714Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-20T18:04:22.714Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/auth-DrcCUFVx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-XjANBxEB7+EkDX3X0RC7pCq0dSU\"",
		"mtime": "2026-09-20T18:04:22.574Z",
		"size": 77,
		"path": "../public/assets/auth-DrcCUFVx.js"
	},
	"/assets/analytics-BFtLPiRM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-+sldhtSMxr7Qyw0D3xYn4IHJwlI\"",
		"mtime": "2026-09-20T18:04:22.574Z",
		"size": 156,
		"path": "../public/assets/analytics-BFtLPiRM.js"
	},
	"/assets/build-8F8RqLCQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-zlyH5Uhdul844CoIg+XP629PcwI\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 155,
		"path": "../public/assets/build-8F8RqLCQ.js"
	},
	"/assets/admin-BfnwNbnY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-kd6+NRadbbZ63yLHVAI/VPxIsbA\"",
		"mtime": "2026-09-20T18:04:22.574Z",
		"size": 77,
		"path": "../public/assets/admin-BfnwNbnY.js"
	},
	"/assets/career-CF2fW1tH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-Gutf98syinRsZof3AAo9ifYHKOc\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 153,
		"path": "../public/assets/career-CF2fW1tH.js"
	},
	"/assets/career-roadmap-CF2fW1tH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-Gutf98syinRsZof3AAo9ifYHKOc\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 153,
		"path": "../public/assets/career-roadmap-CF2fW1tH.js"
	},
	"/assets/CodepathApp-tDm8ArdQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"625e0-JGcv4qevO2AYspOgE/3VF3mEMf4\"",
		"mtime": "2026-09-20T18:04:22.574Z",
		"size": 402912,
		"path": "../public/assets/CodepathApp-tDm8ArdQ.js"
	},
	"/assets/challenge-geQamL-z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-teRNcz7iEtiQL9Iwkzxv5nSCEME\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 293,
		"path": "../public/assets/challenge-geQamL-z.js"
	},
	"/assets/challenges-DpfSgl1v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-Tt42SCWVCt8DEer5T8LyFUMSdB0\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 327,
		"path": "../public/assets/challenges-DpfSgl1v.js"
	},
	"/assets/challenges-O35yusOB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-pcz0mfuISR7qfK/Rfy6+t9klJqs\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 622,
		"path": "../public/assets/challenges-O35yusOB.js"
	},
	"/assets/challenge-zLf417aU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-CmfpRdb9GO5MveRbvwtTpJj2tMk\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 574,
		"path": "../public/assets/challenge-zLf417aU.js"
	},
	"/assets/coding-lab-CDw35DER.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-9MjXzu4iv80VyUVZ7ExFAU461Qg\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 252,
		"path": "../public/assets/coding-lab-CDw35DER.js"
	},
	"/assets/dashboard-Cg0tcgZh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-C96fG1somGMAVWIm50MxV7RHa+A\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 156,
		"path": "../public/assets/dashboard-Cg0tcgZh.js"
	},
	"/assets/curriculum-CLgYl2nX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-yC6UhxO1eP9BPpQinhJ/Y+7Ls7o\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 150,
		"path": "../public/assets/curriculum-CLgYl2nX.js"
	},
	"/assets/learning-mode-D2wbAckH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-4/y1j85fGAv7WVi/PR6fFwmx0R4\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 328,
		"path": "../public/assets/learning-mode-D2wbAckH.js"
	},
	"/assets/coding-lab-CIn1WIar.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-LDMkCXnSyQTy4KLMJoriA3E/laM\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 538,
		"path": "../public/assets/coding-lab-CIn1WIar.js"
	},
	"/assets/curriculum-map-CLgYl2nX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96-yC6UhxO1eP9BPpQinhJ/Y+7Ls7o\"",
		"mtime": "2026-09-20T18:04:22.575Z",
		"size": 150,
		"path": "../public/assets/curriculum-map-CLgYl2nX.js"
	},
	"/assets/learning-mode-D9rUvrth.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32e-p266Xv+vo0UQqkgt+TC1yko4cO4\"",
		"mtime": "2026-09-20T18:04:22.578Z",
		"size": 814,
		"path": "../public/assets/learning-mode-D9rUvrth.js"
	},
	"/assets/portfolio-DjG5nDza.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-53Dnn7cSmN58VDZdfOcNPNO+WGA\"",
		"mtime": "2026-09-20T18:04:22.578Z",
		"size": 154,
		"path": "../public/assets/portfolio-DjG5nDza.js"
	},
	"/assets/link-DIt654cv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89ee-g1xPSHpPKZJtIJEka9p237x55iU\"",
		"mtime": "2026-09-20T18:04:22.578Z",
		"size": 35310,
		"path": "../public/assets/link-DIt654cv.js"
	},
	"/assets/index-ITzz7FRz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc7b-yQ+h2yYzXJolP4VBpbhue2qz3zc\"",
		"mtime": "2026-09-20T18:04:22.574Z",
		"size": 310395,
		"path": "../public/assets/index-ITzz7FRz.js"
	},
	"/assets/onboarding-DCDXxddZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-P78R5CwqeBTQ+qbTE2wqPjwyRmw\"",
		"mtime": "2026-09-20T18:04:22.578Z",
		"size": 77,
		"path": "../public/assets/onboarding-DCDXxddZ.js"
	},
	"/assets/preload-helper-Ucm0VEts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-AEfftRosRNarkU/QLujUN9Mvgew\"",
		"mtime": "2026-09-20T18:04:22.578Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-Ucm0VEts.js"
	},
	"/assets/profile-DjG5nDza.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-53Dnn7cSmN58VDZdfOcNPNO+WGA\"",
		"mtime": "2026-09-20T18:04:22.578Z",
		"size": 154,
		"path": "../public/assets/profile-DjG5nDza.js"
	},
	"/assets/projects-8F8RqLCQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-zlyH5Uhdul844CoIg+XP629PcwI\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 155,
		"path": "../public/assets/projects-8F8RqLCQ.js"
	},
	"/assets/recovery-DlykV8_i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-ocuZwxLJdeQYEz9Ke1d8jKlPCuY\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 155,
		"path": "../public/assets/recovery-DlykV8_i.js"
	},
	"/assets/routes-Cg0tcgZh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-C96fG1somGMAVWIm50MxV7RHa+A\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 156,
		"path": "../public/assets/routes-Cg0tcgZh.js"
	},
	"/assets/skills-BFtLPiRM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-+sldhtSMxr7Qyw0D3xYn4IHJwlI\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 156,
		"path": "../public/assets/skills-BFtLPiRM.js"
	},
	"/assets/styles-BW6aMcVN.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2587b-mBcwv7oBY9iTpcFxOaJKSEt/PWA\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 153723,
		"path": "../public/assets/styles-BW6aMcVN.css"
	},
	"/assets/tutor-COgC4Fea.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-Ud+QgPEFifU3mHokc3UVRKVuxYw\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 152,
		"path": "../public/assets/tutor-COgC4Fea.js"
	},
	"/assets/types-CdQ_w3Tu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcbd-NWnsr/m+Fn3jYaGcwXnymGx1b5c\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 56509,
		"path": "../public/assets/types-CdQ_w3Tu.js"
	},
	"/assets/verify._certificateId-Cf9fb_tl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-wF8woiq6L2clEUWqHfKwEFCG3UI\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 250,
		"path": "../public/assets/verify._certificateId-Cf9fb_tl.js"
	},
	"/assets/verify._certificateId-SQVPM6eU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-960BU0s45P9BofDWAskYiAySi70\"",
		"mtime": "2026-09-20T18:04:22.579Z",
		"size": 402,
		"path": "../public/assets/verify._certificateId-SQVPM6eU.js"
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
