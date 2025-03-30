import { IoBriefcase, IoBriefcaseOutline, IoHome, IoHomeOutline } from "react-icons/io5";
import { LuIdCard } from "react-icons/lu";
import { TiThumbsOk } from "react-icons/ti";
import { MdContactMail, MdOutlineContactMail } from "react-icons/md";
import { NavItem, ScreenSize } from "context/types";
import { BsPersonVcard, BsPersonVcardFill } from "react-icons/bs";

export const breakpoints = {
  [ScreenSize.SMALL]: "(max-width: 767px)",
  [ScreenSize.MEDIUM]: "(min-width: 768px) and (max-width: 1023px)",
  [ScreenSize.BIG]: "(min-width: 1024px)",
};



export const defaultItems: NavItem[] = [
  {
    id: "home",
    path: "/",
    icon: IoHomeOutline,
    activeIcon: IoHome,
    label: "Home",
    size: 22,
    activeSize: 24,
  },
  {
    id: "about",
    path: "/about",
    icon: BsPersonVcard,
    activeIcon: BsPersonVcardFill,
    label: "About",
    children: ["/more"], // Add nested paths here
    size: 21,
    activeSize: 23,
  },
  {
    id: "portfolio",
    path: "/portfolio",
    icon: IoBriefcaseOutline,
    activeIcon: IoBriefcase,
    label: "Portfolio",
    size: 22,
    activeSize: 24,
  },
  {
    id: "contact",
    path: "/contact",
    icon: MdOutlineContactMail,
    activeIcon: MdContactMail,
    label: "Contact",
    size: 24,
    activeSize: 26,
  },
];
