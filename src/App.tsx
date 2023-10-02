import { For, Match, Suspense, Switch, createResource, createSignal } from "solid-js";
import { Navbar } from "./Navbar";
import { AnarchyEntry } from "./entries/AnarchyEntry";
import { RegularEntry } from "./entries/RegularEntry";
import { SalmonEntry } from "./entries/SalmonEntry";
import { XEntry } from "./entries/XEntry";
import { Tab } from "./tabs";
import { getCurrentSchedule } from "./schedule";

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
        <div class="overflow-y-scroll flex flex-col h-[calc(100vh-44px)] p-l-1 p-r-1 m-t-2">
          <Switch>
            <Match when={getTab() === "Regular"}>
              <For each={getSchedule()?.data.regularSchedules.nodes}>
                {(node) => (
                  <RegularEntry
                    startTime={new Date(Date.parse(node.startTime))}
                    endTime={new Date(Date.parse(node.endTime))}
                    stage1={{
                      name: node.regularMatchSetting.vsStages[0].name,
                      thumbnail: node.regularMatchSetting.vsStages[0].image.url
                    }}
                    stage2={{
                      name: node.regularMatchSetting.vsStages[1].name,
                      thumbnail: node.regularMatchSetting.vsStages[1].image.url
                    }}
                  />
                )}
              </For>
            </Match>
            <Match when={getTab() === "Anarchy"}>
              <For each={getSchedule()?.data.bankaraSchedules.nodes}>
                {(node) => (
                  <AnarchyEntry
                    startTime={new Date(Date.parse(node.startTime))}
                    endTime={new Date(Date.parse(node.endTime))}
                    seriesMatch={{
                      mode: node.bankaraMatchSettings[0].vsRule.rule,
                      stage1: {
                        name: node.bankaraMatchSettings[0].vsStages[0].name,
                        thumbnail: node.bankaraMatchSettings[0].vsStages[0].image.url
                      },
                      stage2: {
                        name: node.bankaraMatchSettings[0].vsStages[1].name,
                        thumbnail: node.bankaraMatchSettings[0].vsStages[1].image.url
                      }
                    }}
                    openMatch={{
                      mode: node.bankaraMatchSettings[1].vsRule.rule,
                      stage1: {
                        name: node.bankaraMatchSettings[1].vsStages[0].name,
                        thumbnail: node.bankaraMatchSettings[1].vsStages[0].image.url
                      },
                      stage2: {
                        name: node.bankaraMatchSettings[1].vsStages[1].name,
                        thumbnail: node.bankaraMatchSettings[1].vsStages[1].image.url
                      }
                    }}
                  />
                )}
              </For>
            </Match>
            <Match when={getTab() === "X"}>
              <For each={getSchedule()?.data.xSchedules.nodes}>
                {(node) => (
                  <XEntry
                    startTime={new Date(Date.parse(node.startTime))}
                    endTime={new Date(Date.parse(node.endTime))}
                    stage1={{
                      name: node.xMatchSetting.vsStages[0].name,
                      thumbnail: node.xMatchSetting.vsStages[0].image.url
                    }}
                    stage2={{
                      name: node.xMatchSetting.vsStages[1].name,
                      thumbnail: node.xMatchSetting.vsStages[1].image.url
                    }}
                    mode={node.xMatchSetting.vsRule.rule}
                  />
                )}
              </For>
            </Match>
            <Match when={getTab() === "Salmon"}>
              <For each={getSchedule()?.data.coopGroupingSchedule.regularSchedules.nodes}>
                {(node) => (
                  <SalmonEntry
                    startTime={new Date(Date.parse(node.startTime))}
                    endTime={new Date(Date.parse(node.endTime))}
                    kingSalmonid={node.__splatoon3ink_king_salmonid_guess}
                    stage={{
                      name: node.setting.coopStage.name,
                      thumbnail: node.setting.coopStage.thumbnailImage.url
                    }}
                    weapon1={{
                      name: node.setting.weapons[0].name,
                      image: node.setting.weapons[0].image.url
                    }}
                    weapon2={{
                      name: node.setting.weapons[1].name,
                      image: node.setting.weapons[1].image.url
                    }}
                    weapon3={{
                      name: node.setting.weapons[2].name,
                      image: node.setting.weapons[2].image.url
                    }}
                    weapon4={{
                      name: node.setting.weapons[3].name,
                      image: node.setting.weapons[3].image.url
                    }}
                  />
                )}
              </For>
            </Match>
          </Switch>
        </div>
      </Suspense>
    </>
  );
}

export default App;
