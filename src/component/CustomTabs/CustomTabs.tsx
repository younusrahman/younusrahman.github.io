import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./CustomTabs.module.css";
import { TabGroup } from "context/types";

export default function CustomTabs<T extends string>({
  tabs,
  ...rest
}: {
  tabs: TabGroup<T>[];
  [key: string]: any;
}) {
  const [selectedTab, setSelectedTab] = useState(tabs[0].label);

  return (
    <div className={`${styles.tabsContainer}`}>
      <div className={`blurBackground ${styles.tabsWrapper}`}>
        <div className={styles.tabs} {...rest}>
          <motion.div className={styles.tabList}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.label}
                className={`${styles.tab} ${
                  selectedTab === tab.label ? styles.tabSelected : ""
                }`}
                onClick={() => setSelectedTab(tab.label)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={false}
                animate={{
                  backgroundColor:
                    selectedTab === tab.label
                      ? "var(--dynamic-match-bg-img-color)"
                      : "transparent",
                  color: selectedTab === tab.label ? "white" : "inherit",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {tab.label}
                {selectedTab === tab.label && (
                  <motion.div
                    className={styles.tabUnderline}
                    layoutId="tabUnderline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          <div className={styles.tabPanels}>
            <AnimatePresence mode="wait">
              {tabs.map((tab) =>
                selectedTab === tab.label ? (
                  <motion.div
                    key={tab.label}
                    className={styles.tabPanel}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tab.component}
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
