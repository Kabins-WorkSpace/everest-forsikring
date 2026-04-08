"use client";

import { motion } from "framer-motion";

const accentDots = [
  { top: "10%", left: "50%" },
  { top: "24%", left: "82%" },
  { top: "50%", left: "90%" },
  { top: "78%", left: "78%" },
  { top: "90%", left: "50%" },
  { top: "78%", left: "22%" },
  { top: "50%", left: "10%" },
  { top: "24%", left: "18%" },
];

export function PurchaseCompletion() {
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-primary-varde"
      />

      {accentDots.map((dot, index) => (
        <motion.span
          key={`${dot.top}-${dot.left}`}
          className="absolute h-2 w-2 rounded-full bg-primary-varde"
          style={{
            top: dot.top,
            left: dot.left,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 1, 0.75], scale: [0.6, 1, 1, 1] }}
          transition={{
            duration: 0.8,
            delay: 0.2 + index * 0.05,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary-granite text-primary-white shadow-sm"
      >
        <motion.svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.path
            d="M5 12.5L10 17L19 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
