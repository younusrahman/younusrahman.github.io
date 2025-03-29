import { PortfolioItemType } from "context/types";
import { PortfolioTab } from ".";


export const portfolioItems: PortfolioItemType<PortfolioTab>[] = [
  {
    category: ["E-commerce", "Web-Application"],
    imgSrc: "portfolio/thumb/project-1.png",
    imgAlt: "portfolio",
    screenshots: [
      "portfolio/large/project-1/1.png",
      "portfolio/large/project-1/2.png",
      "portfolio/large/project-1/3.png",
      "portfolio/large/project-1/4.png",
      "portfolio/large/project-1/5.png",
    ],
    title: "Newton Project",
    projectBrief:
      "Project work from my latest topic web application. This is a one page application and used dummy json api.",
    date: "2021",
    client: "Newton",
    tools: ["html", "css", "javascript", "Vue"],
    webLink: "https://www.newton.se/",
  },
  {
    category: ["Web-Application"],
    imgSrc: "portfolio/thumb/project-2.png",
    imgAlt: "portfolio",
    screenshots: ["portfolio/large/project-2/1.png"],
    title: "For fun",
    projectBrief:
      "This project was just for fan. User choose 3 number between 1 to 100. If any of those number can divided with another then it should show bish or bosh depands on which number. If both number goes then message should show bish and bosh",
    date: "2021",
    client: "Jimmy",
    tools: ["html", "css", "JavaScript"],
    webLink: "#",
  },
  {
    category: ["Web-Application"],
    imgSrc: "portfolio/thumb/project-3.png",
    imgAlt: "portfolio",
    screenshots: [
      "portfolio/large/project-3/1.png",
      "portfolio/large/project-3/2.png",
    ],
    title: "Handling Api",
    projectBrief:
      "Trying to create a SL similar webpage. Main target was to learn how to handel api",
    date: "2020",
    client: "Mekail",
    tools: ["html", "css"],
    webLink: "#",
  },
  {
    category: ["Web-Application"],
    imgSrc: "portfolio/thumb/project-4.png",
    imgAlt: "portfolio",
    screenshots: [
      "portfolio/large/project-4/1.png",
      "portfolio/large/project-4/2.png",
      "portfolio/large/project-4/3.png",
      "portfolio/large/project-4/4.png",
    ],
    title: "personal portfolio",
    projectBrief:
      "This is personal portfolio where anyone can read & see about me and my skills. Do not hesitate to contact me if you have any further questions",
    date: "2021",
    client: "Younus Rahman",
    tools: ["html", "css", "jquery", "javascript"],
    webLink: "#",
  },
  {
    category: ["Mobile-App"],
    imgSrc: "portfolio/thumb/project-5.png",
    imgAlt: "portfolio",
    screenshots: ["portfolio/large/project-5/1.png"],
    title: "Login App",
    projectBrief:
      "Hobby project. simple login page. Can sign up manually or sign up with Google Account",
    date: "2020",
    client: "xyz",
    tools: ["xamarin forms"],
    webLink: "www.domain.com",
  },
  {
    category: ["Web-Application"],
    imgSrc: "portfolio/thumb/project-6.png",
    imgAlt: "portfolio",
    screenshots: [
      "portfolio/large/project-6/1.png",
      "portfolio/large/project-6/2.png",
      "portfolio/large/project-6/3.png",
    ],
    title: "quiz application",
    projectBrief:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
    date: "2020",
    client: "xyz",
    tools: ["html", "css", "javascript"],
    webLink: "www.domain.com",
  },
  {
    category: ["Web-Application"],
    imgSrc: "portfolio/thumb/project-9.png",
    imgAlt: "portfolio",
    screenshots: [
      "portfolio/large/project-9/1.png",
      "portfolio/large/project-9/2.png",
      "portfolio/large/project-9/3.png",
      "portfolio/large/project-9/4.png",
      "portfolio/large/project-9/5.png",
      "portfolio/large/project-9/6.png",
    ],
    title: "To do",
    projectBrief:
      "Simple To-do list app. Where you can add, edit, delete and search for specific items. All data is save using Local sql server.",
    date: "2021",
    client: "YR",
    tools: ["javaScript", "Asp", "SQl"],
    webLink: "",
  },
  {
    category: ["Web-Application"],
    imgSrc: "portfolio/thumb/project-10.png",
    imgAlt: "portfolio",
    screenshots: [
      "portfolio/large/project-10/1.png",
      "portfolio/large/project-10/2.png",
      "portfolio/large/project-10/3.png",
    ],
    title: "Map",
    projectBrief:
      "Simple map with the possibility to see the live weather, place information, add point of interest, add comments, like and dislike..",
    date: "2022",
    client: "Newton",
    tools: ["WPF", "API", "SQl"],
    webLink: "",
  },
  {
    category: ["Web-Application"],
    imgSrc: "portfolio/thumb/project-11.png",
    imgAlt: "portfolio",
    screenshots: [
      "portfolio/large/project-11/1.png",
      "portfolio/large/project-11/2.png",
      "portfolio/large/project-11/3.png",
      "portfolio/large/project-11/4.png",
      "portfolio/large/project-11/5.png",
      "portfolio/large/project-11/6.png",
    ],
    title: "Cleaning Website- responsive",
    projectBrief: "First freelance project",
    date: "2022",
    client: "Tomas",
    tools: ["React", "Redux"],
    webLink: "",
  },
];

export const filterCategories = [
  { id: "all", name: "all" },
  { id: "web-application", name: "web application" },
  { id: "photoshop", name: "photoshop" },
  { id: "mobile-app", name: "mobile app" },
  { id: "e-commerce", name: "e commerce" },
];
