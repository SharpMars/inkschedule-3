import { Accessor, Setter } from "solid-js";

export type Tab = "Regular" | "Anarchy" | "X" | "Salmon" | "Fest" | "Challenges";

interface NavbarProps {
  setTab: Setter<Tab>;
  getSchedule: Accessor<any>;
}

export function Navbar(props: NavbarProps) {
  return (
    <nav class="flex h-36px flex-justify-around gap-1">
      <button
        aria-label="Regular Battle"
        class="bg-lime-400 b-0 b-rounded flex-1 hover:filter-brightness-90% active:filter-brightness-70% transition-filter"
        onClick={() => {
          props.setTab("Regular");
        }}
      >
        <img class="aspect-square h-100%" src="/Regular_Battle.svg" />
      </button>
      <button
        aria-label="Anarchy Battle"
        class="bg-orange-500 b-0 b-rounded flex-1 hover:filter-brightness-90% active:filter-brightness-70% transition-filter"
        onClick={() => {
          props.setTab("Anarchy");
        }}
      >
        <img class="aspect-square h-100%" src="/Ranked_Battle.svg" />
      </button>
      <button
        aria-label="X Battle"
        class="bg-emerald-400 b-0 b-rounded flex-1 hover:filter-brightness-90% active:filter-brightness-70% transition-filter"
        onClick={() => {
          props.setTab("X");
        }}
      >
        <img class="aspect-square h-100%" src="/XBattleLogo.png" />
      </button>
      {props.getSchedule()?.data.eventSchedules.nodes.length > 0 && (
        <button
          aria-label="Challenges"
          class="bg-pink-600 b-0 b-rounded flex-1 hover:filter-brightness-90% active:filter-brightness-70% transition-filter"
          onClick={() => {
            props.setTab("Challenges");
          }}
        >
          <img class="aspect-square h-100%" src="/Challenges.png" />
        </button>
      )}
      <button
        aria-label="Salmon Run"
        class="bg-orange-600 b-0 b-rounded flex-1 hover:filter-brightness-90% active:filter-brightness-70% transition-filter"
        onClick={() => {
          props.setTab("Salmon");
        }}
      >
        <img class="aspect-square h-100%" src="/Icon_Mr_Grizz.png" />
      </button>
    </nav>
  );
}
