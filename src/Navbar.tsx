import { Accessor, Setter } from "solid-js";

export type Tab = "Regular" | "Anarchy" | "X" | "Salmon" | "Fest" | "Challenges";

interface NavbarProps {
  getTab: Accessor<Tab>;
  setTab: Setter<Tab>;
  getSchedule: Accessor<any>;
}

export function Navbar(props: NavbarProps) {
  return (
    <nav class="flex h-36px justify-center gap-1 p-1 p-b-0 [&>*:nth-child(odd)]:rotate-1 [&>*:nth-child(even)]:rotate--1">
      {props.getSchedule()?.data.festSchedules.nodes.length > 0 && (
        <button
          aria-label="Splatfest"
          class="bg-transparent b-0 flex-1 hover:filter-brightness-90% active:filter-brightness-70% active:scale-95 transition-all relative max-w-24 group p-0.5"
          classList={{ active: props.getTab() == "Fest" }}
          onClick={() => {
            props.setTab("Fest");
          }}
        >
          <div
            class="bg-neutral-7 w-full h-full absolute left-0 top-0"
            style={{
              "mask-image": "url('button_mask.svg')",
              "mask-size": "cover"
            }}
          ></div>
          <div
            class="group-[.active]:block hidden absolute w-full h-full bg-[#FFFF00] left-0 top-0 z-1 group-odd:rotate--3 group-even:rotate-3"
            style={{
              "mask-image": "url('/selection_mask.png')",
              "mask-mode": "luminance",
              "mask-size": "100% 100%",
              "mask-position": "center",
              "image-rendering": "pixelated"
            }}
          ></div>
          <img class="aspect-square h-100% relative z-2" src="/Splatfest.svg" />
        </button>
      )}
      {props.getSchedule()?.data.regularSchedules.nodes.length > 0 && (
        <button
          aria-label="Regular Battle"
          class="bg-transparent b-0 flex-1 hover:filter-brightness-90% active:filter-brightness-70% active:scale-95 transition-all relative max-w-24 group"
          classList={{ active: props.getTab() == "Regular" }}
          onClick={() => {
            props.setTab("Regular");
          }}
        >
          <div
            class="bg-neutral-7 w-full h-full absolute left-0 top-0"
            style={{
              "mask-image": "url('button_mask.svg')",
              "mask-size": "cover"
            }}
          ></div>
          <div
            class="group-[.active]:block hidden absolute w-full h-full bg-lime-400 left-0 top-0 z-1 group-odd:rotate--3 group-even:rotate-3"
            style={{
              "mask-image": "url('/selection_mask.png')",
              "mask-mode": "luminance",
              "mask-size": "100% 100%",
              "mask-position": "center",
              "image-rendering": "pixelated"
            }}
          ></div>
          <img class="aspect-square h-100% relative z-2" src="/Regular_Battle.svg" />
        </button>
      )}
      {props.getSchedule()?.data.bankaraSchedules.nodes.length > 0 && (
        <button
          aria-label="Anarchy Battle"
          class="bg-transparent b-0 flex-1 hover:filter-brightness-90% active:filter-brightness-70% active:scale-95 transition-all relative max-w-24 group"
          classList={{ active: props.getTab() == "Anarchy" }}
          onClick={() => {
            props.setTab("Anarchy");
          }}
        >
          <div
            class="bg-neutral-7 w-full h-full absolute left-0 top-0"
            style={{
              "mask-image": "url('button_mask.svg')",
              "mask-size": "cover"
            }}
          ></div>
          <div
            class="group-[.active]:block hidden absolute w-full h-full bg-orange-500 left-0 top-0 z-1 group-odd:rotate--3 group-even:rotate-3"
            style={{
              "mask-image": "url('/selection_mask.png')",
              "mask-mode": "luminance",
              "mask-size": "100% 100%",
              "mask-position": "center",
              "image-rendering": "pixelated"
            }}
          ></div>
          <img class="aspect-square h-100% relative z-2" src="/Ranked_Battle.svg" />
        </button>
      )}
      {props.getSchedule()?.data.xSchedules.nodes.length > 0 && (
        <button
          aria-label="X Battle"
          class="bg-transparent b-0 flex-1 hover:filter-brightness-90% active:filter-brightness-70% active:scale-95 transition-all relative max-w-24 group"
          classList={{ active: props.getTab() == "X" }}
          onClick={() => {
            props.setTab("X");
          }}
        >
          <div
            class="bg-neutral-7 w-full h-full absolute left-0 top-0"
            style={{
              "mask-image": "url('button_mask.svg')",
              "mask-size": "cover"
            }}
          ></div>
          <div
            class="group-[.active]:block hidden absolute w-full h-full bg-emerald-400 left-0 top-0 z-1 group-odd:rotate--3 group-even:rotate-3"
            style={{
              "mask-image": "url('/selection_mask.png')",
              "mask-mode": "luminance",
              "mask-size": "100% 100%",
              "mask-position": "center",
              "image-rendering": "pixelated"
            }}
          ></div>
          <img class="aspect-square h-100% relative z-2" src="/XBattleLogo.png" />
        </button>
      )}
      {props.getSchedule()?.data.eventSchedules.nodes.length > 0 && (
        <button
          aria-label="Challenges"
          class="bg-transparent b-0 flex-1 hover:filter-brightness-90% active:filter-brightness-70% active:scale-95 transition-all relative max-w-24 group"
          classList={{ active: props.getTab() == "Challenges" }}
          onClick={() => {
            props.setTab("Challenges");
          }}
        >
          <div
            class="bg-neutral-7 w-full h-full absolute left-0 top-0"
            style={{
              "mask-image": "url('button_mask.svg')",
              "mask-size": "cover"
            }}
          ></div>
          <div
            class="group-[.active]:block hidden absolute w-full h-full bg-pink-600 left-0 top-0 z-1 group-odd:rotate--3 group-even:rotate-3"
            style={{
              "mask-image": "url('/selection_mask.png')",
              "mask-mode": "luminance",
              "mask-size": "100% 100%",
              "mask-position": "center",
              "image-rendering": "pixelated"
            }}
          ></div>
          <img class="aspect-square h-100% relative z-2" src="/Challenges.png" />
        </button>
      )}
      <button
        aria-label="Salmon Run"
        class="bg-transparent b-0 flex-1 hover:filter-brightness-90% active:filter-brightness-70% active:scale-95 transition-all relative max-w-24 group"
        classList={{ active: props.getTab() == "Salmon" }}
        onClick={() => {
          props.setTab("Salmon");
        }}
      >
        <div
          class="bg-neutral-7 w-full h-full absolute left-0 top-0"
          style={{
            "mask-image": "url('button_mask.svg')",
            "mask-size": "cover"
          }}
        ></div>
        <div
          class="group-[.active]:block hidden absolute w-full h-full bg-orange-600 left-0 top-0 z-1 group-odd:rotate--3 group-even:rotate-3"
          style={{
            "mask-image": "url('/selection_mask.png')",
            "mask-mode": "luminance",
            "mask-size": "100% 100%",
            "mask-position": "center",
            "image-rendering": "pixelated"
          }}
        ></div>
        <img class="aspect-square h-100% relative z-2" src="/Icon_Mr_Grizz.png" />
      </button>
    </nav>
  );
}
