import React from "react";
import Routes from "./src/routes";
import("intl").then(() => import("intl/locale-data/jsonp/pt-BR"));

export default function App() {
  return <Routes />;
}
