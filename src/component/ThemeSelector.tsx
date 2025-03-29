import { useGlobalState, useGlobalDispatch } from "context/GlobalProvider";
import { updateState } from "context/reducer";
import {
  ThemeColor,
  BackgroundImage,
  ThemeSelectorType,
  StateSection,
} from "context/types";
import styles from "./ThemeSelector.module.css";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes: Record<ThemeColor, { backgroundImage: BackgroundImage }> = {
  [ThemeColor.Beige]: { backgroundImage: BackgroundImage.Beige },
  [ThemeColor.Blue]: { backgroundImage: BackgroundImage.Blue },
  [ThemeColor.Green]: { backgroundImage: BackgroundImage.Green },
  [ThemeColor.Orange]: { backgroundImage: BackgroundImage.Orange },
  [ThemeColor.Turquoise]: { backgroundImage: BackgroundImage.Turquoise },
};

interface ThemeSelectorProps {
  mobile?: boolean;
}
export const themeSelectorState: ThemeSelectorType = {
  color: ThemeColor.Orange,
  backgroundImage: BackgroundImage.Orange,
};

const ThemeSelector = ({ mobile = false }: ThemeSelectorProps) => {
  const { THEMESELECTOR } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (color: ThemeColor) => {
    updateState(dispatch, StateSection.THEMESELECTOR, {
      color,
      backgroundImage: themes[color].backgroundImage,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Viewport boundary detection for mobile
  useEffect(() => {
    if (isOpen && mobile && containerRef.current) {
      const options = containerRef.current.querySelector(`.${styles.options}`);
      if (options) {
        const rect = options.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          options.classList.add(styles.rightAligned);
        }
      }
    }
  }, [isOpen, mobile]);

  return (
    <div
      className={`${styles.dropdown} ${mobile ? styles.mobileDropdown : ""}`}
      ref={containerRef}
    >
      <motion.button
        className={styles.selectedButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme color"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={styles.colorCircle}
          style={{ backgroundColor: THEMESELECTOR.color }}
          animate={{
            backgroundColor: THEMESELECTOR.color,
            border: `2px solid ${THEMESELECTOR.color}`,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.options} ${mobile ? styles.mobileOptions : ""}`}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {Object.values(ThemeColor).map((color) => (
              <motion.button
                key={color}
                className={styles.option}
                onClick={() => handleSelect(color)}
                aria-label={`Select ${color} theme`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={styles.colorCircle}
                  style={{ backgroundColor: color }}
                />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;