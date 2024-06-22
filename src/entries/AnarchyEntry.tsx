import { Show } from "solid-js";
import { TimeLabel } from "./TimeLabel";
import { getImgFromMode, Mode } from "./modes";
import { Stage } from "./stage";

interface AnarchyEntryProps {
  startTime: Date;
  endTime: Date;
  seriesMatch: Match;
  openMatch: Match;
}

interface Match {
  mode: Mode;
  stage1: Stage;
  stage2: Stage;
}

export function AnarchyEntry(props: AnarchyEntryProps) {
  return (
    <Show when={props.endTime.getTime() >= Date.now()}>
      <div class="m-t-1 m-b-1">
        <TimeLabel startTime={props.startTime} endTime={props.endTime} />
        <div class="bg-neutral-7 rounded m-t-1 flex gap-1 p-2 flex-col">
          <div class="flex justify-center gap-1">
            <div class="relative flex items-center">
              <img src={getImgFromMode(props.seriesMatch.mode)} class="aspect-square max-w-100%" />
              <p class="absolute rounded-50% bg-violet-6 m-0 h-24px w-24px text-center font-bold bottom-3 right-1">S</p>
            </div>
            <div class="relative flex-1">
              <img
                class="aspect-video rounded max-w-100%"
                src={props.seriesMatch.stage1.thumbnail}
                alt={props.seriesMatch.stage1.name}
              />
              <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
                {props.seriesMatch.stage1.name}
              </p>
            </div>
            <div class="relative flex-1">
              <img
                class="aspect-video rounded flex-1 max-w-100%"
                src={props.seriesMatch.stage2.thumbnail}
                alt={props.seriesMatch.stage2.name}
              />
              <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
                {props.seriesMatch.stage2.name}
              </p>
            </div>
          </div>
          <div class="flex justify-center gap-1">
            <div class="relative flex items-center">
              <img src={getImgFromMode(props.openMatch.mode)} class="aspect-square max-w-100%" />
              <p class="absolute rounded-50% bg-violet-6 m-0 h-24px w-24px text-center font-bold bottom-3 right-1">O</p>
            </div>
            <div class="relative flex-1">
              <img
                class="aspect-video rounded max-w-100%"
                src={props.openMatch.stage1.thumbnail}
                alt={props.openMatch.stage1.name}
              />
              <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
                {props.openMatch.stage1.name}
              </p>
            </div>
            <div class="relative flex-1">
              <img
                class="aspect-video rounded flex-1 max-w-100%"
                src={props.openMatch.stage2.thumbnail}
                alt={props.openMatch.stage2.name}
              />
              <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
                {props.openMatch.stage2.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
