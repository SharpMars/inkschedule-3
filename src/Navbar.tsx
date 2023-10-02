import { Setter } from "solid-js";
import { Tab } from "./tabs";

interface NavbarProps {
  setTab: Setter<Tab>;
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
