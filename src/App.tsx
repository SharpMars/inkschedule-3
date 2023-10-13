import { Suspense, createResource, createSignal } from "solid-js";
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
    <>
      <Navbar setTab={setTab}></Navbar>
      <Suspense fallback={<p class="text-center font-bold">Loading...</p>}>
        <EntryList getTab={getTab} getSchedule={getSchedule}></EntryList>
      </Suspense>
    </>
  );
}

export default App;
