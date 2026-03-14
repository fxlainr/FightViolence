import { motion } from "framer-motion";

interface Props {
  remaining: number;
  total: number;
}

export function TimerBar({ remaining, total }: Props) {
  const fraction = total > 0 ? remaining / total : 0;
  const isUrgent = fraction < 0.3;

  return (
    <div className="px-4 py-2">
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: isUrgent ? "var(--color-timer-urgent)" : "var(--color-timer)",
            width: `${fraction * 100}%`,
          }}
          animate={isUrgent ? { opacity: [1, 0.5, 1] } : {}}
          transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
        />
      </div>
      <p className="text-[10px] text-right mt-1" style={{ color: "var(--color-text-secondary)" }}>
        {Math.ceil(remaining)}s
      </p>
    </div>
  );
}
