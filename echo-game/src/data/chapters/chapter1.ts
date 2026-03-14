import type { DialogueNode } from "../../types/game";

export const chapter1: DialogueNode[] = [
  {
    id: "ch1_001",
    type: "narration",
    content: "Lundi — 18h47",
    delay: 2000,
    next: "ch1_002"
  },
  {
    id: "ch1_002",
    type: "status",
    content: "{{FRIEND}} est en ligne",
    delay: 800,
    next: "ch1_003"
  },
  {
    id: "ch1_003",
    type: "incoming",
    content: "{{PLAYER}} 😭😭😭 faut que je te raconte",
    delay: 1200,
    next: "ch1_004"
  },
  {
    id: "ch1_004",
    type: "incoming",
    content: "tu te souviens la soirée chez Léo samedi ?",
    delay: 2000,
    next: "ch1_005"
  },
  {
    id: "ch1_005",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch1_005a",
        label: "Ouiii raconte !!",
        fullText: "Ouiii raconte tout !! 👀",
        effect: { trust: 1 },
        next: "ch1_006"
      },
      {
        id: "ch1_005b",
        label: "Laquelle ?",
        fullText: "Laquelle de soirée ? j'ai un doute",
        effect: { trust: 0 },
        next: "ch1_006"
      }
    ]
  },
  {
    id: "ch1_006",
    type: "incoming",
    content: "j'ai rencontré quelqu'un 🥹",
    delay: 1500,
    next: "ch1_007"
  },
  {
    id: "ch1_007",
    type: "incoming",
    content: "{{PRONOUN_P_SUBJ}} s'appelle {{PARTNER}}",
    delay: 1800,
    next: "ch1_008"
  },
  {
    id: "ch1_008",
    type: "incoming",
    content: "on a parlé pendant genre toute la soirée, j'te jure on a pas vu le temps passer",
    delay: 2500,
    next: "ch1_009"
  },
  {
    id: "ch1_009",
    type: "incoming",
    content: "et depuis {{PRONOUN_P_SUBJ}} m'envoie des messages trop mignons tous les matins 🌅",
    delay: 2200,
    next: "ch1_010"
  },
  {
    id: "ch1_010",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch1_010a",
        label: "Trop bien pour toi ❤️",
        fullText: "Je suis trop content(e) pour toi ❤️ {{PRONOUN_P_SUBJ}} a l'air cool",
        effect: { trust: 1 },
        next: "ch1_011"
      },
      {
        id: "ch1_010b",
        label: "Tu le/la connais à peine non ?",
        fullText: "C'est cool mais tu {{PRONOUN_P_OBJ}} connais à peine non ? Ça fait genre 3 jours",
        effect: { trust: -1, flag: "skeptical_early" },
        next: "ch1_011_alt"
      },
      {
        id: "ch1_010c",
        label: "Montre les messages 👀",
        fullText: "Fais voir les messages !! 👀",
        effect: { trust: 1 },
        next: "ch1_011"
      }
    ]
  },
  {
    id: "ch1_011",
    type: "incoming",
    content: "non mais c'est ouf, {{PRONOUN_P_SUBJ}} me comprend comme personne",
    delay: 2000,
    next: "ch1_012"
  },
  {
    id: "ch1_011_alt",
    type: "incoming",
    content: "roh t'es relou 😅 non mais sérieux c'est différent cette fois",
    delay: 1800,
    next: "ch1_012"
  },
  {
    id: "ch1_012",
    type: "incoming",
    content: "genre hier {{PRONOUN_P_SUBJ}} est venu(e) me chercher à la sortie des cours sans prévenir, avec un café exactement comme je l'aime",
    delay: 3000,
    next: "ch1_013"
  },
  {
    id: "ch1_013",
    type: "incoming",
    content: "{{PRONOUN_P_SUBJ}} avait retenu de la soirée que je prenais un latte vanille 🥺",
    delay: 2200,
    next: "ch1_014"
  },
  {
    id: "ch1_014",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch1_014a",
        label: "Aww c'est adorable",
        fullText: "Ok c'est adorable je dois avouer 🥺",
        effect: { trust: 1 },
        next: "ch1_015"
      },
      {
        id: "ch1_014b",
        label: "Attends, sans prévenir ?",
        fullText: "Attends, {{PRONOUN_P_SUBJ}} savait où t'avais cours sans que tu lui dises ?",
        effect: { trust: 0, awareness: 1, flag: "noticed_surprise_visit" },
        next: "ch1_015_alt"
      }
    ]
  },
  {
    id: "ch1_015",
    type: "incoming",
    content: "je sais 😍 bon j'y retourne {{PRONOUN_P_SUBJ}} m'appelle, on se voit demain ?",
    delay: 2200,
    next: "ch1_016"
  },
  {
    id: "ch1_015_alt",
    type: "incoming",
    content: "bah je sais pas, enfin c'est mignon non ? {{PRONOUN_P_SUBJ}} a dû regarder mon emploi du temps insta ou un truc",
    delay: 2800,
    next: "ch1_015_alt2"
  },
  {
    id: "ch1_015_alt2",
    type: "incoming",
    content: "bref c'est pas grave lol, bon j'y retourne {{PRONOUN_P_SUBJ}} m'appelle !! à demain 💕",
    delay: 2200,
    next: "ch1_016"
  },
  {
    id: "ch1_016",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch1_016a",
        label: "Oui à demain ! 💕",
        fullText: "Oui grave ! Raconte-moi la suite demain 💕",
        effect: { trust: 1 },
        next: "ch1_end"
      },
      {
        id: "ch1_016b",
        label: "Tu me diras si ça va",
        fullText: "Ok amuse-toi bien ! Et hésite pas si t'as besoin de parler 😊",
        effect: { trust: 1, flag: "offered_support_ch1" },
        next: "ch1_end"
      }
    ]
  },
  {
    id: "ch1_end",
    type: "status",
    content: "{{FRIEND}} est hors ligne",
    delay: 1500
  }
];
