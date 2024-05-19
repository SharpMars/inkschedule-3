/* @refresh reload */
import { render } from "solid-js/web";

import "virtual:uno.css";
import "./styles.css";
import App from "./App";
import { listen } from "@tauri-apps/api/event";

listen("reset", () => {
  localStorage.clear();
  location.reload();
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
render(() => <App />, document.getElementById("root") as HTMLElement);
