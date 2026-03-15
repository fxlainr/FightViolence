import { useEffect, useRef, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "../../stores/gameStore";
import { useDialogue } from "../../hooks/useDialogue";
import { useTimer } from "../../hooks/useTimer";
import { getChapterRunner } from "../../engine/GameEngine";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "../ui/MessageBubble";
import { TypingIndicator } from "../ui/TypingIndicator";
import { ChoiceSelector } from "../ui/ChoiceSelector";
import { TimerBar } from "../ui/TimerBar";

interface Props {
  onChapterEnd: () => void;
}

export function ChatScreen({ onChapterEnd }: Props) {
  const messageHistory = useGameStore((s) => s.messageHistory);
  const currentChapter = useGameStore((s) => s.currentChapter);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runner = useMemo(() => getChapterRunner(currentChapter), [currentChapter]);
  const {
    showTyping,
    currentChoices,
    timerSeconds,
    isChapterEnd,
    processNext,
    makeChoice,
    handleTimerExpire,
  } = useDialogue(runner);

  const timer = useTimer();

  // Start processing on mount
  useEffect(() => {
    const id = setTimeout(() => processNext(), 100);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start timer when timerSeconds changes
  useEffect(() => {
    if (timerSeconds && timerSeconds > 0) {
      timer.start(timerSeconds, handleTimerExpire);
    }
    return () => timer.stop();
  }, [timerSeconds, handleTimerExpire, timer]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageHistory, showTyping, currentChoices]);

  // Handle chapter end
  useEffect(() => {
    if (isChapterEnd) {
      const timeout = setTimeout(onChapterEnd, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isChapterEnd, onChapterEnd]);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "var(--color-bg-chat)" }}>
      <ChatHeader />

      <div ref={scrollRef} className="flex-1 chat-scroll px-4 py-4 space-y-1">
        {messageHistory.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        <AnimatePresence>
          {showTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      <div style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        {timer.isRunning && (
          <TimerBar remaining={timer.remaining} total={timer.totalSeconds} />
        )}

        {currentChoices && currentChoices.length > 0 ? (
          <ChoiceSelector
            choices={currentChoices}
            onChoose={(choice) => {
              timer.stop();
              makeChoice(choice);
            }}
          />
        ) : (
          <div className="px-4 py-3">
            <div
              className="rounded-2xl px-4 py-3 text-sm text-center"
              style={{
                backgroundColor: "var(--color-bg-chat)",
                color: "var(--color-text-secondary)",
              }}
            >
              ...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
