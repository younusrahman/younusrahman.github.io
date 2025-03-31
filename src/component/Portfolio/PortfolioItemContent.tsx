import React, { useState, useEffect, useRef } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMinus,
  FiGrid,
  FiX,
} from "react-icons/fi";
import styles from "./PortfolioItem.module.css";
import { useGlobalState } from "context/GlobalProvider";
import { PortfolioTab } from "Pages/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { imagePaths } from "imageLoader";

interface PortfolioItemContentProps {
  category: PortfolioTab[];
  title: string;
  screenshots: string[];
  projectBrief: string;
  date: string;
  client: string;
  tools: string[];
  webLink: string;
}

const PortfolioItemContent: React.FC<PortfolioItemContentProps> = ({
  category,
  title,
  screenshots,
  projectBrief,
  date,
  client,
  tools,
  webLink,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const { MEDIUM } = useGlobalState().SCREENSIZE;
  const detailsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (showDetails && detailsRef.current) {
    // First scroll to make sure element is in view
    detailsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Then scroll to bottom after expansion animation completes
    const timer = setTimeout(() => {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 400);

    return () => clearTimeout(timer);
  }
}, [showDetails]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screenshots.length <= 1) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screenshots.length, activeImageIndex]);

  useEffect(() => {
    if (showDetails && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [showDetails]);

  const handlePrev = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveImageIndex((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100 },
  };

  const thumbnailVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
    hover: { scale: 1.05 },
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <motion.div
      className={styles["portfolio-popup"]}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles["pp-main"]}>
        {/* Image Container */}
        <div className={styles["pp-img-container"]}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              className={styles["pp-img"]}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={imagePaths[screenshots[activeImageIndex]]}
                alt={`${title} - Screenshot ${activeImageIndex + 1}`}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {screenshots.length > 1 && (
            <>
              <motion.button
                className={styles["pp-prev"]}
                onClick={handlePrev}
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronLeft size={24} />
              </motion.button>
              <motion.button
                className={styles["pp-next"]}
                onClick={handleNext}
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight size={24} />
              </motion.button>
            </>
          )}
        </div>

        {/* Controls */}
        <motion.div
          className={styles["pp-controls"]}
          layout // This will animate layout changes
        >
          <motion.button
            className={styles["pp-project-details-btn"]}
            onClick={toggleDetails}
            aria-expanded={showDetails}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showDetails ? (
              <>
                Hide Details <FiMinus size={16} />
              </>
            ) : (
              <>
                Show Details <FiPlus size={16} />
              </>
            )}
          </motion.button>

          <motion.div
            className={styles["pp-counter"]}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {activeImageIndex + 1} / {screenshots.length}
          </motion.div>

          {screenshots.length > 1 && (
            <motion.button
              className={styles["pp-thumbnails-btn"]}
              onClick={() => setShowThumbnails(!showThumbnails)}
              aria-expanded={showThumbnails}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showThumbnails ? (
                <>
                  Hide Thumbnails <FiX size={16} />
                </>
              ) : (
                <>
                  Show Thumbnails <FiGrid size={16} />
                </>
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Thumbnails */}
        <AnimatePresence>
          {showThumbnails && screenshots.length > 1 && (
            <motion.div
              className={styles["pp-thumbnails"]}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {screenshots.map((img, index) => (
                <motion.button
                  key={index}
                  className={`${styles["pp-thumbnail"]} ${
                    index === activeImageIndex ? styles.active : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`View image ${index + 1}`}
                  variants={thumbnailVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={imagePaths[img]}
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details Section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              ref={detailsRef}
              className={`${styles["pp-details"]} ${
                showDetails ? styles.active : ""
              }`}
              id="portfolio-details"
              variants={detailsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles["pp-details-inner"]}>
                <motion.div
                  className={styles["pp-title"]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2>{title}</h2>
                  <p>
                    {!MEDIUM ? (
                      <>
                        {category} -{" "}
                        <span style={{ fontWeight: "bold" }}>Category</span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontWeight: "bold" }}>Category</span> -{" "}
                        {category}
                      </>
                    )}
                  </p>
                </motion.div>

                <motion.div
                  className={styles["portfolio-item-details"]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className={styles["row"]}>
                    <motion.div
                      className={styles["project-brief"]}
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3>Project Brief:</h3>
                      <p>{projectBrief}</p>
                    </motion.div>

                    <motion.div
                      className={styles["project-info"]}
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3>Info</h3>
                      <ul>
                        <li>
                          {date} - <span>Date</span>
                        </li>
                        <li>
                          {client} - <span>Client</span>
                        </li>
                        <li>
                          {tools.join(", ")} - <span>Tools</span>
                        </li>
                        {webLink && (
                          <li>
                            <a
                              href={webLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Website - <span>Link</span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PortfolioItemContent;
