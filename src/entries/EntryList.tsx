import { Accessor, For, Match, Show, Switch } from "solid-js";
import { RegularEntry } from "./RegularEntry";
import { AnarchyEntry } from "./AnarchyEntry";
import { SalmonEntry } from "./SalmonEntry";
import { Tab } from "../Navbar";
import { XEntry } from "./XEntry";
import { ChallengeEntry } from "./ChallengeEntry";

interface EntryListProps {
  getTab: Accessor<Tab>;
  getSchedule: Accessor<any>;
}

export function EntryList(props: EntryListProps) {
  return (
    //height calculated from max height minus navbar height and few pixels for bottom margin
    <div class="overflow-y-scroll flex flex-col h-[calc(100vh-46px)] p-l-1 p-r-1 m-t-2 m-l-.5 m-r-.5 m-b-1">
      <Switch>
        <Match when={props.getTab() === "Regular"}>
          <For each={props.getSchedule()?.data.regularSchedules.nodes}>
            {(node) => (
              <Show when={node.regularMatchSetting !== null}>
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
              </Show>
            )}
          </For>
        </Match>
        <Match when={props.getTab() === "Anarchy"}>
          <For each={props.getSchedule()?.data.bankaraSchedules.nodes}>
            {(node) => (
              <Show when={node.bankaraMatchSettings !== null}>
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
              </Show>
            )}
          </For>
        </Match>
        <Match when={props.getTab() === "X"}>
          <For each={props.getSchedule()?.data.xSchedules.nodes}>
            {(node) => (
              <Show when={node.xMatchSetting !== null}>
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
              </Show>
            )}
          </For>
        </Match>
        <Match when={props.getTab() === "Salmon"}>
          <For each={props.getSchedule()?.data.coopGroupingSchedule.regularSchedules.nodes}>
            {(node) => (
              <SalmonEntry
                startTime={new Date(Date.parse(node.startTime))}
                endTime={new Date(Date.parse(node.endTime))}
                kingSalmonid={node.setting.boss.name}
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
        <Match when={props.getTab() === "Challenges"}>
          <For each={props.getSchedule()?.data.eventSchedules.nodes}>
            {(node) => (
              <ChallengeEntry
                name={node.leagueMatchSetting.leagueMatchEvent.name}
                description={node.leagueMatchSetting.leagueMatchEvent.desc.replace("<br />", "\n")}
                timePeriods={node.timePeriods}
                stage1={{
                  name: node.leagueMatchSetting.vsStages[0].name,
                  thumbnail: node.leagueMatchSetting.vsStages[0].image.url
                }}
                stage2={{
                  name: node.leagueMatchSetting.vsStages[1].name,
                  thumbnail: node.leagueMatchSetting.vsStages[1].image.url
                }}
                mode={node.leagueMatchSetting.vsRule.rule}
              />
            )}
          </For>
        </Match>
      </Switch>
    </div>
  );
}
