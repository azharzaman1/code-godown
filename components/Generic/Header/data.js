import {
  BookmarkAltIcon,
  PhoneIcon,
  MailIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { BookOpenIcon } from "@heroicons/react/solid";

import { Dashboard, Settings, Person } from "@mui/icons-material";

export const dropdownMenu = [
  {
    key: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: Dashboard,
  },
  {
    key: 1,
    name: "My Account",
    href: "/my-account",
    icon: Person,
  },
  {
    key: 2,
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const features = [
  {
    name: "Automations",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "#",
    icon: RefreshIcon,
  },
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: SupportIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkAltIcon,
  },
  {
    name: "Privacy",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];

export const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "Contact Support", href: "#", icon: PhoneIcon },
];

export const moreFromMe = [
  {
    name: "COVID-19 Tracker",
    description:
      "Realtime COVID-19 tracker built with ReactJs and desease.sh api.",
    href: "https://covidtracker.azharzaman.com/",
    icon: ShieldCheckIcon,
  },
  {
    name: "Library Application",
    description:
      "Simple library application built with MERN stack, to manage students and books.",
    href: "https://azhar-libraryapp.vercel.app/",
    icon: BookOpenIcon,
  },
  {
    name: "Fully-featured Amazon demo",
    description:
      "Fully-featured Amazon demo with ReactJs, Redux and Firebase on backend.",
    href: "https://amazondemo.azharzaman.com/",
    icon: ShoppingCartIcon,
  },
];

export const moreFromMeActions = [
  {
    name: "Visist Website",
    href: "https://azharzaman.com/",
    icon: GlobeAltIcon,
  },
  {
    name: "Contact Me",
    href: "mailto:azharzaman.001@gmail.com",
    icon: MailIcon,
  },
];

/*
  // {
  //   name: "Analytics",
  //   description:
  //     "Get a better understanding of where your traffic is coming from.",
  //   href: "#",
  //   icon: ChartBarIcon,
  // },
  // {
  //   name: "Engagement",
  //   description: "Speak directly to your customers in a more meaningful way.",
  //   href: "#",
  //   icon: CursorClickIcon,
  // },
  // {
  //   name: "Security",
  //   description: "Your customers' data will be safe and secure.",
  //   href: "#",
  //   icon: ShieldCheckIcon,
  // },
  // {
  //   name: "Integrations",
  //   description: "Connect with third-party tools that you're already using.",
  //   href: "#",
  //   icon: ViewGridIcon,
  // },
*/
