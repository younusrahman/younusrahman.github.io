import { experienceData } from "Pages/about/data";
import Timeline from "../../Timeline/Timeline";

const Experience: React.FC = () => {
  return (
    <div className="experience tab-content">
      <div className="row">
        <Timeline items={experienceData} alternate={true} tab="Experience" />
      </div>
    </div>
  );
};

export default Experience;
