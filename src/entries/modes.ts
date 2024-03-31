export type Mode = "TURF_WAR" | "AREA" | "GOAL" | "LOFT" | "CLAM";

export function getImgFromMode(mode: Mode) {
  switch (mode) {
    case "TURF_WAR":
      return "/Turf_War.svg";
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
