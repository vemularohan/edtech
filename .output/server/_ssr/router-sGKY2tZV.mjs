import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$18 } from "./challenge-BPq90nfM.mjs";
import { t as Route$19 } from "./challenges-Ba6ZYEFs.mjs";
import { t as Route$20 } from "./coding-lab-CfXI260q.mjs";
import { t as Route$21 } from "./learning-mode-_dXCL68G.mjs";
import { t as Route$22 } from "./verify._certificateId-Bvxrzotg.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-sGKY2tZV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BKzTAk5Z.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AI Skills Track · Verified AI learning" },
			{
				name: "description",
				content: "An adaptive, project-driven learning operating system for engineering students."
			},
			{
				name: "author",
				content: "AI Skills Track"
			},
			{
				property: "og:title",
				content: "AI Skills Track · Verified AI learning"
			},
			{
				property: "og:description",
				content: "Learn practical AI skills, build verified projects, and demonstrate your capabilities to recruiters."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@codepath"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$16 = () => import("./routes-Cv1J1Vzm.mjs");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./admin-D2iQinfM.mjs");
var Route$15 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./analytics-VYYLB_Z2.mjs");
var Route$14 = createFileRoute("/analytics")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./auth-BkzdNR32.mjs");
var Route$13 = createFileRoute("/auth")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./build-DjYKctVV.mjs");
var Route$12 = createFileRoute("/build")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./career-CgL-PCbJ.mjs");
var Route$11 = createFileRoute("/career")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./career-roadmap-SnCQ4oKI.mjs");
var Route$10 = createFileRoute("/career-roadmap")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./curriculum-wk1Q1LLH.mjs");
var Route$9 = createFileRoute("/curriculum")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./curriculum-map-D8sdQM_K.mjs");
var Route$8 = createFileRoute("/curriculum-map")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./dashboard-BIW17Ljz.mjs");
var Route$7 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./onboarding-sQnyQv0Z.mjs");
var Route$6 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./portfolio-B-noV5SM.mjs");
var Route$5 = createFileRoute("/portfolio")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./profile-DLLsQ1OQ.mjs");
var Route$4 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./projects-d3o4Lq62.mjs");
var Route$3 = createFileRoute("/projects")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./recovery-CMF0vOfJ.mjs");
var Route$2 = createFileRoute("/recovery")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./skills-DCBnD8GN.mjs");
var Route$1 = createFileRoute("/skills")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./tutor-D9btIYEb.mjs");
var Route = createFileRoute("/tutor")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$16.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$17
	}),
	AdminRoute: Route$15.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$17
	}),
	AnalyticsRoute: Route$14.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => Route$17
	}),
	AuthRoute: Route$13.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$17
	}),
	BuildRoute: Route$12.update({
		id: "/build",
		path: "/build",
		getParentRoute: () => Route$17
	}),
	CareerRoute: Route$11.update({
		id: "/career",
		path: "/career",
		getParentRoute: () => Route$17
	}),
	CareerRoadmapRoute: Route$10.update({
		id: "/career-roadmap",
		path: "/career-roadmap",
		getParentRoute: () => Route$17
	}),
	ChallengeRoute: Route$18.update({
		id: "/challenge",
		path: "/challenge",
		getParentRoute: () => Route$17
	}),
	ChallengesRoute: Route$19.update({
		id: "/challenges",
		path: "/challenges",
		getParentRoute: () => Route$17
	}),
	CodingLabRoute: Route$20.update({
		id: "/coding-lab",
		path: "/coding-lab",
		getParentRoute: () => Route$17
	}),
	CurriculumRoute: Route$9.update({
		id: "/curriculum",
		path: "/curriculum",
		getParentRoute: () => Route$17
	}),
	CurriculumMapRoute: Route$8.update({
		id: "/curriculum-map",
		path: "/curriculum-map",
		getParentRoute: () => Route$17
	}),
	DashboardRoute: Route$7.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$17
	}),
	LearningModeRoute: Route$21.update({
		id: "/learning-mode",
		path: "/learning-mode",
		getParentRoute: () => Route$17
	}),
	OnboardingRoute: Route$6.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => Route$17
	}),
	PortfolioRoute: Route$5.update({
		id: "/portfolio",
		path: "/portfolio",
		getParentRoute: () => Route$17
	}),
	ProfileRoute: Route$4.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$17
	}),
	ProjectsRoute: Route$3.update({
		id: "/projects",
		path: "/projects",
		getParentRoute: () => Route$17
	}),
	RecoveryRoute: Route$2.update({
		id: "/recovery",
		path: "/recovery",
		getParentRoute: () => Route$17
	}),
	SkillsRoute: Route$1.update({
		id: "/skills",
		path: "/skills",
		getParentRoute: () => Route$17
	}),
	TutorRoute: Route.update({
		id: "/tutor",
		path: "/tutor",
		getParentRoute: () => Route$17
	}),
	VerifyCertificateIdRoute: Route$22.update({
		id: "/verify/$certificateId",
		path: "/verify/$certificateId",
		getParentRoute: () => Route$17
	})
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
