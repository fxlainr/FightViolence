import { motion } from "framer-motion";
import { hasSave } from "../../utils/saveManager";

interface Props {
  onStart: () => void;
  onContinue: () => void;
}

export function WelcomeScreen({ onStart, onContinue }: Props) {
  const saveExists = hasSave();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-sm w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-6xl font-bold tracking-tight mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          ECHO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Un jeu narratif sur les violences dans les relations
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <button
            onClick={onStart}
            className="w-full py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Nouvelle partie
          </button>

          {saveExists && (
            <button
              onClick={onContinue}
              className="w-full py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
              }}
            >
              Reprendre
            </button>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs mt-6 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Durée : 45 — 90 min (5 chapitres)
        </motion.p>
      </motion.div>
    </div>
  );
}
