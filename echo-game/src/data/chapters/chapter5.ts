import type { DialogueNode } from "../../types/game";

export const chapter5: DialogueNode[] = [
  // --- ROUTER ---
  {
    id: "ch5_001",
    type: "narration",
    content: "3 semaines plus tard — Samedi 16h00",
    delay: 3000,
    next: "ch5_router_a"
  },

  // ===== FIN A : "Merci d'être resté(e)" =====
  // Condition : trust >= 60 ET awareness >= 50
  {
    id: "ch5_router_a",
    type: "incoming",
    content: "hey... faut qu'on parle",
    delay: 2000,
    condition: { minTrust: 60, minAwareness: 50 },
    next: "ch5_a_002"
  },
  {
    id: "ch5_a_002",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_a_002a",
        label: "Je t'écoute",
        fullText: "Je suis là. Dis-moi.",
        effect: { trust: 1 },
        next: "ch5_a_003"
      }
    ]
  },
  {
    id: "ch5_a_003",
    type: "incoming",
    content: "j'ai appelé commentonsaime.fr hier soir",
    delay: 3000,
    condition: { requiredFlag: "shared_resource" },
    next: "ch5_a_004"
  },
  {
    id: "ch5_a_003",
    type: "incoming",
    content: "j'ai parlé à l'infirmière scolaire hier",
    delay: 3000,
    condition: { excludeFlag: "shared_resource" },
    next: "ch5_a_004"
  },
  {
    id: "ch5_a_004",
    type: "incoming",
    content: "et... j'ai pleuré pendant une heure",
    delay: 3000,
    next: "ch5_a_005"
  },
  {
    id: "ch5_a_005",
    type: "incoming",
    content: "mais genre j'ai pleuré de soulagement tu vois ? Quelqu'un m'a enfin dit que c'était pas normal ce que je vivais",
    delay: 4000,
    next: "ch5_a_006"
  },
  {
    id: "ch5_a_006",
    type: "incoming",
    content: "et que c'était pas de ma faute",
    delay: 2500,
    next: "ch5_a_007"
  },
  {
    id: "ch5_a_007",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_a_007a",
        label: "Je suis tellement fier(e) de toi",
        fullText: "{{FRIEND}} je suis tellement fier(e) de toi. C'était courageux.",
        effect: { trust: 2 },
        next: "ch5_a_008"
      },
      {
        id: "ch5_a_007b",
        label: "Et maintenant ?",
        fullText: "C'est énorme ça. Et du coup, c'est quoi la suite ?",
        effect: { trust: 1 },
        next: "ch5_a_008"
      }
    ]
  },
  {
    id: "ch5_a_008",
    type: "incoming",
    content: "je sais pas encore exactement. Mais je sais que je veux que ça change.",
    delay: 3000,
    next: "ch5_a_009"
  },
  {
    id: "ch5_a_009",
    type: "incoming",
    content: "et... merci. D'être resté(e). Même quand je t'ai repoussé(e).",
    delay: 3500,
    next: "ch5_a_010"
  },
  {
    id: "ch5_a_010",
    type: "incoming",
    content: "t'as été la seule personne qui m'a pas lâché(e)",
    delay: 2800,
    next: "ch5_a_011"
  },
  {
    id: "ch5_a_011",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_a_011a",
        label: "Je serai toujours là ❤️",
        fullText: "Je serai toujours là {{FRIEND}}. Toujours. ❤️",
        effect: { trust: 2 },
        next: "ch5_a_end"
      }
    ]
  },
  {
    id: "ch5_a_end",
    type: "incoming",
    content: "❤️ je t'aime",
    delay: 2000
  },

  // ===== FIN B : "C'est compliqué" =====
  // Condition : trust >= 40 ET awareness 30-49
  {
    id: "ch5_router_a",
    type: "incoming",
    content: "salut...",
    delay: 2000,
    condition: { minTrust: 40, minAwareness: 30 },
    next: "ch5_b_002"
  },
  {
    id: "ch5_b_002",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_b_002a",
        label: "Hey, ça va ?",
        fullText: "Hey 🤍 Comment tu vas ?",
        effect: { trust: 0 },
        next: "ch5_b_003"
      }
    ]
  },
  {
    id: "ch5_b_003",
    type: "incoming",
    content: "je sais pas trop honnêtement",
    delay: 2500,
    next: "ch5_b_004"
  },
  {
    id: "ch5_b_004",
    type: "incoming",
    content: "des fois je me dis que t'as raison, que c'est pas normal tout ça",
    delay: 3200,
    next: "ch5_b_005"
  },
  {
    id: "ch5_b_005",
    type: "incoming",
    content: "et des fois je me dis que c'est moi qui exagère, que tous les couples c'est comme ça",
    delay: 3500,
    next: "ch5_b_006"
  },
  {
    id: "ch5_b_006",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_b_006a",
        label: "Tous les couples c'est pas comme ça",
        fullText: "Non, {{FRIEND}}. Tous les couples c'est pas comme ça. Avoir peur de la réaction de l'autre, c'est pas normal.",
        effect: { trust: 0, awareness: 2 },
        next: "ch5_b_007"
      },
      {
        id: "ch5_b_006b",
        label: "Prends le temps qu'il te faut",
        fullText: "T'es pas obligé(e) de tout comprendre maintenant. Prends le temps qu'il te faut. Mais parle à quelqu'un ok ?",
        effect: { trust: 1, awareness: 1 },
        next: "ch5_b_007"
      }
    ]
  },
  {
    id: "ch5_b_007",
    type: "incoming",
    content: "ouais... je vais y réfléchir",
    delay: 2500,
    next: "ch5_b_008"
  },
  {
    id: "ch5_b_008",
    type: "incoming",
    content: "merci d'être patient(e) avec moi",
    delay: 2200,
    next: "ch5_b_009"
  },
  {
    id: "ch5_b_009",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_b_009a",
        label: "Toujours ❤️",
        fullText: "Toujours {{FRIEND}}. Je suis là. ❤️",
        effect: { trust: 1 },
        next: "ch5_b_end"
      }
    ]
  },
  {
    id: "ch5_b_end",
    type: "incoming",
    content: "🤍",
    delay: 2000
  },

  // ===== FIN C : "Tu ne m'as pas écouté(e)" =====
  // Condition : trust < 40 (mais pas catastrophique)
  {
    id: "ch5_router_a",
    type: "incoming",
    content: "{{PLAYER}}",
    delay: 2000,
    condition: { minTrust: 20, maxTrust: 39 },
    next: "ch5_c_002"
  },
  {
    id: "ch5_c_002",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_c_002a",
        label: "Oui ?",
        fullText: "Oui ? Je suis là",
        effect: { trust: 0 },
        next: "ch5_c_003"
      }
    ]
  },
  {
    id: "ch5_c_003",
    type: "incoming",
    content: "j'ai besoin que tu arrêtes de me faire la morale sur {{PARTNER}}",
    delay: 3000,
    next: "ch5_c_004"
  },
  {
    id: "ch5_c_004",
    type: "incoming",
    content: "tu {{PRONOUN_P_OBJ}} connais pas comme moi. Tu vois que le négatif.",
    delay: 2800,
    next: "ch5_c_005"
  },
  {
    id: "ch5_c_005",
    type: "incoming",
    content: "j'ai pas besoin qu'on me dise quoi faire, j'ai besoin qu'on me soutienne",
    delay: 3200,
    next: "ch5_c_006"
  },
  {
    id: "ch5_c_006",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_c_006a",
        label: "Tu as raison, pardon",
        fullText: "T'as raison. Pardon. Je voulais pas te braquer. Je m'inquiète c'est tout mais j'aurais dû mieux écouter.",
        effect: { trust: 2, awareness: 0 },
        next: "ch5_c_007"
      },
      {
        id: "ch5_c_006b",
        label: "Je peux pas regarder sans rien dire",
        fullText: "Je comprends mais je peux pas juste regarder et rien dire quand je vois que ça va pas",
        effect: { trust: -1, awareness: 1 },
        next: "ch5_c_007_cold"
      }
    ]
  },
  {
    id: "ch5_c_007",
    type: "incoming",
    content: "... merci. J'ai besoin d'un peu de temps ok ?",
    delay: 3000,
    next: "ch5_c_008"
  },
  {
    id: "ch5_c_007_cold",
    type: "incoming",
    content: "ok. Je crois qu'on a besoin de prendre un peu de distance toi et moi.",
    delay: 3000,
    next: "ch5_c_008"
  },
  {
    id: "ch5_c_008",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_c_008a",
        label: "Je respecte ça. Je suis là quand tu voudras.",
        fullText: "D'accord. Je respecte ça. Mais sache que je serai toujours là si t'as besoin.",
        effect: { trust: 1 },
        next: "ch5_c_end"
      }
    ]
  },
  {
    id: "ch5_c_end",
    type: "status",
    content: "Vu",
    delay: 3000
  },

  // ===== FIN D : "Le silence" =====
  // Condition : trust < 20
  {
    id: "ch5_router_a",
    type: "narration",
    content: "Tu n'as pas eu de nouvelles de {{FRIEND}} depuis 3 semaines.",
    delay: 4000,
    condition: { maxTrust: 19 },
    next: "ch5_d_002"
  },
  {
    id: "ch5_d_002",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch5_d_002a",
        label: "Envoyer un message",
        fullText: "{{FRIEND}} ? Ça fait longtemps... j'espère que tu vas bien. Je pense à toi. ❤️",
        effect: {},
        next: "ch5_d_003"
      }
    ]
  },
  {
    id: "ch5_d_003",
    type: "status",
    content: "Envoyé",
    delay: 2000,
    next: "ch5_d_004"
  },
  {
    id: "ch5_d_004",
    type: "pause",
    delay: 3000,
    next: "ch5_d_005"
  },
  {
    id: "ch5_d_005",
    type: "status",
    content: "Vu",
    delay: 3000,
    next: "ch5_d_006"
  },
  {
    id: "ch5_d_006",
    type: "pause",
    delay: 5000,
    next: "ch5_d_007"
  },
  {
    id: "ch5_d_007",
    type: "narration",
    content: "Pas de réponse.",
    delay: 4000
  }
];
