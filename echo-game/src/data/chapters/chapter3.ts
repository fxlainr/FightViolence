import type { DialogueNode } from "../../types/game";

export const chapter3: DialogueNode[] = [
  {
    id: "ch3_001",
    type: "narration",
    content: "1 mois plus tard — Mercredi 14h20",
    delay: 2500,
    next: "ch3_002"
  },
  {
    id: "ch3_002",
    type: "incoming",
    content: "hey",
    delay: 1500,
    next: "ch3_003"
  },
  {
    id: "ch3_003",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_003a",
        label: "Salut ! Comment ça va ?",
        fullText: "Hey ! Ça fait un bail, ça va toi ?",
        effect: { trust: 0 },
        next: "ch3_004"
      },
      {
        id: "ch3_003b",
        label: "Ah t'es vivant(e) ! 😄",
        fullText: "Oh t'es vivant(e) toi ! Ça fait 2 semaines que j'ai pas de nouvelles 😄",
        effect: { trust: -1 },
        next: "ch3_004_guilt"
      }
    ]
  },
  {
    id: "ch3_004",
    type: "incoming",
    content: "ouais désolé(e) j'ai été pas mal occupé(e)...",
    delay: 2000,
    next: "ch3_005"
  },
  {
    id: "ch3_004_guilt",
    type: "incoming",
    content: "ouais pardon... j'ai pas trop eu le temps",
    delay: 2200,
    next: "ch3_005"
  },

  // --- BRANCHE HAUTE CONFIANCE (trust >= 55) ---
  {
    id: "ch3_005",
    type: "incoming",
    content: "en vrai... je peux te dire un truc ?",
    delay: 2500,
    condition: { minTrust: 55 },
    next: "ch3_006_high"
  },
  {
    id: "ch3_006_high",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_006a",
        label: "Bien sûr, je t'écoute",
        fullText: "Toujours. Dis-moi",
        effect: { trust: 1 },
        next: "ch3_007_high"
      },
      {
        id: "ch3_006b",
        label: "C'est {{PARTNER}} ?",
        fullText: "Ça concerne {{PARTNER}} ?",
        effect: { trust: 0 },
        next: "ch3_007_high"
      }
    ]
  },
  {
    id: "ch3_007_high",
    type: "incoming",
    content: "{{PARTNER}} veut que je {{PRONOUN_P_OBJ}} donne mes mots de passe. Insta, Snap, tout.",
    delay: 3000,
    next: "ch3_008_high"
  },
  {
    id: "ch3_008_high",
    type: "incoming",
    content: "{{PRONOUN_P_SUBJ}} dit que si j'ai rien à cacher ça devrait pas poser de problème",
    delay: 2800,
    next: "ch3_009_high"
  },
  {
    id: "ch3_009_high",
    type: "outgoing_choice",
    timerSeconds: 25,
    choices: [
      {
        id: "ch3_009a",
        label: "T'as pas à donner tes mdp",
        fullText: "Non mais {{FRIEND}}, t'as pas à donner tes mots de passe à qui que ce soit. C'est ton espace perso.",
        effect: { trust: 0, awareness: 2, flag: "defended_privacy" },
        next: "ch3_010_high_pushback"
      },
      {
        id: "ch3_009b",
        label: "Et toi t'en penses quoi ?",
        fullText: "Et toi, t'en penses quoi ? Ça te met à l'aise ?",
        effect: { trust: 2, awareness: 2, flag: "asked_feelings" },
        next: "ch3_010_high_reflect"
      },
      {
        id: "ch3_009c",
        label: "Bah si t'as rien à cacher...",
        fullText: "Bah c'est vrai que si t'as rien à cacher... enfin je sais pas",
        effect: { trust: 0, awareness: -2, flag: "agreed_passwords" },
        next: "ch3_010_high_normalized"
      }
    ]
  },
  {
    id: "ch3_010_high_pushback",
    type: "incoming",
    content: "ouais mais {{PRONOUN_P_SUBJ}} {{PRONOUN_P_OBJ}} m'a donné les siens...",
    delay: 2500,
    next: "ch3_010_hp2"
  },
  {
    id: "ch3_010_hp2",
    type: "incoming",
    content: "j'ai l'impression que si je refuse ça va être la guerre",
    delay: 2800,
    next: "ch3_011_high"
  },
  {
    id: "ch3_010_high_reflect",
    type: "incoming",
    content: "honnêtement... non. Ça me met pas à l'aise. Mais si je dis non {{PRONOUN_P_SUBJ}} va péter un plomb",
    delay: 3200,
    next: "ch3_011_high"
  },
  {
    id: "ch3_010_high_normalized",
    type: "incoming",
    content: "ouais t'as raison. En plus {{PRONOUN_P_SUBJ}} m'a donné les siens donc c'est fair",
    delay: 2500,
    next: "ch3_011_high_sad"
  },
  {
    id: "ch3_011_high",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_011a",
        label: "Avoir peur de la réaction, c'est un signe",
        fullText: "Le fait que t'aies peur de sa réaction... c'est pas anodin ça {{FRIEND}}",
        effect: { trust: -1, awareness: 3, flag: "named_fear" },
        next: "ch3_012_high"
      },
      {
        id: "ch3_011b",
        label: "Je serai toujours là pour toi",
        fullText: "Quoi que tu décides, je serai là ok ? T'es pas tout(e) seul(e)",
        effect: { trust: 2, awareness: 1, flag: "unconditional_support" },
        next: "ch3_012_high_warm"
      }
    ]
  },
  {
    id: "ch3_011_high_sad",
    type: "incoming",
    content: "bon bref c'est pas grave, sinon ça va toi ?",
    delay: 2000,
    next: "ch3_change_subject"
  },
  {
    id: "ch3_012_high",
    type: "incoming",
    content: "...",
    delay: 4000,
    next: "ch3_012_h2"
  },
  {
    id: "ch3_012_h2",
    type: "incoming",
    content: "tu crois que c'est grave ?",
    delay: 3000,
    next: "ch3_013"
  },
  {
    id: "ch3_012_high_warm",
    type: "incoming",
    content: "merci 🥺 sérieux ça me fait du bien de parler",
    delay: 2500,
    next: "ch3_013"
  },

  // --- BRANCHE MOYENNE CONFIANCE (trust 30-54) ---
  {
    id: "ch3_005",
    type: "incoming",
    content: "rien de spécial, toi ?",
    delay: 1800,
    condition: { minTrust: 30, maxTrust: 54 },
    next: "ch3_006_mid"
  },
  {
    id: "ch3_006_mid",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_006_mid_a",
        label: "Tu me manques, on se voit quand ?",
        fullText: "Tu me manques sérieux. On se fait un truc bientôt ?",
        effect: { trust: 1 },
        next: "ch3_007_mid"
      },
      {
        id: "ch3_006_mid_b",
        label: "Comment ça va avec {{PARTNER}} ?",
        fullText: "Et sinon avec {{PARTNER}} ça se passe comment ?",
        effect: { trust: -1 },
        next: "ch3_007_mid_direct"
      }
    ]
  },
  {
    id: "ch3_007_mid",
    type: "incoming",
    content: "ouais carrément ! faut que je check avec {{PARTNER}} mais normalement c'est bon",
    delay: 2500,
    next: "ch3_008_mid"
  },
  {
    id: "ch3_007_mid_direct",
    type: "incoming",
    content: "pourquoi ? 🤨",
    delay: 1500,
    next: "ch3_008_mid_wall"
  },
  {
    id: "ch3_008_mid",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_008_mid_a",
        label: "T'as besoin de checker pour voir tes potes ?",
        fullText: "Depuis quand tu \"checkes\" pour voir tes potes ? 😅",
        effect: { trust: -1, awareness: 1 },
        next: "ch3_009_mid"
      },
      {
        id: "ch3_008_mid_b",
        label: "Cool, tiens-moi au courant",
        fullText: "Trop bien, tiens-moi au jus !",
        effect: { trust: 1 },
        next: "ch3_009_mid_light"
      }
    ]
  },
  {
    id: "ch3_008_mid_wall",
    type: "incoming",
    content: "ça va très bien merci 😊 bon faut que je file, on se parle plus tard ?",
    delay: 2200,
    next: "ch3_mid_end"
  },
  {
    id: "ch3_009_mid",
    type: "incoming",
    content: "c'est pas \"checker\" c'est juste de la communication de couple, tu comprendrais si t'étais en couple",
    delay: 3000,
    next: "ch3_009_mid2"
  },
  {
    id: "ch3_009_mid2",
    type: "incoming",
    content: "pardon c'était méchant. Je suis fatigué(e) en ce moment",
    delay: 3500,
    next: "ch3_010_mid"
  },
  {
    id: "ch3_009_mid_light",
    type: "incoming",
    content: "yes ! Ah au fait j'ai arrêté le volley... j'avais plus trop le temps",
    delay: 2500,
    next: "ch3_010_mid_activity"
  },
  {
    id: "ch3_010_mid",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_010_mid_a",
        label: "T'excuse pas, je m'inquiète c'est tout",
        fullText: "Hé, t'excuse pas. Je m'inquiète pour toi c'est tout ❤️",
        effect: { trust: 2, awareness: 1 },
        next: "ch3_011_mid"
      },
      {
        id: "ch3_010_mid_b",
        label: "C'était effectivement méchant",
        fullText: "Ouais c'était un peu gratuit ça",
        effect: { trust: -2 },
        next: "ch3_011_mid_cold"
      }
    ]
  },
  {
    id: "ch3_010_mid_activity",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_010_mid_act_a",
        label: "Le volley ?! Tu adorais ça",
        fullText: "QUOI ? Tu as arrêté le volley ?? Mais tu adorais ça !",
        effect: { trust: 0, awareness: 1, flag: "flagged_dropped_activity" },
        next: "ch3_011_mid_volley"
      },
      {
        id: "ch3_010_mid_act_b",
        label: "Ok, c'est ton choix",
        fullText: "Ah ok, bah si t'avais plus le temps c'est normal",
        effect: { trust: 0, awareness: -1 },
        next: "ch3_mid_end"
      }
    ]
  },
  {
    id: "ch3_011_mid",
    type: "incoming",
    content: "merci... j'ai juste beaucoup de trucs en ce moment. Bon faut que j'y aille bisous 🤍",
    delay: 2800,
    next: "ch3_mid_end"
  },
  {
    id: "ch3_011_mid_cold",
    type: "incoming",
    content: "ok. À plus.",
    delay: 1200,
    next: "ch3_mid_end"
  },
  {
    id: "ch3_011_mid_volley",
    type: "incoming",
    content: "bah oui mais {{PARTNER}} trouve que ça prend trop de temps et en vrai {{PRONOUN_P_SUBJ}} a raison, j'étais jamais dispo le mercredi soir",
    delay: 3500,
    next: "ch3_011_mv2"
  },
  {
    id: "ch3_011_mv2",
    type: "incoming",
    content: "bon je file, à plus ❤️",
    delay: 1800,
    next: "ch3_mid_end"
  },
  {
    id: "ch3_mid_end",
    type: "status",
    content: "{{FRIEND}} est hors ligne",
    delay: 1500
  },

  // --- BRANCHE BASSE CONFIANCE (trust < 30) ---
  {
    id: "ch3_005",
    type: "incoming",
    content: "rien, laisse",
    delay: 1500,
    condition: { maxTrust: 29 },
    next: "ch3_006_low"
  },
  {
    id: "ch3_006_low",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_006_low_a",
        label: "Hé, je suis là si tu veux parler",
        fullText: "{{FRIEND}}, je suis là si t'as besoin ok ? Pas de jugement",
        effect: { trust: 1 },
        next: "ch3_007_low"
      },
      {
        id: "ch3_006_low_b",
        label: "Ok...",
        fullText: "Ok... comme tu veux",
        effect: { trust: 0 },
        next: "ch3_007_low_shut"
      }
    ]
  },
  {
    id: "ch3_007_low",
    type: "silence",
    delay: 6000,
    next: "ch3_008_low"
  },
  {
    id: "ch3_008_low",
    type: "incoming",
    content: "merci",
    delay: 2000,
    next: "ch3_low_end"
  },
  {
    id: "ch3_007_low_shut",
    type: "status",
    content: "{{FRIEND}} est hors ligne",
    delay: 2000,
    next: "ch3_low_end"
  },
  {
    id: "ch3_low_end",
    type: "narration",
    content: "{{FRIEND}} ne t'a plus donné de nouvelles pendant 10 jours.",
    delay: 3000
  },

  // --- NŒUDS COMMUNS ---
  {
    id: "ch3_013",
    type: "incoming",
    content: "bon je dois y aller. Merci d'être là. Sérieux.",
    delay: 2500,
    next: "ch3_change_subject"
  },
  {
    id: "ch3_change_subject",
    type: "outgoing_choice",
    choices: [
      {
        id: "ch3_cs_a",
        label: "Je suis toujours là pour toi ❤️",
        fullText: "Toujours. N'hésite jamais ok ? ❤️",
        effect: { trust: 1 },
        next: "ch3_final"
      },
      {
        id: "ch3_cs_b",
        label: "Parle à quelqu'un de confiance",
        fullText: "Promets-moi juste un truc : si un jour ça va pas, parle à quelqu'un. Moi, ou quelqu'un d'autre en qui t'as confiance.",
        effect: { trust: 0, awareness: 1, flag: "suggested_talk_to_someone" },
        next: "ch3_final"
      }
    ]
  },
  {
    id: "ch3_final",
    type: "incoming",
    content: "💕",
    delay: 1500
  }
];
