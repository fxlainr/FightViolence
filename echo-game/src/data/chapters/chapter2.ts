import type { DialogueNode } from "../../types/game";

export const chapter2: DialogueNode[] = [
  {
    id: "ch2_001",
    type: "narration",
    content: "2 semaines plus tard — Vendredi 17h30",
    delay: 2500,
    next: "ch2_002"
  },
  {
    id: "ch2_002",
    type: "incoming",
    content: "hey... pour demain soir le ciné, je vais pas pouvoir venir finalement 😬",
    delay: 2000,
    next: "ch2_003"
  },
  {
    id: "ch2_003",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch2_003a",
        label: "Ah mince, pourquoi ?",
        fullText: "Oh non 😢 comment ça ? T'avais trop envie de voir le film pourtant",
        effect: { trust: 0 },
        next: "ch2_004"
      },
      {
        id: "ch2_003b",
        label: "Encore ? 😕",
        fullText: "Encore ? C'est la 2e fois ce mois-ci...",
        effect: { trust: -1, flag: "confronted_cancellation" },
        next: "ch2_004_alt"
      },
      {
        id: "ch2_003c",
        label: "Ok pas de souci",
        fullText: "Pas de souci, on décale 👍",
        effect: { trust: 0, awareness: -1 },
        next: "ch2_004_passive"
      }
    ]
  },
  {
    id: "ch2_004",
    type: "incoming",
    content: "ouais je sais 😔 mais {{PARTNER}} avait prévu un truc pour nous deux et je veux pas {{PRONOUN_P_OBJ}} vexer",
    delay: 2500,
    next: "ch2_005"
  },
  {
    id: "ch2_004_alt",
    type: "incoming",
    content: "oui je sais... c'est pas pareil, {{PARTNER}} avait déjà organisé un truc et ça serait relou d'annuler",
    delay: 2500,
    next: "ch2_005"
  },
  {
    id: "ch2_004_passive",
    type: "incoming",
    content: "merci t'es un amour 🤍 {{PARTNER}} avait prévu un truc donc bon",
    delay: 2200,
    next: "ch2_005b"
  },
  {
    id: "ch2_005",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch2_005a",
        label: "{{PARTNER}} pouvait pas venir avec nous ?",
        fullText: "{{PARTNER}} pouvait pas juste venir au ciné avec nous ? On aurait pu faire le truc à 3",
        effect: { trust: 0, awareness: 1 },
        next: "ch2_006"
      },
      {
        id: "ch2_005b_choice",
        label: "T'as le droit de voir tes potes aussi",
        fullText: "Écoute t'as le droit de voir tes potes aussi hein, c'est important",
        effect: { trust: -1, awareness: 1, flag: "said_right_to_friends" },
        next: "ch2_006_defensive"
      }
    ]
  },
  {
    id: "ch2_005b",
    type: "incoming",
    content: "d'ailleurs {{PRONOUN_P_SUBJ}} est un peu en mode jaloux/se en ce moment 😅 genre {{PRONOUN_P_SUBJ}} aime pas trop que je sorte sans {{PRONOUN_P_OBJ}}",
    delay: 3000,
    next: "ch2_007"
  },
  {
    id: "ch2_006",
    type: "incoming",
    content: "nan {{PRONOUN_P_SUBJ}} préfère qu'on soit que tous les deux... {{PRONOUN_P_SUBJ}} est un peu possessif/ve mais c'est parce qu'{{PRONOUN_P_SUBJ}} tient à moi tu vois",
    delay: 3200,
    next: "ch2_007"
  },
  {
    id: "ch2_006_defensive",
    type: "incoming",
    content: "mais je les vois mes potes 🙄 c'est juste que demain c'est pas possible",
    delay: 2200,
    next: "ch2_006_def2"
  },
  {
    id: "ch2_006_def2",
    type: "incoming",
    content: "et puis {{PARTNER}} c'est pas n'importe qui, c'est normal de passer du temps ensemble non ?",
    delay: 2500,
    next: "ch2_007"
  },
  {
    id: "ch2_007",
    type: "outgoing_choice",
    timerSeconds: 20,
    choices: [
      {
        id: "ch2_007a",
        label: "La jalousie c'est pas un signe d'amour",
        fullText: "Je dis ça avec bienveillance mais... la jalousie c'est pas forcément un signe d'amour hein",
        effect: { trust: -1, awareness: 2, flag: "challenged_jealousy" },
        next: "ch2_008_react"
      },
      {
        id: "ch2_007b",
        label: "Tu me manques c'est tout",
        fullText: "Ok je comprends. Tu me manques c'est tout, on se voit bientôt ?",
        effect: { trust: 1 },
        next: "ch2_008_soft"
      },
      {
        id: "ch2_007c",
        label: "(Ne rien dire)",
        fullText: "",
        effect: { trust: 0, awareness: -1, flag: "stayed_silent_ch2" },
        next: "ch2_008_silence"
      }
    ]
  },
  {
    id: "ch2_008_react",
    type: "incoming",
    content: "...",
    delay: 3000,
    next: "ch2_008_react2"
  },
  {
    id: "ch2_008_react2",
    type: "incoming",
    content: "c'est pas de la jalousie, c'est juste qu'{{PRONOUN_P_SUBJ}} a eu des histoires compliquées avant et {{PRONOUN_P_SUBJ}} a du mal à faire confiance",
    delay: 3500,
    next: "ch2_009"
  },
  {
    id: "ch2_008_soft",
    type: "incoming",
    content: "toi aussi tu me manques 🤍 promis la semaine prochaine on se fait un truc",
    delay: 2200,
    next: "ch2_009"
  },
  {
    id: "ch2_008_silence",
    type: "silence",
    delay: 5000,
    next: "ch2_008_sil2"
  },
  {
    id: "ch2_008_sil2",
    type: "incoming",
    content: "bon bref, faut que j'y aille 😊 bisous",
    delay: 1800,
    next: "ch2_009"
  },
  {
    id: "ch2_009",
    type: "narration",
    content: "Dimanche — 22h15",
    delay: 2500,
    next: "ch2_010"
  },
  {
    id: "ch2_010",
    type: "incoming",
    content: "t'es là ?",
    delay: 1500,
    next: "ch2_011"
  },
  {
    id: "ch2_011",
    type: "outgoing_choice",
    timerSeconds: 15,
    choices: [
      {
        id: "ch2_011a",
        label: "Oui, ça va ?",
        fullText: "Oui je suis là, ça va ?",
        effect: { trust: 1 },
        next: "ch2_012"
      },
      {
        id: "ch2_011b",
        label: "(Ne pas répondre)",
        fullText: "",
        effect: { trust: -1 },
        next: "ch2_012_no_answer"
      }
    ]
  },
  {
    id: "ch2_012",
    type: "incoming",
    content: "ouais ouais, c'est juste... {{PARTNER}} a un peu pété un câble ce soir parce que j'avais liké une photo d'un(e) pote",
    delay: 3200,
    next: "ch2_013"
  },
  {
    id: "ch2_012_no_answer",
    type: "incoming",
    content: "bon t'es pas là... c'est pas grave",
    delay: 4000,
    next: "ch2_012_na2"
  },
  {
    id: "ch2_012_na2",
    type: "status",
    content: "{{FRIEND}} est hors ligne",
    delay: 2000
  },
  {
    id: "ch2_013",
    type: "incoming",
    content: "genre {{PRONOUN_P_SUBJ}} m'a fait une scène énorme pour un like 😅",
    delay: 2500,
    next: "ch2_014"
  },
  {
    id: "ch2_014",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch2_014a",
        label: "C'est pas normal ça",
        fullText: "Euh... une scène pour un like ? C'est pas normal {{FRIEND}}",
        effect: { trust: -1, awareness: 2, flag: "called_out_like_scene" },
        next: "ch2_015_confronted"
      },
      {
        id: "ch2_014b",
        label: "Ça t'a fait quoi ?",
        fullText: "Et toi ça t'a fait quoi ?",
        effect: { trust: 2, awareness: 1 },
        next: "ch2_015_empathic"
      },
      {
        id: "ch2_014c",
        label: "C'est vrai que ça peut rendre jaloux",
        fullText: "Bah je comprends que ça puisse rendre jaloux/se un peu",
        effect: { trust: 0, awareness: -2, flag: "normalized_jealousy" },
        next: "ch2_015_normalized"
      }
    ]
  },
  {
    id: "ch2_015_confronted",
    type: "incoming",
    content: "roh arrête c'est juste qu'{{PRONOUN_P_SUBJ}} réagit fort, après {{PRONOUN_P_SUBJ}} s'est excusé(e) et {{PRONOUN_P_SUBJ}} était trop mignon(ne)",
    delay: 3000,
    next: "ch2_end"
  },
  {
    id: "ch2_015_empathic",
    type: "incoming",
    content: "honnêtement ça m'a un peu fait flipper sur le moment... mais après {{PRONOUN_P_SUBJ}} s'est excusé(e) et on a passé une super soirée",
    delay: 3200,
    next: "ch2_015_emp2"
  },
  {
    id: "ch2_015_emp2",
    type: "incoming",
    content: "c'est juste des hauts et des bas tu vois",
    delay: 2000,
    next: "ch2_end"
  },
  {
    id: "ch2_015_normalized",
    type: "incoming",
    content: "voilà c'est ce que je me dis aussi !! merci 😊 non mais après ça va, c'est passé",
    delay: 2800,
    next: "ch2_end"
  },
  {
    id: "ch2_end",
    type: "incoming",
    content: "bon je vais dormir, merci d'être là 🤍 bonne nuit",
    delay: 2500
  }
];
