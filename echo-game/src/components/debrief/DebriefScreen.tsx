import { motion } from "framer-motion";
import type { DebriefContent } from "../../types/game";
import { debrief1 } from "../../data/debrief/debrief1";
import { debrief2 } from "../../data/debrief/debrief2";
import { debrief3 } from "../../data/debrief/debrief3";
import { debrief4 } from "../../data/debrief/debrief4";
import { debrief5 } from "../../data/debrief/debrief5";

const debriefs: Record<number, DebriefContent> = {
  1: debrief1,
  2: debrief2,
  3: debrief3,
  4: debrief4,
  5: debrief5,
};

interface Props {
  chapter: number;
  onContinue: () => void;
  isFinalChapter?: boolean;
}

export function DebriefScreen({ chapter, onContinue, isFinalChapter }: Props) {
  const debrief = debriefs[chapter];
  if (!debrief) return null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6 overflow-y-auto"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full py-8"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          Chapitre {chapter} — Debrief
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          {debrief.title}
        </motion.h2>

        <div className="space-y-4 mb-8">
          {debrief.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--color-accent)" }}>
            Point clé
          </p>
          <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            {debrief.keyInsight}
          </p>
        </motion.div>

        {debrief.resourceLinks && debrief.resourceLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-8"
          >
            <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "var(--color-text-secondary)" }}>
              Ressources
            </p>
            <div className="space-y-2">
              {debrief.resourceLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}
                >
                  <span className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                    {link.label}
                  </span>
                  <span className="block text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                    {link.description}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={onContinue}
          className="w-full py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {isFinalChapter ? "Terminer" : "Chapitre suivant"}
        </motion.button>
      </motion.div>
    </div>
  );
}
