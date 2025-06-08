import { Suspense, createEffect, createResource, createSignal, on } from "solid-js";
import { Navbar, Tab } from "./Navbar";
import { getCurrentSchedule } from "./schedule";
import { EntryList } from "./entries/EntryList";
import { makeTimer } from "@solid-primitives/timer";
import { Loading } from "./Loading";

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
    <Suspense fallback={<Loading></Loading>}>
      <Navbar getTab={getTab} setTab={setTab} getSchedule={getSchedule} />
      <EntryList getTab={getTab} getSchedule={getSchedule} />
    </Suspense>
  );
}

export default App;
