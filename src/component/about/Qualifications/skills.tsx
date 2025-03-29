import React from "react";
import Timeline from "../../Timeline/Timeline";
import { skillsData } from "Pages/about/data";

const Skills: React.FC = () => {
  return (
    <div className="skills tab-content active">
      <div className="row">
        <Timeline items={skillsData} alternate={true} tab="Skills" />
      </div>
    </div>
  );
};

export default Skills;
