import { Show } from "solid-js";
import { TimeLabel } from "./TimeLabel";
import { Stage } from "./stage";

interface EggstraEntryProps {
  startTime: Date;
  endTime: Date;
  stage: Stage;
  weapon1: Weapon;
  weapon2: Weapon;
  weapon3: Weapon;
  weapon4: Weapon;
}

interface Weapon {
  name: string;
  image: string;
}

export function EggstraEntry(props: EggstraEntryProps) {
  return (
    <Show when={props.endTime.getTime() >= Date.now()}>
      <div class="m-t-1 m-b-1">
        <TimeLabel startTime={props.startTime} endTime={props.endTime} withDate={true} />
        <div class="bg-yellow-7 rounded m-t-1 flex gap-2 p-2 justify-center">
          <div class="relative flex-1 grow-2">
            <img class="aspect-video rounded max-w-100%" src={props.stage.thumbnail} alt={props.stage.name} />
            <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold line-height-relaxed">
              {props.stage.name}
            </p>
          </div>
          <div class="grid grid-cols-2 flex-1 relative bg-black rounded bg-opacity-20">
            <img class="aspect-square max-w-100%" src={props.weapon1.image} alt={props.weapon1.name} />
            <img class="aspect-square max-w-100%" src={props.weapon2.image} alt={props.weapon2.name} />
            <img class="aspect-square max-w-100%" src={props.weapon3.image} alt={props.weapon3.name} />
            <img class="aspect-square max-w-100%" src={props.weapon4.image} alt={props.weapon4.name} />
          </div>
        </div>
      </div>
    </Show>
  );
}
