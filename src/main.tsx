import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
  HistoryLocation,
  createHashHistory,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { GlobalProvider } from "./context/GlobalProvider";
import "./style.css";

import App from "./App";
import Navbar from "component/Navbar/Navbar"
import { routerElements } from "routes";
import BackgroundImageWrapper from "component/BackgroundImageWrapper";

// 1. Define Routes

// Root Route (Layout) - Includes Providers & Wrappers
const rootRoute = createRootRoute({
  component: () => (
    <GlobalProvider>
      <Navbar />
      <BackgroundImageWrapper>
        <App />
      </BackgroundImageWrapper>
    </GlobalProvider>
  ),
});

const indexRouters = routerElements.map(({ element: Element, path }) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: path,
    component: () => <Element />,
  })
);

const routeTree = rootRoute.addChildren(indexRouters);

const hashHistory = createHashHistory();

const router = createRouter({ routeTree, history: hashHistory});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element with ID 'app' not found.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
      <RouterProvider router={router} />
  
  </StrictMode>
);
