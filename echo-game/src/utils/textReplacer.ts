import type { CharacterConfig, Gender } from "../types/game";

function getSubjectPronoun(gender: Gender): string {
  switch (gender) {
    case "female": return "elle";
    case "male": return "il";
    case "nonbinary": return "iel";
  }
}

function getObjectPronoun(gender: Gender): string {
  switch (gender) {
    case "female": return "elle";
    case "male": return "lui";
    case "nonbinary": return "ellui";
  }
}

function getPossessivePronoun(gender: Gender): string {
  switch (gender) {
    case "female": return "sa";
    case "male": return "son";
    case "nonbinary": return "son";
  }
}

export function replaceVariables(text: string, config: CharacterConfig): string {
  return text
    .replace(/\{\{FRIEND\}\}/g, config.friendName)
    .replace(/\{\{PARTNER\}\}/g, config.partnerName)
    .replace(/\{\{PLAYER\}\}/g, config.playerName)
    .replace(/\{\{PRONOUN_F_SUBJ\}\}/g, getSubjectPronoun(config.friendGender))
    .replace(/\{\{PRONOUN_F_OBJ\}\}/g, getObjectPronoun(config.friendGender))
    .replace(/\{\{PRONOUN_F_POSS\}\}/g, getPossessivePronoun(config.friendGender))
    .replace(/\{\{PRONOUN_P_SUBJ\}\}/g, getSubjectPronoun(config.partnerGender))
    .replace(/\{\{PRONOUN_P_OBJ\}\}/g, getObjectPronoun(config.partnerGender))
    .replace(/\{\{PRONOUN_P_POSS\}\}/g, getPossessivePronoun(config.partnerGender));
}
