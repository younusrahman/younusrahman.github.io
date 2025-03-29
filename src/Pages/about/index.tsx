import styles from "./index.module.css";
import { useGlobalState } from "context/GlobalProvider";
import { SocialLinksGroup } from "../../component/about/SocialLinksGroup";
import { AboutContent } from "../../component/about/AboutContent";
import AnimatedHeader from "component/HeaderComponent";

export default function About() {
  const { THEMESELECTOR } = useGlobalState();
  const { color } = THEMESELECTOR;

  return (
    <section className={` ${styles.section}`}>
      <div className={`${styles.container} blurBackground`}>
        <AboutContent color={color} styles={styles}>
          <SocialLinksGroup color={color} styles={styles} />
        </AboutContent>
      </div>
    </section>
  );
}
