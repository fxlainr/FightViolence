import { motion } from "framer-motion";
import type { RenderedMessage } from "../../types/game";

interface Props {
  message: RenderedMessage;
}

export function MessageBubble({ message }: Props) {
  if (message.type === "status") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center py-2"
      >
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{ color: "var(--color-system)", backgroundColor: "var(--color-bg-secondary)" }}
        >
          {message.content}
        </span>
      </motion.div>
    );
  }

  if (message.type === "narration") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center py-4"
      >
        <span
          className="text-sm font-medium italic px-4 py-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {message.content}
        </span>
      </motion.div>
    );
  }

  if (message.type === "photo") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start mb-2"
      >
        <div
          className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[75%]"
          style={{ backgroundColor: "var(--color-bubble-incoming)" }}
        >
          <div
            className="w-48 h-32 rounded-lg flex items-center justify-center text-xs mb-1"
            style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-secondary)" }}
          >
            [ {message.content} ]
          </div>
          <span className="text-[10px]" style={{ color: "var(--color-text-secondary)" }}>
            {message.timestamp}
          </span>
        </div>
      </motion.div>
    );
  }

  const isPlayer = message.sender === "player";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isPlayer ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`rounded-2xl px-4 py-2.5 max-w-[75%] ${
          isPlayer ? "rounded-br-sm" : "rounded-bl-sm"
        }`}
        style={{
          backgroundColor: isPlayer
            ? "var(--color-bubble-outgoing)"
            : "var(--color-bubble-incoming)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
          {message.content}
        </p>
        <p
          className={`text-[10px] mt-1 ${isPlayer ? "text-right" : "text-left"}`}
          style={{ color: "var(--color-text-secondary)" }}
        >
          {message.timestamp}
        </p>
      </div>
    </motion.div>
  );
}
