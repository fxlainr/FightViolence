import { motion } from "framer-motion";

interface Props {
  text: string;
  onComplete?: () => void;
}

export function TransitionScreen({ text }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 flex items-center justify-center p-8"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-light text-center leading-relaxed"
        style={{ color: "var(--color-text-primary)" }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
