import { motion } from "framer-motion";

interface Props {
  annotation: string;
  isKeyMoment: boolean;
  index: number;
}

export function JournalEntry({ annotation, isKeyMoment, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      className="flex gap-3 items-start"
    >
      <div
        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
        style={{
          backgroundColor: isKeyMoment ? "var(--color-timer)" : "var(--color-accent)",
        }}
      />
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {annotation}
      </p>
    </motion.div>
  );
}
