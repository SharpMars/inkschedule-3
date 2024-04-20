import { Match, Switch, createResource } from "solid-js";
import { Stage } from "./stage";

interface TriColorEntryProps {
  startTime: string;
  endTime: string;
  stage: Stage;
}

export function TriColorEntry(props: TriColorEntryProps) {
  const [countdown, { refetch }] = createResource(props.startTime, (src) => {
    const distance = new Date(src).getTime() - Date.now();
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    return `Open in ${hours}h ${minutes}m`;
  });

  setInterval(() => {
    refetch();
  }, 6000);

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
              <Match when={new Date(props.startTime).getTime() > Date.now()}>{countdown()}</Match>
              <Match
                when={
                  new Date(props.startTime).getTime() <= Date.now() && new Date(props.endTime).getTime() >= Date.now()
                }
              >
                OPEN NOW
              </Match>
            </Switch>
          </span>
        </div>
        <div class="relative">
          <img class="aspect-video w-100% rounded" src={props.stage.thumbnail} alt={props.stage.name} />
          <p class="absolute m-0 bottom-0 font-size-3 bg-neutral-9 color-white rounded p-l-1 p-r-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold">
            {props.stage.name}
          </p>
        </div>
      </div>
    </div>
  );
}
