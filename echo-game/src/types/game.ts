// --- Configuration personnage ---
export type Gender = "female" | "male" | "nonbinary";

export interface CharacterConfig {
  friendName: string;
  friendGender: Gender;
  partnerName: string;
  partnerGender: Gender;
  playerName: string;
}

// --- Système de dialogue ---
export interface DialogueNode {
  id: string;
  type: "incoming" | "outgoing_choice" | "pause" | "photo" | "status" | "narration" | "silence";
  content?: string;
  delay?: number;
  choices?: DialogueChoice[];
  timerSeconds?: number;
  next?: string;
  condition?: GameCondition;
}

export interface DialogueChoice {
  id: string;
  label: string;
  fullText: string;
  effect: ChoiceEffect;
  next: string;
}

export interface ChoiceEffect {
  trust?: number;
  awareness?: number;
  flag?: string;
}

export interface GameCondition {
  minTrust?: number;
  maxTrust?: number;
  minAwareness?: number;
  requiredFlag?: string;
  excludeFlag?: string;
}

// --- État global ---
export interface GameState {
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
}

export interface RenderedMessage {
  id: string;
  sender: "friend" | "player" | "system";
  content: string;
  timestamp: string;
  type: "text" | "photo" | "status" | "narration";
}

export interface JournalEntry {
  chapter: number;
  nodeId: string;
  choiceId: string;
  annotation: string;
  isKeyMoment: boolean;
}

// --- Debriefing ---
export interface DebriefContent {
  chapter: number;
  title: string;
  paragraphs: string[];
  keyInsight: string;
  resourceLinks?: ResourceLink[];
}

export interface ResourceLink {
  label: string;
  url: string;
  description: string;
}
