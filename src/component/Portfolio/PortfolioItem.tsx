import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

import PortfolioItemContent from "./PortfolioItemContent";
import styles from "./PortfolioItem.module.css";
import SuperAnimationModal from "component/Modal/ModalComponent";
import { PortfolioItemType } from "context/types";
import { PortfolioTab } from "Pages/portfolio";
import { imagePaths } from "imageLoader";


const PortfolioItem: React.FC<PortfolioItemType<PortfolioTab>> = ({
  imgSrc,
  imgAlt,
  title,
  category,
  screenshots,
  projectBrief,
  date,
  client,
  tools,
  webLink,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className={styles.portfolioItem}
        onClick={() => setIsModalOpen(true)}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4 },
        }}
        whileTap={{
          scale: 0.98,
        }}
      >
        <div className={styles.imageContainer}>
          <motion.img
            src={imagePaths[imgSrc]}
            alt={imgAlt}
            className={styles.thumbnail}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
          />
        </div>
        <div className={styles.titleOverlay}>
          <h3>{title}</h3>
        </div>
      </motion.div>

      {/* Modal with Full Content */}
      <SuperAnimationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        animation={{ type: "scale", duration: 0.3 }}
        overlayAnimation={{ type: "fade", duration: 0.2 }}
      >
        {/* This keeps all your original modal content functionality */}
        <PortfolioItemContent
          category={category}
          title={title}
          screenshots={screenshots}
          projectBrief={projectBrief}
          date={date}
          client={client}
          tools={tools}
          webLink={webLink}
        />
      </SuperAnimationModal>
    </>
  );
};

export default PortfolioItem;
