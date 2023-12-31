import { ErrorBoundary, Suspense, createResource, createSignal } from "solid-js";
import { Navbar, Tab } from "./Navbar";
import { getCurrentSchedule } from "./schedule";
import { EntryList } from "./entries/EntryList";

function App() {
  const [getTab, setTab] = createSignal<Tab>("Regular");

  const [getSchedule, { refetch }] = createResource(getCurrentSchedule);

  setInterval(() => {
    const schedule = getSchedule();

    if (schedule == undefined) {
      return;
    }

    let expireTime = new Date(Date.parse(schedule.expires));
    //i think im refetching too soon
    expireTime.setSeconds(2);
    if (expireTime <= new Date(Date.now())) {
      refetch();
    }
  }, 3000);

  return (
    <ErrorBoundary
      fallback={(err) => (
        <div class="flex flex-col items-center overflow-y-auto overflow-x-hidden h-600px">
          <h2>Error has occured</h2>
          <p class="p-2 bg-dark-1 rounded m-l-2 m-r-2 font-mono text-sm">{err.toString()}</p>
          <button
            class="p-3 font-bold text-size-4 color-white bg-neutral-500 b-0 rounded hover:filter-brightness-90% active:filter-brightness-70% transition-filter"
            onclick={() => location.reload()}
          >
            Refresh
          </button>
        </div>
      )}
    >
      <Navbar setTab={setTab}></Navbar>
      <Suspense fallback={<p class="text-center font-bold">Loading...</p>}>
        <EntryList getTab={getTab} getSchedule={getSchedule}></EntryList>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
