import type { DialogueNode } from "../types/game";
import { checkCondition } from "./RelationshipModel";

export class DialogueRunner {
  private nodes: Map<string, DialogueNode[]> = new Map();

  constructor(dialogueNodes: DialogueNode[]) {
    // Group nodes by ID to handle conditional duplicates
    for (const node of dialogueNodes) {
      const existing = this.nodes.get(node.id) ?? [];
      existing.push(node);
      this.nodes.set(node.id, existing);
    }
  }

  getNode(
    nodeId: string,
    trust: number,
    awareness: number,
    flags: Set<string>
  ): DialogueNode | null {
    const candidates = this.nodes.get(nodeId);
    if (!candidates) return null;

    // Find the first node whose condition is met (or has no condition)
    for (const node of candidates) {
      if (!node.condition) return node;
      if (checkCondition(node.condition, trust, awareness, flags)) {
        return node;
      }
    }

    // Fallback: return the first unconditional node, or the last candidate
    const unconditional = candidates.find((n) => !n.condition);
    return unconditional ?? candidates[candidates.length - 1] ?? null;
  }

  getNextNodeId(node: DialogueNode): string | null {
    return node.next ?? null;
  }

  hasNode(nodeId: string): boolean {
    return this.nodes.has(nodeId);
  }
}
