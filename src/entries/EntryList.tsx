import { Accessor, For, Match, Show, Switch } from "solid-js";
import { RegularEntry } from "./RegularEntry";
import { AnarchyEntry } from "./AnarchyEntry";
import { SalmonEntry } from "./SalmonEntry";
import { Tab } from "../Navbar";
import { XEntry } from "./XEntry";
import { ChallengeEntry } from "./ChallengeEntry";
import { FestEntry } from "./FestEntry";
import { TriColorEntry } from "./TriColorEntry";
import { EggstraEntry } from "./EggstraEntry";
import { BigRunEntry } from "./BigRunEntry";

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
          <For each={props.getSchedule()?.data.coopGroupingSchedule.combinedSchedules.nodes}>
            {(node) => (
              <Switch
                fallback={
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
                }
              >
                <Match when={node.isEggstra}>
                  <EggstraEntry
                    startTime={new Date(Date.parse(node.startTime))}
                    endTime={new Date(Date.parse(node.endTime))}
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
                  ></EggstraEntry>
                </Match>
                <Match when={node.isBigRun}>
                  <BigRunEntry
                    startTime={new Date(Date.parse(node.startTime))}
                    endTime={new Date(Date.parse(node.endTime))}
                    stage={{
                      name: node.setting.coopStage.name,
                      thumbnail: node.setting.coopStage.thumbnailImage.url
                    }}
                    kingSalmonid={node.setting.boss.name}
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
                  ></BigRunEntry>
                </Match>
              </Switch>
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
        <Match when={props.getTab() === "Fest"}>
          <Show when={props.getSchedule()?.data.currentFest !== null}>
            <TriColorEntry
              startTime={props.getSchedule()?.data.currentFest.midtermTime}
              endTime={props.getSchedule()?.data.currentFest.endTime}
              stage={{
                name: props.getSchedule()?.data.currentFest.tricolorStage.name,
                thumbnail: props.getSchedule()?.data.currentFest.tricolorStage.image.url
              }}
            />
            <For each={props.getSchedule()?.data.festSchedules.nodes}>
              {(node) => (
                <Show when={node.festMatchSettings !== null}>
                  <FestEntry
                    startTime={new Date(Date.parse(node.startTime))}
                    endTime={new Date(Date.parse(node.endTime))}
                    openMatch={{
                      stage1: {
                        name: node.festMatchSettings[1].vsStages[0].name,
                        thumbnail: node.festMatchSettings[1].vsStages[0].image.url
                      },
                      stage2: {
                        name: node.festMatchSettings[1].vsStages[1].name,
                        thumbnail: node.festMatchSettings[1].vsStages[1].image.url
                      }
                    }}
                    proMatch={{
                      stage1: {
                        name: node.festMatchSettings[0].vsStages[0].name,
                        thumbnail: node.festMatchSettings[0].vsStages[0].image.url
                      },
                      stage2: {
                        name: node.festMatchSettings[0].vsStages[1].name,
                        thumbnail: node.festMatchSettings[0].vsStages[1].image.url
                      }
                    }}
                  />
                </Show>
              )}
            </For>
          </Show>
        </Match>
      </Switch>
    </div>
  );
}
