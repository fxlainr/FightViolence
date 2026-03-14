import { motion } from "framer-motion";
import type { DialogueChoice } from "../../types/game";

interface Props {
  choices: DialogueChoice[];
  onChoose: (choice: DialogueChoice) => void;
  disabled?: boolean;
}

export function ChoiceSelector({ choices, onChoose, disabled }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 px-4 py-3"
    >
      {choices.map((choice, index) => (
        <motion.button
          key={choice.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => !disabled && onChoose(choice)}
          disabled={disabled}
          className="text-left px-4 py-3 rounded-2xl rounded-br-sm text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "white",
          }}
        >
          {choice.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
