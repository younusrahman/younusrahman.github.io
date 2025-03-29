import React, { useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const element = document.getElementById("outletContainer");
    if (element) {
      element.style.paddingTop = "0";
    }

    return () => {
      document.body.style.overflow = "";
      if (element) {
        element.style.paddingTop = "8rem";
      }
    };
  }, []);
  return (
    <section className={styles.homeMain} style={{ overflow: "hidden" }}>
      <div id="fly-in" className={`blurBackground ${styles.flyIn}`}>
        <div className={styles.divStyle}>
          <span className={styles.spanStyle}>Life is one time offer</span>Use it
          well{" "}
        </div>
        <div className={styles.divStyle}>
          Life is a journey
          <span className={styles.spanStyle}>not a destination</span>
        </div>
        <div className={styles.divStyle}>
          Never give up without a fight
          <span className={styles.spanStyle}></span>
        </div>
        <div className={styles.divStyle}>
          <span className={styles.spanStyle}>First, solve the problem</span>
          Then, write the code
        </div>
        <div className={styles.divStyle}>
          <span className={styles.spanStyle}>Knowledge is power.</span>
          Simplicity is the soul of efficiency.
        </div>
        <div className={styles.divStyle}>
          Before software can be reusable
          <span className={styles.spanStyle}>it first has to be usable</span>
        </div>
        <div className={styles.divStyle}>
          One man’s crappy software is
          <span className={styles.spanStyle}> another man’s full-time job</span>
        </div>
        <div className={styles.divStyle}>
          <span className={styles.spanStyle}>No code has zero defects.</span>
          Deleted code is debugged code
        </div>
      </div>
    </section>
  );
}
