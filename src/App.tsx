import * as React from "react";

import { useGlobalState } from "context/GlobalProvider";
import { Outlet } from "@tanstack/react-router";
export default function App() {
  const { color } = useGlobalState().THEMESELECTOR;
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--dynamic-match-bg-img-color",
      color
    );
  }, [color]);
  return (
    <div id="outletContainer" style={{ height: "100%", paddingTop: "9rem" }}>
      <Outlet />
    </div>
  );
}
