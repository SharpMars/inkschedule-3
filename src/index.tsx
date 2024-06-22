/* @refresh reload */
import { render } from "solid-js/web";

import "virtual:uno.css";
import "./styles.css";
import App from "./App";
import { emit, listen } from "@tauri-apps/api/event";

listen("reset", () => {
  localStorage.clear();
  location.reload();
});

const defaultTabItem = localStorage.getItem("default_tab");
const defaultTab = defaultTabItem ? parseInt(defaultTabItem) : 0;

localStorage.setItem("default_tab", defaultTab.toString());

emit("send_tab", defaultTab);

listen("set_tab", (event) => {
  localStorage.setItem("default_tab", (event.payload as number).toString());
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
render(() => <App />, document.getElementById("root") as HTMLElement);
