import About from "Pages/about";
import MoreAboutMe from "Pages/about/more/MoreAboutMe";
import Contact from "Pages/contact";
import Home from "Pages/home";
import Portfolio from "Pages/portfolio";
import Testimonial from "Pages/testimonial";

export const routerElements: Array<{
  path: string;
  element: React.ComponentType;
}> = [
  { path: "/", element: Home },
  { path: "/about", element: About },
  { path: "/more", element: MoreAboutMe },
  { path: "/portfolio", element: Portfolio },
  { path: "/testimonial", element: Testimonial },
  { path: "/contact", element: Contact },
];
