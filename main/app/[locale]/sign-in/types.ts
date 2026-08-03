export interface BackgroundSettings {
  preset:
    | "geometric-3d"
    | "floating-polygons"
    | "particles-constellation"
    | "liquid-blobs"
    | "grid-matrix";
  theme: "light" | "dark" | "high-contrast";
  density: number;
  speed: number;
  interactive: boolean;
  particleSize?: number;
  gridOverlay?: boolean;
}
