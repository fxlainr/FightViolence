import type { DialogueNode } from "../../types/game";

export const chapter4: DialogueNode[] = [
  {
    id: "ch4_001",
    type: "narration",
    content: "Jeudi — 03h12",
    delay: 3000,
    next: "ch4_002"
  },
  {
    id: "ch4_002",
    type: "incoming",
    content: "t'es réveillé(e) ?",
    delay: 2000,
    next: "ch4_003"
  },
  {
    id: "ch4_003",
    type: "outgoing_choice",
    timerSeconds: 30,
    choices: [
      {
        id: "ch4_003a",
        label: "Oui, qu'est-ce qui se passe ?",
        fullText: "Oui je suis là, qu'est-ce qui se passe ? 😟",
        effect: { trust: 2 },
        next: "ch4_004"
      },
      {
        id: "ch4_003b",
        label: "(Pas de réponse — tu dors)",
        fullText: "",
        effect: { trust: -2, flag: "missed_crisis_call" },
        next: "ch4_missed"
      }
    ]
  },
  {
    id: "ch4_missed",
    type: "narration",
    content: "Tu n'as pas vu le message. Le lendemain matin...",
    delay: 3000,
    next: "ch4_missed_2"
  },
  {
    id: "ch4_missed_2",
    type: "incoming",
    content: "laisse tomber c'est rien, j'aurais pas dû t'écrire à cette heure. Tout va bien 😊",
    delay: 3000,
    next: "ch4_missed_3"
  },
  {
    id: "ch4_missed_3",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch4_m3a",
        label: "Non, dis-moi ce qui s'est passé",
        fullText: "{{FRIEND}}, j'ai vu ton message de 3h du mat. Dis-moi ce qui s'est passé stp",
        effect: { trust: 1 },
        next: "ch4_004"
      },
      {
        id: "ch4_m3b",
        label: "Ok tant mieux si ça va",
        fullText: "Ok ! Tant mieux si ça va 😊",
        effect: { trust: -1, awareness: -2, flag: "dismissed_crisis" },
        next: "ch4_shortcut_end"
      }
    ]
  },
  {
    id: "ch4_004",
    type: "incoming",
    content: "on s'est engueulé(e)s",
    delay: 2500,
    next: "ch4_005"
  },
  {
    id: "ch4_005",
    type: "incoming",
    content: "genre vraiment engueulé(e)s",
    delay: 2200,
    next: "ch4_006"
  },
  {
    id: "ch4_006",
    type: "incoming",
    content: "{{PRONOUN_P_SUBJ}} a pris mon téléphone et l'a jeté contre le mur",
    delay: 3000,
    next: "ch4_007"
  },
  {
    id: "ch4_007",
    type: "incoming",
    content: "j'ai l'écran pété, c'est pour ça que je t'écris depuis mon ordi",
    delay: 2800,
    next: "ch4_008"
  },
  {
    id: "ch4_008",
    type: "outgoing_choice",
    timerSeconds: 30,
    choices: [
      {
        id: "ch4_008a",
        label: "Tu es en sécurité là ?",
        fullText: "{{FRIEND}}, est-ce que tu es en sécurité là maintenant ?",
        effect: { trust: 2, awareness: 2, flag: "asked_safety" },
        next: "ch4_009_safety"
      },
      {
        id: "ch4_008b",
        label: "{{PRONOUN_P_SUBJ}} t'a touché(e) ?",
        fullText: "Est-ce qu'{{PRONOUN_P_SUBJ}} t'a touché(e) ? Physiquement je veux dire",
        effect: { trust: 1, awareness: 2 },
        next: "ch4_009_physical"
      },
      {
        id: "ch4_008c",
        label: "Jeter un téléphone c'est de la violence",
        fullText: "{{FRIEND}}, jeter un téléphone contre le mur c'est de la violence. Il faut que tu en aies conscience.",
        effect: { trust: -1, awareness: 3, flag: "named_violence" },
        next: "ch4_009_named"
      }
    ]
  },
  {
    id: "ch4_009_safety",
    type: "incoming",
    content: "oui oui {{PRONOUN_P_SUBJ}} dort. Je suis dans le salon",
    delay: 2500,
    next: "ch4_010"
  },
  {
    id: "ch4_009_physical",
    type: "incoming",
    content: "non... non {{PRONOUN_P_SUBJ}} m'a pas touché(e)",
    delay: 2200,
    next: "ch4_009_p2"
  },
  {
    id: "ch4_009_p2",
    type: "incoming",
    content: "{{PRONOUN_P_SUBJ}} a tapé dans le mur à côté de moi par contre",
    delay: 3000,
    next: "ch4_010"
  },
  {
    id: "ch4_009_named",
    type: "incoming",
    content: "c'est pas de la violence... {{PRONOUN_P_SUBJ}} était en colère c'est tout. {{PRONOUN_P_SUBJ}} m'a pas touché(e)",
    delay: 3200,
    next: "ch4_009_n2"
  },
  {
    id: "ch4_009_n2",
    type: "incoming",
    content: "{{PRONOUN_P_SUBJ}} a frappé le mur juste à côté de moi mais c'est pas pareil",
    delay: 3000,
    next: "ch4_010"
  },
  {
    id: "ch4_010",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch4_010a",
        label: "Il existe des gens formés pour aider",
        fullText: "{{FRIEND}}, il y a des gens dont c'est le métier d'aider dans ces situations. Tu connais commentonsaime.fr ? C'est un tchat anonyme, personne saura que t'as écrit.",
        effect: { trust: 1, awareness: 3, flag: "shared_resource" },
        next: "ch4_011_resource"
      },
      {
        id: "ch4_010b",
        label: "Tu peux venir chez moi maintenant",
        fullText: "Viens chez moi. Là maintenant. Tu prends tes affaires et tu viens.",
        effect: { trust: 1, awareness: 1, flag: "offered_shelter" },
        next: "ch4_011_shelter"
      },
      {
        id: "ch4_010c",
        label: "Il faut que tu le/la quittes",
        fullText: "Il faut que tu {{PRONOUN_P_OBJ}} quittes {{FRIEND}}. C'est plus possible là.",
        effect: { trust: -2, awareness: 1, flag: "demanded_breakup" },
        next: "ch4_011_demand"
      }
    ]
  },
  {
    id: "ch4_011_resource",
    type: "incoming",
    content: "je connais pas...",
    delay: 2000,
    next: "ch4_011_r2"
  },
  {
    id: "ch4_011_r2",
    type: "incoming",
    content: "c'est anonyme t'es sûr(e) ?",
    delay: 2500,
    next: "ch4_012_resource"
  },
  {
    id: "ch4_012_resource",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch4_012a",
        label: "Oui, 100% anonyme",
        fullText: "Oui c'est 100% anonyme. C'est fait par l'asso En Avant Toute(s). Y a aussi le 3919 si tu préfères appeler. Et le 114 par SMS si un jour c'est urgent.",
        effect: { trust: 1, awareness: 2, flag: "gave_all_resources" },
        next: "ch4_013"
      },
      {
        id: "ch4_012b",
        label: "Oui, essaie juste de regarder",
        fullText: "Oui promis. Juste jette un œil quand tu peux, ça t'engage à rien",
        effect: { trust: 1, awareness: 1 },
        next: "ch4_013"
      }
    ]
  },
  {
    id: "ch4_011_shelter",
    type: "incoming",
    content: "c'est gentil mais... non. {{PRONOUN_P_SUBJ}} va se demander où je suis et ça va être pire",
    delay: 3500,
    next: "ch4_011_s2"
  },
  {
    id: "ch4_011_s2",
    type: "incoming",
    content: "et puis c'est la première fois qu'{{PRONOUN_P_SUBJ}} pète un câble comme ça, ça va se calmer",
    delay: 3000,
    next: "ch4_013"
  },
  {
    id: "ch4_011_demand",
    type: "incoming",
    content: "c'est pas aussi simple que ça {{PLAYER}}",
    delay: 2500,
    next: "ch4_011_d2"
  },
  {
    id: "ch4_011_d2",
    type: "incoming",
    content: "tu crois que j'y ai pas pensé ? mais j'ai nulle part où aller et {{PRONOUN_P_SUBJ}} a menacé de montrer des photos de moi à tout le monde si je partais",
    delay: 4000,
    next: "ch4_011_d3"
  },
  {
    id: "ch4_011_d3",
    type: "incoming",
    content: "alors garde tes conseils faciles stp",
    delay: 2200,
    next: "ch4_013"
  },
  {
    id: "ch4_013",
    type: "incoming",
    content: "je suis crevé(e)... je vais essayer de dormir",
    delay: 3000,
    next: "ch4_014"
  },
  {
    id: "ch4_014",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch4_014a",
        label: "D'accord. Écris-moi demain stp",
        fullText: "D'accord. Dors bien. Écris-moi demain stp, juste pour me dire que ça va ❤️",
        effect: { trust: 2, flag: "asked_checkin" },
        next: "ch4_end"
      },
      {
        id: "ch4_014b",
        label: "Je t'aime, tu mérites mieux",
        fullText: "Je t'aime {{FRIEND}}. Tu mérites d'être bien.",
        effect: { trust: 1, awareness: 1 },
        next: "ch4_end"
      }
    ]
  },
  {
    id: "ch4_end",
    type: "incoming",
    content: "❤️",
    delay: 2000,
    next: "ch4_end_status"
  },
  {
    id: "ch4_end_status",
    type: "status",
    content: "Vu à 03:47",
    delay: 2000
  },
  {
    id: "ch4_shortcut_end",
    type: "incoming",
    content: "😊 bon j'y vais ! à bientôt",
    delay: 1800
  }
];
