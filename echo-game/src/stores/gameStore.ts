import { create } from "zustand";
import type { CharacterConfig, JournalEntry, RenderedMessage } from "../types/game";
import { saveGame, loadGame, clearSave } from "../utils/saveManager";

interface GameStore {
  // State
  config: CharacterConfig | null;
  currentChapter: number;
  currentNodeId: string;
  trust: number;
  awareness: number;
  flags: Set<string>;
  messageHistory: RenderedMessage[];
  journalEntries: JournalEntry[];
  startedAt: number;
  completedChapters: number[];
  isPlaying: boolean;
  showSOS: boolean;

  // Actions
  setConfig: (config: CharacterConfig) => void;
  startGame: () => void;
  setCurrentNode: (nodeId: string) => void;
  setCurrentChapter: (chapter: number) => void;
  addMessage: (message: RenderedMessage) => void;
  applyEffect: (effect: { trust?: number; awareness?: number; flag?: string }) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  completeChapter: (chapter: number) => void;
  toggleSOS: () => void;
  save: () => void;
  loadSave: () => boolean;
  resetGame: () => void;
  clearMessages: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  config: null,
  currentChapter: 1,
  currentNodeId: "ch1_001",
  trust: 60,
  awareness: 10,
  flags: new Set<string>(),
  messageHistory: [],
  journalEntries: [],
  startedAt: 0,
  completedChapters: [],
  isPlaying: false,
  showSOS: false,

  setConfig: (config) => set({ config }),

  startGame: () => set({
    isPlaying: true,
    startedAt: Date.now(),
    currentChapter: 1,
    currentNodeId: "ch1_001",
    trust: 60,
    awareness: 10,
    flags: new Set(),
    messageHistory: [],
    journalEntries: [],
    completedChapters: [],
  }),

  setCurrentNode: (nodeId) => {
    set({ currentNodeId: nodeId });
    get().save();
  },

  setCurrentChapter: (chapter) => {
    set({ currentChapter: chapter, currentNodeId: `ch${chapter}_001` });
    get().save();
  },

  addMessage: (message) => set((state) => ({
    messageHistory: [...state.messageHistory, message],
  })),

  applyEffect: (effect) => set((state) => {
    const newFlags = new Set(state.flags);
    if (effect.flag) newFlags.add(effect.flag);
    return {
      trust: Math.max(0, Math.min(100, state.trust + (effect.trust ?? 0) * 5)),
      awareness: Math.max(0, Math.min(100, state.awareness + (effect.awareness ?? 0) * 5)),
      flags: newFlags,
    };
  }),

  addJournalEntry: (entry) => set((state) => ({
    journalEntries: [...state.journalEntries, entry],
  })),

  completeChapter: (chapter) => set((state) => ({
    completedChapters: [...state.completedChapters, chapter],
  })),

  toggleSOS: () => set((state) => ({ showSOS: !state.showSOS })),

  save: () => {
    const state = get();
    if (!state.config) return;
    saveGame({
      config: state.config,
      currentChapter: state.currentChapter,
      currentNodeId: state.currentNodeId,
      trust: state.trust,
      awareness: state.awareness,
      flags: state.flags,
      messageHistory: state.messageHistory,
      journalEntries: state.journalEntries,
      startedAt: state.startedAt,
      completedChapters: state.completedChapters,
    });
  },

  loadSave: () => {
    const data = loadGame();
    if (!data) return false;
    set({
      config: data.config,
      currentChapter: data.currentChapter,
      currentNodeId: data.currentNodeId,
      trust: data.trust,
      awareness: data.awareness,
      flags: new Set(data.flags),
      messageHistory: data.messageHistory,
      journalEntries: data.journalEntries,
      startedAt: data.startedAt,
      completedChapters: data.completedChapters,
      isPlaying: true,
    });
    return true;
  },

  resetGame: () => {
    clearSave();
    set({
      config: null,
      currentChapter: 1,
      currentNodeId: "ch1_001",
      trust: 60,
      awareness: 10,
      flags: new Set(),
      messageHistory: [],
      journalEntries: [],
      startedAt: 0,
      completedChapters: [],
      isPlaying: false,
    });
  },

  clearMessages: () => set({ messageHistory: [] }),
}));
