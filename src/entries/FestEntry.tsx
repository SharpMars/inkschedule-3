import { Show } from "solid-js";
import { TimeLabel } from "./TimeLabel";
import { Stage } from "./stage";

interface FestEntryProps {
  startTime: Date;
  endTime: Date;
  openMatch: Match;
  proMatch: Match;
}

interface Match {
  stage1: Stage;
  stage2: Stage;
}

export function FestEntry(props: FestEntryProps) {
  return (
    <Show when={props.endTime.getTime() >= Date.now()}>
      <div class="m-t-1 m-b-1">
        <TimeLabel startTime={props.startTime} endTime={props.endTime}></TimeLabel>
        <div class="bg-neutral-7 rounded m-t-1 flex gap-1 p-2 flex-col">
          <div class="flex justify-center gap-1">
            <div class="relative flex-1">
              <img
                class="aspect-video rounded max-w-100%"
                src={props.openMatch.stage1.thumbnail}
                alt={props.openMatch.stage1.name}
              />
              <p class="absolute m-0 top-0 left-0 font-size-3 bg-neutral-9 color-white rounded rounded-lb-0 rounded-rt-0 p-l-1 p-r-1 whitespace-nowrap font-bold">
                Open
              </p>
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
          <div class="flex justify-center gap-1">
            <div class="relative flex-1">
              <img
                class="aspect-video rounded max-w-100%"
                src={props.proMatch.stage1.thumbnail}
                alt={props.proMatch.stage1.name}
              />
              <p class="absolute m-0 top-0 left-0 font-size-3 bg-neutral-9 color-white rounded rounded-lb-0 rounded-rt-0 p-l-1 p-r-1 whitespace-nowrap font-bold">
                Pro
              </p>
              <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
                {props.proMatch.stage1.name}
              </p>
            </div>
            <div class="relative flex-1">
              <img
                class="aspect-video rounded flex-1 max-w-100%"
                src={props.proMatch.stage2.thumbnail}
                alt={props.proMatch.stage2.name}
              />
              <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
                {props.proMatch.stage2.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
