import React from "react";
import Timeline from "../../Timeline/Timeline";
import { educationData } from "Pages/about/data";

const Education: React.FC = () => {
  return (
    <div className="education tab-content">
      <div className="row">
        <Timeline
          items={educationData}
          alternate={true}
          tab="Education"
        />
      </div>
    </div>
  );
};

export default Education;
