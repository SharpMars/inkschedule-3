import { ErrorBoundary, Suspense, createEffect, createResource, createSignal, on } from "solid-js";
import { Navbar, Tab } from "./Navbar";
import { getCurrentSchedule } from "./schedule";
import { EntryList } from "./entries/EntryList";
import { makeTimer } from "@solid-primitives/timer";

function App() {
  const [getTab, setTab] = createSignal<Tab>(
    parseInt(localStorage.getItem("default_tab") ?? "0") == 0 ? "Regular" : "Salmon"
  );

  const [getSchedule, { refetch }] = createResource(getCurrentSchedule);

  makeTimer(
    () => {
      const schedule = getSchedule();

      if (schedule == undefined) {
        return;
      }

      const expireTime = new Date(Date.parse(schedule.expires));
      //i think im refetching too soon
      expireTime.setSeconds(2);
      if (expireTime <= new Date(Date.now())) {
        refetch();
      }
    },
    3000,
    setInterval
  );

  createEffect(
    on(getSchedule, (schedule) => {
      if (getTab() == "Challenges" && schedule?.data.eventSchedules.nodes.length == 0) {
        setTab("Regular");
      }

      if (getTab() == "Fest" && schedule?.data.festSchedules.nodes.length == 0) {
        setTab("Regular");
      }

      if (
        ["Regular", "Anarchy", "X"].some((element) => element == getTab()) &&
        Date.parse(schedule?.data.currentFest?.startTime) < Date.now() &&
        Date.parse(schedule?.data.currentFest?.endTime) > Date.now()
      ) {
        setTab("Fest");
      }
    })
  );

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
      <Navbar setTab={setTab} getSchedule={getSchedule} />
      <Suspense fallback={<p class="text-center font-bold h-[calc(100vh-46px)]">Loading...</p>}>
        <EntryList getTab={getTab} getSchedule={getSchedule} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
