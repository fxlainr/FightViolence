import { motion, AnimatePresence } from "framer-motion";
import { helpResources } from "../../data/resources";
import { useGameStore } from "../../stores/gameStore";

export function SOSButton() {
  const { showSOS, toggleSOS } = useGameStore();

  return (
    <>
      <button
        onClick={toggleSOS}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: "var(--color-sos)" }}
        aria-label="Ressources d'aide"
      >
        SOS
      </button>

      <AnimatePresence>
        {showSOS && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            onClick={toggleSOS}
          >
            <div className="absolute inset-0 bg-black/70" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-md w-full rounded-2xl p-6 shadow-2xl"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                Besoin d'aide ?
              </h2>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                Si toi ou quelqu'un que tu connais vit une situation difficile, ces ressources sont là pour aider.
              </p>

              <div className="space-y-3">
                {helpResources.map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl transition-colors"
                    style={{ backgroundColor: "var(--color-bg-chat)" }}
                  >
                    <div className="font-semibold text-sm" style={{ color: "var(--color-accent)" }}>
                      {resource.label}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                      {resource.description}
                    </div>
                  </a>
                ))}
              </div>

              <button
                onClick={toggleSOS}
                className="mt-4 w-full py-2 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "var(--color-bg-chat)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
