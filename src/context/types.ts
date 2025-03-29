import { ReactElement, ReactNode } from "react";
import { StateMapping } from "./GlobalProvider";
import { IconType } from "react-icons";

enum ThemeColor {
  Orange = "#d35400",
  Turquoise = "#00cec9",
  Green = "#16a085",
  Blue = "#2eb1ed",
  Beige = "#ECD596",
}

enum BackgroundImage {
  Orange = "bg1.jpg",
  Turquoise = "bg2.jpg",
  Green = "bg3.jpeg",
  Blue = "bg4.jpg",
  Beige = "bg5.jpg",
}

enum ScreenSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  BIG = "BIG",
}

enum StateSection {
  SCREENSIZE = "SCREENSIZE",
  THEMESELECTOR = "THEMESELECTOR",
}

export { StateSection, ThemeColor, BackgroundImage, ScreenSize };

type StateMapping = typeof StateMapping;

type GlobalStateType = {
  [key in StateSection]: StateMapping[key];
};

type ActionType = {
  [K in StateSection]: {
    type: K;
    payload: {
      key: keyof StateMapping[K];
      value: StateMapping[K][keyof StateMapping[K]];
    };
  };
}[StateSection];

type ActionHandlerType = (
  state: GlobalStateType,
  action: ActionType
) => GlobalStateType;

type BackgroundImageWrapperType = {
  children: ReactNode; // Explicitly define the type of children
};

type ScreenSizeType = {
  SMALL: boolean;
  MEDIUM: boolean;
  BIG: boolean;
};
type ThemeSelectorType = {
  color: ThemeColor;
  backgroundImage: BackgroundImage;
};

type RouteComponentProps = {
  [key: string]: any;
};

type Group = {
  name: string;
  alignment: "left" | "right";
  items: string[];
};

export type TimelineItem = {
  id: string;
  title: string;
  icon: IconType;
  date?: string;
  location?: string;
  groups?: Group[];
  items?: {
    text: string;
    alignment: "left" | "right";
  }[];
};

export type TimelineData = {
  skills: TimelineItem[];
  experience: TimelineItem[];
  education: TimelineItem[];
};

type TabGroup<T extends string> = {
  label: T;
  component: React.ReactNode;
};


export type PortfolioItemType<T> = {
  category: T[];
  imgSrc: string;
  imgAlt: string;
  screenshots: string[];
  title: string;
  projectBrief: string;
  date: string;
  client: string;
  tools: string[];
  webLink: string;
};
export type ContactItemType = {
  id: string;
  type: "phone" | "email" | "address" | string;
  icon: IconType;
  label: string;
  value: string;
  displayValue: string;
  href: string;
  mapIframe?: string
  animation: {
    effect: string;
    duration: number;
    offset: number;
  };
  hiddenCopyValue?: string;
};

export type NavItem = {
  id: string;
  path: string;
  icon: IconType;
  activeIcon: IconType;
  label: string;
  size: number;
  activeSize: number; 
};

export type {
  GlobalStateType,
  ActionType,
  ActionHandlerType,
  ThemeSelectorType,
  ScreenSizeType,
  BackgroundImageWrapperType,
  RouteComponentProps,
  TabGroup,
};
