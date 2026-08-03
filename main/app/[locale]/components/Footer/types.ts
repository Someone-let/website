export type InteractiveMode = "connect" | "attract" | "repel";
export type ThemeVariant = "obsidian" | "charcoal" | "minimal" | "high-contrast";

export interface ConstellationConfig {
  particleCount: number;
  particleMinSize: number;
  particleMaxSize: number;
  maxDistance: number;
  mouseRadius: number;
  particleSpeed: number;
  particleColor: string;
  lineColor: string;
  glowEffect: boolean;
  interactiveMode: InteractiveMode;
  themeVariant: ThemeVariant;
}

export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface SystemStatus {
  indicator: "operational" | "degraded" | "outage";
  label: string;
  uptime: string;
}
