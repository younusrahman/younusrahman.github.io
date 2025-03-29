import React, { useState, useEffect } from "react";
import styles from "./Portfolio.module.css";
import CustomTabs from "component/CustomTabs/CustomTabs";
import { PortfolioItemType, TabGroup } from "context/types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { portfolioItems } from "./data";
import PortfolioItem from "component/Portfolio/PortfolioItem";

export type PortfolioTab =
  | "All"
  | "Web-Application"
  | "Photoshop"
  | "E-commerce"
  | "Mobile-App";

function TabComponent({ tab }: { tab: PortfolioTab }) {
  const filteredItems =
    tab === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category.includes(tab));

  return (
    <div className={styles.portfolioContainer}>
      <div className={styles.portfolioItems}>
        
        {filteredItems.map((item) => (
          <PortfolioItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

export const tabs: TabGroup<PortfolioTab>[] = [
  {
    label: "All",
    component: <TabComponent tab="All" />,
  },
  {
    label: "Web-Application",
    component: <TabComponent tab="Web-Application" />,
  },
  {
    label: "Photoshop",
    component: <TabComponent tab="Photoshop" />,
  },
  {
    label: "E-commerce",
    component: <TabComponent tab="E-commerce" />,
  },
  {
    label: "Mobile-App",
    component: <TabComponent tab="Mobile-App" />,
  },
];
const Portfolio: React.FC = () => {

  return (
    <section className={styles.section}>
      <CustomTabs tabs={tabs} className={styles.customTabs}/>
    </section>
  );
};

export default Portfolio;
