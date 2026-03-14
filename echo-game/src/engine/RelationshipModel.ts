import type { GameCondition } from "../types/game";

export function checkCondition(
  condition: GameCondition,
  trust: number,
  awareness: number,
  flags: Set<string>
): boolean {
  if (condition.minTrust !== undefined && trust < condition.minTrust) return false;
  if (condition.maxTrust !== undefined && trust > condition.maxTrust) return false;
  if (condition.minAwareness !== undefined && awareness < condition.minAwareness) return false;
  if (condition.requiredFlag && !flags.has(condition.requiredFlag)) return false;
  if (condition.excludeFlag && flags.has(condition.excludeFlag)) return false;
  return true;
}
