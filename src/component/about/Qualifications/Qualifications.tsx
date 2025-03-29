import React from "react";

import  Skills  from "./skills";
import Experience  from "./experience";
import  Education  from "./education";
import { TabGroup } from "context/types";
import CustomTabs from "component/CustomTabs/CustomTabs";

export type QualificationsTabType = "Skills" | "Experience" | "Education";
export const qualificationsTabItems: TabGroup<QualificationsTabType>[] = [
  { label: "Skills", component: <Skills /> },
  { label: "Experience", component: <Experience /> },
  { label: "Education", component: <Education /> },
];

export const Qualifications = () => (
  <section>
    <CustomTabs tabs={qualificationsTabItems} />
  </section>
);
