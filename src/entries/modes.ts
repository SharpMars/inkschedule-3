export type Mode = "AREA" | "GOAL" | "LOFT" | "CLAM";

export function getImgFromMode(mode: Mode) {
  switch (mode) {
    case "AREA":
      return "/Splat_Zones.png";
    case "GOAL":
      return "/Rainmaker.png";
    case "LOFT":
      return "/Tower_Control.png";
    case "CLAM":
      return "/Clam_Blitz.png";
  }
}
