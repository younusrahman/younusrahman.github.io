import styles from "./index.module.css";
import { Qualifications } from "component/about/Qualifications/Qualifications";
import { hobbiesData } from "../data";


export default function MoreAboutMe() {
  return (
    <section className={`${styles.serviceSection}`}>
      <div className={`${styles.container} `}>
        {hobbiesData.map(
          ({ icon: IconComponent, title, description }, index) => (
            <div key={index} className={`${styles.serviceItem} blurBackground`}>
              <div className={styles.iconContainer}>
                <p className={styles.h3}>{title}</p>
                <IconComponent  />
              </div>

              <div className={styles.description}>
                <p>{description}</p>
              </div>
            </div>
          )
        )}
      </div>

      <Qualifications />
    </section>
  );
}
