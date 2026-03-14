import { useState, useCallback, useRef, useEffect } from "react";
import type { DialogueChoice, RenderedMessage } from "../types/game";
import { DialogueRunner } from "../engine/DialogueRunner";
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { config, currentNodeId, trust, awareness, flags, addMessage, applyEffect, setCurrentNode } = useGameStore();

  const addRenderedMessage = useCallback((
    sender: RenderedMessage["sender"],
    content: string,
    type: RenderedMessage["type"] = "text"
  ) => {
    if (!config) return;
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    addMessage({
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      sender,
      content: replaceVariables(content, config),
      timestamp,
      type,
    });
  }, [config, addMessage]);

  const processNode = useCallback((nodeId: string) => {
    if (!runner || !config) return;

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

    switch (node.type) {
      case "incoming": {
        setShowTyping(true);
        timeoutRef.current = setTimeout(() => {
          setShowTyping(false);
          addRenderedMessage("friend", node.content ?? "");
          const nextId = runner.getNextNodeId(node);
          if (nextId) {
            processNode(nextId);
          } else {
            setIsChapterEnd(true);
            setIsProcessing(false);
          }
        }, delay);
        break;
      }

      case "outgoing_choice": {
        setIsProcessing(false);
        const replacedChoices = (node.choices ?? []).map(c => ({
          ...c,
          label: replaceVariables(c.label, config),
          fullText: replaceVariables(c.fullText, config),
        }));
        setCurrentChoices(replacedChoices);
        if (node.timerSeconds) {
          setTimerSeconds(node.timerSeconds);
        }
        break;
      }

      case "pause": {
        timeoutRef.current = setTimeout(() => {
          const nextId = runner.getNextNodeId(node);
          if (nextId) {
            processNode(nextId);
          } else {
            setIsChapterEnd(true);
            setIsProcessing(false);
          }
        }, delay);
        break;
      }

      case "photo": {
        addRenderedMessage("friend", node.content ?? "", "photo");
        const nextId = runner.getNextNodeId(node);
        if (nextId) {
          timeoutRef.current = setTimeout(() => processNode(nextId), 500);
        } else {
          setIsChapterEnd(true);
          setIsProcessing(false);
        }
        break;
      }

      case "status": {
        addRenderedMessage("system", node.content ?? "", "status");
        const nextId = runner.getNextNodeId(node);
        if (nextId) {
          timeoutRef.current = setTimeout(() => processNode(nextId), delay);
        } else {
          setIsChapterEnd(true);
          setIsProcessing(false);
        }
        break;
      }

      case "narration": {
        addRenderedMessage("system", node.content ?? "", "narration");
        const nextId = runner.getNextNodeId(node);
        if (nextId) {
          timeoutRef.current = setTimeout(() => processNode(nextId), delay);
        } else {
          setIsChapterEnd(true);
          setIsProcessing(false);
        }
        break;
      }

      case "silence": {
        setShowTyping(true);
        timeoutRef.current = setTimeout(() => {
          setShowTyping(false);
          const nextId = runner.getNextNodeId(node);
          if (nextId) {
            processNode(nextId);
          } else {
            setIsChapterEnd(true);
            setIsProcessing(false);
          }
        }, delay);
        break;
      }
    }
  }, [runner, config, trust, awareness, flags, addRenderedMessage, setCurrentNode]);

  const processNext = useCallback(() => {
    processNode(currentNodeId);
  }, [processNode, currentNodeId]);

  const makeChoice = useCallback((choice: DialogueChoice) => {
    setCurrentChoices(null);
    setTimerSeconds(null);
    applyEffect(choice.effect);

    if (choice.fullText) {
      addRenderedMessage("player", choice.fullText);
    }

    timeoutRef.current = setTimeout(() => {
      processNode(choice.next);
    }, 500);
  }, [applyEffect, addRenderedMessage, processNode]);

  const handleTimerExpire = useCallback(() => {
    if (currentChoices && currentChoices.length > 0) {
      // Pick the last choice (usually silence/no response)
      const silenceChoice = currentChoices.find(c => c.fullText === "") ?? currentChoices[currentChoices.length - 1];
      makeChoice(silenceChoice);
    }
  }, [currentChoices, makeChoice]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
