import { useState } from "react";
import {AnimatePresence, motion} from "motion/react";

const items = [
  {
    id: "fresh",
    number: "01",
    title: "Fresh Ingredients",
    content:
      "We source fresh, high-quality ingredients to bring delicious meals and authentic flavors straight to your table.",
  },
  {
    id: "menu",
    number: "02",
    title: "Curated Menu",
    content:
      "Explore a carefully curated selection of meals, snacks, beverages, and desserts made to satisfy every craving.",
  },
  {
    id: "delivery",
    number: "03",
    title: "Fast Delivery",
    content:
      "Order your favorite food online and get it delivered quickly and safely while keeping every meal fresh.",
  },
  {
    id: "quality",
    number: "04",
    title: "Quality & Taste",
    content:
      "From preparation to packaging, we focus on quality, great taste, and reliable service with every order.",
  },
];

function Faq() {
  const [activeId, setActiveId] = useState("fresh");
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="w-full max-w-[1000px] mx-auto py-12">
      <div className="space-y-0">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id}>
              <motion.button
                onClick={() =>
                  setActiveId(isActive ? null : item.id)
                }
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full group relative"
                initial={false}
              >
                <div className="flex items-center gap-6 py-5 px-1">
                  {/* Number with animated circle */}
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-foreground"
                      initial={false}
                      animate={{
                        scale: isActive
                          ? 1
                          : isHovered
                          ? 0.85
                          : 0,
                        opacity: isActive
                          ? 1
                          : isHovered
                          ? 0.1
                          : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />

                    <motion.span
                      className="relative z-10 text-sm font-medium tracking-wide"
                      animate={{
                        color: isActive
                          ? "var(--faq-color)"
                          : "var(--muted-foreground)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.number}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-medium tracking-tight"
                    animate={{
                      x: isActive || isHovered ? 4 : 0,
                      color: isActive
                        ? "var(--foreground)"
                        : isHovered
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Animated indicator */}
                  <div className="ml-auto flex items-center gap-3">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8"
                      animate={{
                        rotate: isActive ? 45 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-foreground"
                        animate={{
                          opacity:
                            isActive || isHovered ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.path
                          d="M8 1V15M1 8H15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={false}
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>

                {/* Base underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-border origin-left"
                  initial={false}
                />

                {/* Active / hover underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-foreground origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isActive
                      ? 1
                      : isHovered
                      ? 0.3
                      : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              </motion.button>

              {/* Content */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        },
                        opacity: {
                          duration: 0.2,
                          delay: 0.1,
                        },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        },
                        opacity: {
                          duration: 0.1,
                        },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="pl-16 pr-12 py-6 text-muted-foreground leading-relaxed"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      {item.content}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;