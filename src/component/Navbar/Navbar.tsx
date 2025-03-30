import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";
import { useGlobalState } from "context/GlobalProvider";
import {
  MdMenu,
  MdClose,
} from "react-icons/md";
import ThemeSelector from "../ThemeSelector";
import styles from "./navbar.module.css";
import { defaultItems } from "./data";
import { NavItem } from "context/types";



type NavbarProps = {
  items?: NavItem[];
  breakpoint?: number;
};



const ResponsiveNavbar = ({
  items = defaultItems,
  breakpoint = 900,
}: NavbarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const state = useGlobalState();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  if (isMobile) {
    return (
      <MobileNavbar
        items={items}
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        currentColor={state.THEMESELECTOR.color}
      />
    );
  }

  return <DesktopNavbar items={items} />;
};

const DesktopNavbar = ({ items }: { items: NavItem[] }) => {
  const state = useGlobalState();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { pathname } = useLocation();

const activeTab =
  defaultItems.find(
    (item) =>
      item.path === pathname ||
      item.children?.includes(pathname) ||
      (pathname !== "/" && pathname.startsWith(item.path + "/"))
  )?.id || "home";

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.navbarContainer}
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(10px)" }}
        transition={{ duration: 0.5 }}
      >
        <ul className={styles.navbarMenu}>
          {items.map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComponent = isActive ? tab.activeIcon : tab.icon;
            const iconSize = isActive ? tab.activeSize : tab.size;

            return (
              <li
                key={tab.id}
                className={styles.navbarItem}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Link
                  to={tab.path}
                  className={styles.navbarLink}
                  activeProps={{
                    className: `${styles.navbarLink} ${styles.activeLink}`,
                  }}
                >
                  <span className={styles.navbarGroup}>
                    <motion.span className={styles.iconContainer}>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isActive ? "active" : "inactive"}
                          initial={{
                            opacity: 0,
                            rotate: -180, // Start rotated
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            rotate: 0, // End at normal rotation
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            rotate: 180, // Rotate out
                            scale: 0.8,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "backInOut",
                          }}
                        >
                          <IconComponent
                            size={iconSize}
                            className={
                              isActive ? styles.activeIcon : styles.icon
                            }
                          />
                        </motion.span>
                      </AnimatePresence>
                    </motion.span>
                    <motion.span
                      animate={{
                        color: isActive ? state.THEMESELECTOR.color : "inherit",
                        fontWeight: isActive ? 700 : 400,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      {tab.label}
                    </motion.span>
                  </span>

                  {(hoveredTab === tab.id || isActive) && (
                    <motion.div
                      layoutId="navHighlight"
                      className={styles.highlight}
                      initial={false}
                      animate={{
                        backgroundColor: state.THEMESELECTOR.color,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}

          <li className={styles.navbarItem}>
            <ThemeSelector />
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
};

type MobileNavbarProps = {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  currentColor: string;
};

const MobileNavbar = ({
  items,
  isOpen,
  onToggle,
  currentColor,
}: MobileNavbarProps) => {
  const state = useGlobalState();
  const { pathname } = useLocation();

  return (
    <>
      <motion.button
        className={styles.mobileMenuButton}
        onClick={onToggle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MdClose size={28} className={styles.menuIcon} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MdMenu size={28} className={styles.menuIcon} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.menuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
            />

            <div className={styles.propagationMenu}>
              {items.map((item, index) => {
                const isActive = item.path === pathname;
                const IconComponent = isActive ? item.activeIcon : item.icon;
                const iconSize = isActive
                  ? item.activeSize || 28
                  : item.size || 26;

                return (
                  <motion.div
                    key={item.id}
                    className={styles.propagationItem}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    style={{
                      originX: "100%",
                      originY: "100%",
                    }}
                  >
                    <Link
                      to={item.path}
                      className={styles.propagationLink}
                      onClick={onToggle}
                      activeProps={{
                        style: {
                          color: state.THEMESELECTOR.color,
                        },
                      }}
                    >
                      <motion.span
                        className={styles.propagationIconContainer}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={isActive ? "active" : "inactive"}
                            initial={{
                              opacity: 0,
                              rotate: -180,
                              scale: 0.8,
                            }}
                            animate={{
                              opacity: 1,
                              rotate: 0,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              rotate: 180,
                              scale: 0.8,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "backInOut",
                            }}
                          >
                            <IconComponent
                              size={iconSize}
                              className={
                                isActive ? styles.activeIcon : styles.icon
                              }
                            />
                          </motion.span>
                        </AnimatePresence>
                      </motion.span>
                      <motion.span
                        className={styles.propagationLabel}
                        animate={{
                          color: isActive
                            ? state.THEMESELECTOR.color
                            : "inherit",
                          fontWeight: isActive ? 700 : 400,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                        }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                className={styles.themeSelectorContainer}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  delay: 0.1 * items.length,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  originX: "100%",
                  originY: "100%",
                }}
              >
                <ThemeSelector mobile />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveNavbar;
