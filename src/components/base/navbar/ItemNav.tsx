import type { FC } from "react";
import { motion } from "framer-motion";

interface ItemNavProps {
  text: string;
  isSelected: boolean;
  onHover?: () => void;
}

const ItemNav: FC<ItemNavProps> = ({ text, isSelected, onHover }) => {
  return (
    <motion.div
      layout
      layoutId={text}
      transition={{
        layout: {
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.8,
        },
      }}
      onMouseEnter={!isSelected ? onHover : undefined}
      className="relative cursor-pointer select-none"
    >
      <div
        className={`
          px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150
          ${
            isSelected
              ? "bg-primary text-white shadow-lg"
              : "text-zinc-500 hover:text-zinc-800"
          }
        `}
      >
        {isSelected && (
          <motion.span
            layoutId="selected-pill"
            className="absolute inset-0 rounded-full -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10">{text}</span>

        {/* cheeky little "nope!" tooltip on hover for unselected items */}
        {!isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            whileHover={{ opacity: 1, y: -2, scale: 1 }}
            transition={{ duration: 0.12 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
          >
            nope 👻
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ItemNav;
