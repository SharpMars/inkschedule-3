import { Show } from "solid-js";
import { TimeLabel } from "./TimeLabel";
import { Mode, getImgFromMode } from "./modes";
import { Stage } from "./stage";

interface XEntryProps {
  startTime: Date;
  endTime: Date;
  mode: Mode;
  stage1: Stage;
  stage2: Stage;
}

export function XEntry(props: XEntryProps) {
  let modeImg = getImgFromMode(props.mode);

  return (
    <Show when={props.endTime.getTime() >= Date.now()}>
      <div class="m-t-1 m-b-1">
        <TimeLabel startTime={props.startTime} endTime={props.endTime}></TimeLabel>
        <div class="bg-neutral-7 rounded m-t-1 flex gap-1 p-2 justify-center">
          <div class="flex items-center">
            <img src={modeImg} class="aspect-square max-w-100%" />
          </div>
          <div class="relative flex-1">
            <img class="aspect-video rounded max-w-100%" src={props.stage1.thumbnail} alt={props.stage1.name} />
            <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
              {props.stage1.name}
            </p>
          </div>
          <div class="relative flex-1">
            <img class="aspect-video rounded flex-1 max-w-100%" src={props.stage2.thumbnail} alt={props.stage2.name} />
            <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
              {props.stage2.name}
            </p>
          </div>
        </div>
      </div>
    </Show>
  );
}
