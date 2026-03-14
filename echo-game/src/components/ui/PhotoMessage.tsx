import { motion } from "framer-motion";

interface Props {
  description: string;
  timestamp: string;
}

export function PhotoMessage({ description, timestamp }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-2"
    >
      <div
        className="rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%]"
        style={{ backgroundColor: "var(--color-bubble-incoming)" }}
      >
        <div
          className="w-52 h-36 rounded-lg flex items-center justify-center p-3"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <span className="text-xs text-center italic" style={{ color: "var(--color-text-secondary)" }}>
            {description}
          </span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: "var(--color-text-secondary)" }}>
          {timestamp}
        </p>
      </div>
    </motion.div>
  );
}
