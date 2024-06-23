import { For, Match, Switch, createMemo } from "solid-js";
import { Stage } from "./stage";
import { Mode, getImgFromMode } from "./modes";
import { createCountdownFromNow } from "@solid-primitives/date";

interface ChallengeEntryProps {
  name: string;
  description: string;
  timePeriods: [{ startTime: string; endTime: string }];
  stage1: Stage;
  stage2: Stage;
  mode: Mode;
}

export function ChallengeEntry(props: ChallengeEntryProps) {
  const timePeriods = () => props.timePeriods;
  const countdowns = createMemo(() => {
    return timePeriods().map(({ startTime }) => {
      //i think adding one minute to the countdown is good idea
      //will prevent having 0 minutes before the time hits
      return createCountdownFromNow(new Date(startTime).getTime() + 60000, 6000)[0];
    });
  });

  const titleSize = () => (22 / props.name.length) * 180;

  return (
    <div class="bg-neutral-7 rounded m-t-1 m-b-1 p-2">
      <div class="flex gap-1">
        <img class="aspect-square w-12" src={getImgFromMode(props.mode)} />
        <span
          class="font-bold shadow-black text-shadow-[2px_2px_var(--un-shadow-color)] text-nowrap self-center"
          style={{ "font-size": `min(175%, ${titleSize()}%)` }}
        >
          {props.name}
        </span>
      </div>
      <p class="whitespace-pre m-t-2 font-light">{props.description}</p>
      <div class="grid grid-cols-2 gap-1 m-b-2">
        <div class="relative">
          <img class="aspect-video w-100% rounded" src={props.stage1.thumbnail} alt={props.stage1.name} />
          <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
            {props.stage1.name}
          </p>
        </div>
        <div class="relative">
          <img class="aspect-video w-100% rounded" src={props.stage2.thumbnail} alt={props.stage2.name} />
          <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
            {props.stage2.name}
          </p>
        </div>
      </div>

      <For each={props.timePeriods}>
        {(node, i) => (
          <>
            <div class="flex content-between p-1 m-t-1 font-size-3.5 relative">
              <p class="m-0 grow-2 font-bold">
                {new Date(node.startTime).toLocaleString([], {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
                }) +
                  " - " +
                  new Date(node.endTime).toLocaleString([], {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
              </p>
              <span class="text-center grow-1 font-size-3 self-center font-bold bg-neutral-1 rounded color-black">
                <Switch fallback="OVER">
                  <Match when={new Date(props.timePeriods[i()].startTime).getTime() > Date.now()}>
                    {`in ${countdowns()[i()].days}d ${countdowns()[i()].hours}h ${countdowns()[i()].minutes}m`}
                  </Match>
                  <Match
                    when={
                      new Date(props.timePeriods[i()].startTime).getTime() <= Date.now() &&
                      new Date(props.timePeriods[i()].endTime).getTime() >= Date.now()
                    }
                  >
                    NOW
                  </Match>
                </Switch>
              </span>
              {new Date(props.timePeriods[i()].endTime).getTime() < Date.now() && (
                <hr class="absolute w-95% h-0 m-auto bottom-0 border-2px border-pink-6 border-solid rounded top-0 left-2.5%" />
              )}
            </div>
            {i() !== props.timePeriods.length - 1 && <hr class="border-dashed border-neutral-4" />}
          </>
        )}
      </For>
    </div>
  );
}
