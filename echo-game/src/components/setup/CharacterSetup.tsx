import { useState } from "react";
import { motion } from "framer-motion";
import type { Gender, CharacterConfig } from "../../types/game";

interface Props {
  onComplete: (config: CharacterConfig) => void;
}

const genderOptions: { value: Gender; label: string }[] = [
  { value: "female", label: "Féminin" },
  { value: "male", label: "Masculin" },
  { value: "nonbinary", label: "Non-binaire" },
];

export function CharacterSetup({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friendGender, setFriendGender] = useState<Gender>("female");
  const [partnerName, setPartnerName] = useState("");
  const [partnerGender, setPartnerGender] = useState<Gender>("male");

  const handleSubmit = () => {
    if (!playerName.trim() || !friendName.trim() || !partnerName.trim()) return;
    onComplete({
      playerName: playerName.trim(),
      friendName: friendName.trim(),
      friendGender,
      partnerName: partnerName.trim(),
      partnerGender,
    });
  };

  const steps = [
    // Step 0: Player name
    <motion.div key="player" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
        Comment tu t'appelles ?
      </h3>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Ton prénom (ou un pseudo)
      </p>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Ton prénom"
        maxLength={20}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{
          backgroundColor: "var(--color-bg-chat)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-bg-chat)",
        }}
        autoFocus
      />
      <button
        onClick={() => playerName.trim() && setStep(1)}
        disabled={!playerName.trim()}
        className="w-full py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        Suivant
      </button>
    </motion.div>,

    // Step 1: Friend config
    <motion.div key="friend" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
        Ton ami(e)
      </h3>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Choisis le prénom et le genre de la personne que tu vas accompagner
      </p>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="Prénom de ton ami(e)"
        maxLength={20}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{
          backgroundColor: "var(--color-bg-chat)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-bg-chat)",
        }}
        autoFocus
      />
      <div className="flex gap-2">
        {genderOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFriendGender(opt.value)}
            className="flex-1 py-2 rounded-xl text-sm font-medium transition-colors"
            style={{
              backgroundColor: friendGender === opt.value ? "var(--color-accent)" : "var(--color-bg-chat)",
              color: friendGender === opt.value ? "white" : "var(--color-text-secondary)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => friendName.trim() && setStep(2)}
        disabled={!friendName.trim()}
        className="w-full py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        Suivant
      </button>
    </motion.div>,

    // Step 2: Partner config
    <motion.div key="partner" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
        Le/la partenaire
      </h3>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        Choisis le prénom et le genre du/de la partenaire de {friendName}
      </p>
      <input
        type="text"
        value={partnerName}
        onChange={(e) => setPartnerName(e.target.value)}
        placeholder="Prénom du/de la partenaire"
        maxLength={20}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{
          backgroundColor: "var(--color-bg-chat)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-bg-chat)",
        }}
        autoFocus
      />
      <div className="flex gap-2">
        {genderOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setPartnerGender(opt.value)}
            className="flex-1 py-2 rounded-xl text-sm font-medium transition-colors"
            style={{
              backgroundColor: partnerGender === opt.value ? "var(--color-accent)" : "var(--color-bg-chat)",
              color: partnerGender === opt.value ? "white" : "var(--color-text-secondary)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!partnerName.trim()}
        className="w-full py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        Commencer
      </button>
    </motion.div>,
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-sm w-full">
        <div className="flex gap-2 mb-8 justify-center">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className="w-12 h-1 rounded-full transition-colors"
              style={{
                backgroundColor: s <= step ? "var(--color-accent)" : "var(--color-bg-chat)",
              }}
            />
          ))}
        </div>
        {steps[step]}
      </div>
    </div>
  );
}
