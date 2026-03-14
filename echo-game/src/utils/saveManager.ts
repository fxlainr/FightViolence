import type { CharacterConfig, JournalEntry, RenderedMessage } from "../types/game";

const SAVE_KEY = "echo-game-save";

interface SaveData {
  config: CharacterConfig;
  currentChapter: number;
  currentNodeId: string;
  trust: number;
  awareness: number;
  flags: string[];
  messageHistory: RenderedMessage[];
  journalEntries: JournalEntry[];
  startedAt: number;
  completedChapters: number[];
}

export function saveGame(state: {
  config: CharacterConfig;
  currentChapter: number;
  currentNodeId: string;
  trust: number;
  awareness: number;
  flags: Set<string>;
  messageHistory: RenderedMessage[];
  journalEntries: JournalEntry[];
  startedAt: number;
  completedChapters: number[];
}): void {
  const data: SaveData = {
    ...state,
    flags: Array.from(state.flags),
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

export function loadGame(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // ignore
  }
}

export function hasSave(): boolean {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch {
    return false;
  }
}
