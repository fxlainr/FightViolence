import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex justify-start mb-2"
    >
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1"
        style={{ backgroundColor: "var(--color-bubble-incoming)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-text-secondary)" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
