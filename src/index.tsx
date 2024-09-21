/* @refresh reload */
import { ErrorBoundary, render } from "solid-js/web";

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
render(() => <WrappedApp />, document.getElementById("root") as HTMLElement);

function WrappedApp() {
  return (
    <ErrorBoundary
      fallback={(err) => (
        <div class="flex flex-col items-center overflow-y-auto overflow-x-hidden h-600px">
          <h2>Error has occured</h2>
          <p class="p-2 bg-dark-1 rounded m-l-2 m-r-2 font-mono text-sm">{err.toString()}</p>
          <button
            class="p-3 font-bold text-size-4 color-white bg-neutral-500 b-0 rounded hover:filter-brightness-90% active:filter-brightness-70% transition-filter"
            onClick={() => location.reload()}
          >
            Refresh
          </button>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  );
}
