import { Match, Show, Switch } from "solid-js";
import { Stage } from "./stage";
import { createCountdownFromNow } from "@solid-primitives/date";

interface TriColorEntryProps {
  startTime: string;
  endTime: string;
  stage: Stage;
  nextMatch?: { startTime: string; endTime: string; festMatchSettings: { vsStages: any[] }[] };
}

export function TriColorEntry(props: TriColorEntryProps) {
  const startTime = () => props.startTime;

  //i think adding one minute to the countdown is good idea
  //will prevent having 0 minutes before the time hits
  const [countdown] = createCountdownFromNow(new Date(startTime()).getTime() + 60000, 6000);
  const [nextCountdown] = createCountdownFromNow(new Date(props.nextMatch?.startTime || -1).getTime() + 60000, 6000);

  return (
    <div class="bg-neutral-7 rounded m-t-1 m-b-1 p-2">
      <div class="flex flex-col gap-1 m-b-2 relative">
        <img
          src="/Tricolor.png"
          class="aspect-square w-25% position-absolute z-1 left--3 bottom--5 filter-drop-shadow filter-drop-shadow-color-[#00000080]"
        />
        <div class="flex flex-row relative">
          <span class="text-center grow-1 font-size-3.5 self-center font-800 bg-yellow-3 rounded color-black max-h-6">
            <Switch fallback="OVER">
              <Match
                when={new Date(props.startTime).getTime() > Date.now()}
              >{`Open in ${countdown.hours}h ${countdown.minutes}m`}</Match>
              <Match
                when={
                  new Date(props.startTime).getTime() <= Date.now() && new Date(props.endTime).getTime() >= Date.now()
                }
              >
                <Show when={props.nextMatch != undefined} fallback="OPEN NOW">
                  {`Next stage in ${nextCountdown.hours}h ${nextCountdown.minutes}m`}
                </Show>
              </Match>
            </Switch>
          </span>
        </div>
        <div class="relative">
          <img class="aspect-video w-100% rounded" src={props.stage.thumbnail} alt={props.stage.name} />
          <Show when={props.nextMatch != undefined}>
            <div class="absolute w-40% right-0 bottom-2.5%">
              <img
                class="absolute bottom-0 left-0 aspect-video w-100% border-rd-[0.25rem_0_0.25rem_0] drop-shadow drop-shadow-color-dark"
                src={props.nextMatch?.festMatchSettings[0].vsStages[0].image.url}
                alt={props.nextMatch?.festMatchSettings[0].vsStages[0].name}
              />
              <p class="absolute m-0 font-size-3 right-0 bottom-0 bg-neutral-9 color-white p-l-1 p-r-1 whitespace-nowrap font-bold border-rd-[0.25rem_0_0.25rem_0]">
                Next up
              </p>
            </div>
          </Show>
          <Show
            when={props.nextMatch != undefined}
            fallback={
              <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
                {props.stage.name}
              </p>
            }
          >
            <p class="absolute m-0 font-size-3 top-0 left-0 bg-neutral-9 color-white p-l-1 p-r-1 whitespace-nowrap font-bold border-rd-[0.25rem_0_0.25rem_0]">
              {props.stage.name}
            </p>
          </Show>
        </div>
      </div>
    </div>
  );
}
