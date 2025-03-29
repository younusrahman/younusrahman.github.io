import React from "react";
import styles from "./Timeline.module.css";
import { QualificationsTabType } from "component/about/Qualifications/Qualifications";
import { useGlobalState } from "context/GlobalProvider";

// Base type that all timeline items must have
type TimelineItemBase = {
  id: string;
  title: string;
  icon: React.ComponentType;
  date?: string;
  location?: string;
};

// Union type for all possible timeline item variations
type TimelineItem = TimelineItemBase &
  (
    | {
        groups?: {
          name: string;
          alignment: "left" | "right";
          items: string[];
        }[];
        items?: never;
      }
    | {
        items?: {
          text: string;
          alignment: "left" | "right";
        }[];
        groups?: never;
      }
  );

interface TimelineProps {
  items: TimelineItem[];
  alternate?: boolean;
  tab: QualificationsTabType;
}

const Timeline = ({ items, alternate = true, tab }: TimelineProps) => {
  const {SMALL} = useGlobalState().SCREENSIZE
  return (
    <div className={styles.timeline}>
      <div className={styles.row}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.timelineItem} ${
              alternate && index % 2 === 0 ? styles.odd : styles.even
            }`}
          >
            <div
              className={`${styles.timelineItemInner} ${styles.outerShadow}`}
            >
              <div className={styles.icon}>
                <item.icon />
              </div>

              {item.date && <span className={styles.date}>{item.date}</span>}
              <h3>{item.title}</h3>
              {item.location && (
                <h4 className={styles.location}>{item.location}</h4>
              )}

              {"groups" in item &&
                item.groups?.map((group, groupIndex) => (
                  <div
                    key={`${item.id}-group-${groupIndex}`}
                    className={styles.groupContainer}
                  >
                    <h4
                      className={`${styles.groupName} ${styles[group.alignment]}`}
                    >
                      {group.alignment === "left" && (
                        <span className={styles.bullet}>&#8226;</span>
                      )}
                      {group.name}
                      {group.alignment === "right" && (
                        <span
                          className={styles.bullet}
                        >
                          &#8226;
                        </span>
                      )}
                    </h4>
                    <div
                      className={`${styles.chipContainer} ${styles[group.alignment]}`}
                    >
                      {group.items.map((itemText, itemIndex) => (
                        <span
                          key={`${item.id}-item-${itemIndex}`}
                          className={tab === "Skills" ? styles.chip : undefined}
                        >
                          {itemText}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

              {"items" in item &&
                item.items?.map((detail, detailIndex) => (
                  <div
                    key={`${item.id}-detail-${detailIndex}`}
                    className={`${styles.detailItem} ${styles[detail.alignment]}`}
                  >
                    <span className={styles.bullet}>•</span>
                    {detail.text}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
