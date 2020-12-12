export type ThemeT = "light" | "dark" | "auto";

export type CollapseGroupsT = "expanded" | "collapsed" | "collapsedOnMobile";

export type LabelHidingModKeyT = "altKey" | "ctrlKey";

export interface UIDefaults {
  Refresh: number;
  HideFiltersWhenIdle: boolean;
  ColorTitlebar: boolean;
  Theme: ThemeT;
  Animations: boolean;
  MinimalGroupWidth: number;
  AlertsPerGroup: number;
  CollapseGroups: CollapseGroupsT;
  MultiGridLabel: string;
  MultiGridSortReverse: boolean;
  LabelHidingModKey: string;
}
