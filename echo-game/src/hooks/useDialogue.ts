import { useState, useCallback, useRef, useEffect } from "react";
import type { DialogueChoice } from "../types/game";
import type { RenderedMessage } from "../types/game";
import type { DialogueRunner } from "../engine/DialogueRunner";
import { useGameStore } from "../stores/gameStore";
import { replaceVariables } from "../utils/textReplacer";

interface UseDialogueReturn {
  isProcessing: boolean;
  showTyping: boolean;
  currentChoices: DialogueChoice[] | null;
  timerSeconds: number | null;
  isChapterEnd: boolean;
  processNext: () => void;
  makeChoice: (choice: DialogueChoice) => void;
  handleTimerExpire: () => void;
}

export function useDialogue(runner: DialogueRunner | null): UseDialogueReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [currentChoices, setCurrentChoices] = useState<DialogueChoice[] | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isChapterEnd, setIsChapterEnd] = useState(false);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const storeRef = useRef(useGameStore.getState());

  // Keep storeRef always up-to-date without causing re-renders
  useEffect(() => {
    const unsub = useGameStore.subscribe((state) => {
      storeRef.current = state;
    });
    return unsub;
  }, []);

  const scheduleTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timeoutsRef.current.delete(id);
      fn();
    }, ms);
    timeoutsRef.current.add(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    for (const id of timeoutsRef.current) {
      clearTimeout(id);
    }
    timeoutsRef.current.clear();
  }, []);

  // Use a ref for processNode so timeouts always call the latest version
  const processNodeRef = useRef<(nodeId: string) => void>(() => {});

  const processNode = useCallback((nodeId: string) => {
    const { config: cfg, trust, awareness, flags, addMessage, setCurrentNode } = storeRef.current;
    if (!runner || !cfg) return;

    const node = runner.getNode(nodeId, trust, awareness, flags);
    if (!node) {
      setIsChapterEnd(true);
      setIsProcessing(false);
      return;
    }

    setCurrentNode(nodeId);
    setIsProcessing(true);
    setCurrentChoices(null);
    setTimerSeconds(null);

    const delay = node.delay ?? 1500;

    const addMsg = (
      sender: RenderedMessage["sender"],
      content: string,
      type: RenderedMessage["type"] = "text"
    ) => {
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      addMessage({
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        sender,
        content: replaceVariables(content, cfg),
        timestamp,
        type,
      });
    };

    const goNext = (nextId: string | null, delayMs: number) => {
      if (nextId) {
        scheduleTimeout(() => processNodeRef.current(nextId), delayMs);
      } else {
        setIsChapterEnd(true);
        setIsProcessing(false);
      }
    };

    switch (node.type) {
      case "incoming": {
        setShowTyping(true);
        scheduleTimeout(() => {
          setShowTyping(false);
          addMsg("friend", node.content ?? "");
          goNext(runner.getNextNodeId(node), 300);
        }, delay);
        break;
      }

      case "outgoing_choice": {
        setIsProcessing(false);
        const replacedChoices = (node.choices ?? []).map(c => ({
          ...c,
          label: replaceVariables(c.label, cfg),
          fullText: replaceVariables(c.fullText, cfg),
        }));
        setCurrentChoices(replacedChoices);
        if (node.timerSeconds) {
          setTimerSeconds(node.timerSeconds);
        }
        break;
      }

      case "pause": {
        scheduleTimeout(() => {
          goNext(runner.getNextNodeId(node), 0);
        }, delay);
        break;
      }

      case "photo": {
        addMsg("friend", node.content ?? "", "photo");
        goNext(runner.getNextNodeId(node), 500);
        break;
      }

      case "status": {
        addMsg("system", node.content ?? "", "status");
        goNext(runner.getNextNodeId(node), delay);
        break;
      }

      case "narration": {
        addMsg("system", node.content ?? "", "narration");
        goNext(runner.getNextNodeId(node), delay);
        break;
      }

      case "silence": {
        setShowTyping(true);
        scheduleTimeout(() => {
          setShowTyping(false);
          goNext(runner.getNextNodeId(node), 0);
        }, delay);
        break;
      }
    }
  }, [runner, scheduleTimeout]);

  // Keep the ref in sync
  processNodeRef.current = processNode;

  const processNext = useCallback(() => {
    const { currentNodeId } = storeRef.current;
    processNode(currentNodeId);
  }, [processNode]);

  const makeChoice = useCallback((choice: DialogueChoice) => {
    setCurrentChoices(null);
    setTimerSeconds(null);
    const { applyEffect, addMessage, config: cfg } = storeRef.current;
    applyEffect(choice.effect);

    if (choice.fullText && cfg) {
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      addMessage({
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        sender: "player",
        content: replaceVariables(choice.fullText, cfg),
        timestamp,
        type: "text",
      });
    }

    scheduleTimeout(() => {
      processNodeRef.current(choice.next);
    }, 500);
  }, [scheduleTimeout]);

  const handleTimerExpire = useCallback(() => {
    if (currentChoices && currentChoices.length > 0) {
      const silenceChoice = currentChoices.find(c => c.fullText === "") ?? currentChoices[currentChoices.length - 1];
      makeChoice(silenceChoice);
    }
  }, [currentChoices, makeChoice]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return {
    isProcessing,
    showTyping,
    currentChoices,
    timerSeconds,
    isChapterEnd,
    processNext,
    makeChoice,
    handleTimerExpire,
  };
}
