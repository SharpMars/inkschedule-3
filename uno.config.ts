import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  presets: [presetWind3({})],
  theme: {
    animation: {
      keyframes: {
        swim: "{0%,100% {transform:scaleX(1.1) scaleY(0.95); background-image: url('/squid.svg');} 50% {transform:scaleX(.5) scaleY(1.05); background-image: url('/squid-2.svg');}}"
      },
      durations: {
        swim: "800ms"
      },
      timingFns: {
        swim: "cubic-bezier( 0.5, 0, 0.3, 1 )"
      },
      counts: {
        swim: "infinite"
      }
    }
  }
});
