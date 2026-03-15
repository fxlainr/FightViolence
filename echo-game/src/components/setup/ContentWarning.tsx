import { motion } from "framer-motion";

interface Props {
  onAccept: () => void;
}

export function ContentWarning({ onAccept }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          &#9888;
        </div>

        <h2
          className="text-xl font-bold mb-4"
          style={{ color: "var(--color-text-primary)" }}
        >
          Avertissement
        </h2>

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Ce jeu aborde les violences dans les relations amoureuses : manipulation,
          contrôle, isolement, intimidation. Les situations décrites peuvent faire écho
          à des expériences vécues.
        </p>

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Si tu vis une situation difficile, des ressources sont disponibles à tout
          moment via le bouton <span style={{ color: "var(--color-sos)" }} className="font-bold">SOS</span> en
          haut à droite de l'écran.
        </p>

        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Tu peux quitter le jeu à tout moment. Ta progression est sauvegardée
          automatiquement.
        </p>

        <div
          className="rounded-xl p-4 mb-6 text-left"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Comment ça marche ?
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Tu vas incarner l'ami(e) d'une personne qui vit une relation de couple
            qui devient progressivement toxique. Ton rôle : écouter, réagir et
            accompagner — comme dans une vraie conversation par messages.
          </p>
        </div>

        <button
          onClick={onAccept}
          className="w-full py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          J'ai compris, continuer
        </button>
      </motion.div>
    </div>
  );
}
