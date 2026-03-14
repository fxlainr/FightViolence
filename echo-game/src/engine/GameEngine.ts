import type { DialogueNode } from "../types/game";
import { DialogueRunner } from "./DialogueRunner";
import { chapter1 } from "../data/chapters/chapter1";
import { chapter2 } from "../data/chapters/chapter2";
import { chapter3 } from "../data/chapters/chapter3";
import { chapter4 } from "../data/chapters/chapter4";
import { chapter5 } from "../data/chapters/chapter5";

const chapters: Record<number, DialogueNode[]> = {
  1: chapter1,
  2: chapter2,
  3: chapter3,
  4: chapter4,
  5: chapter5,
};

export function getChapterRunner(chapter: number): DialogueRunner {
  const data = chapters[chapter];
  if (!data) throw new Error(`Chapter ${chapter} not found`);
  return new DialogueRunner(data);
}

export function getFirstNodeId(chapter: number): string {
  return `ch${chapter}_001`;
}

export function getTotalChapters(): number {
  return 5;
}
