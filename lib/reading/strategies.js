/*
  The reading strategies that share one lesson format:
  see how → practise with feedback → test → review.
  Everything that differs between them – wording, the reading step,
  where the results are saved – lives here, so the lesson components
  stay the same for all of them.

  read.timed: show a timer and a target while reading (skimming is about speed;
  close reading and inference are about precision, so they have no clock).
*/
export const STRATEGIES = {
  skimming: {
    id: "skimming",
    name: "Skimming",
    basePath: "/reading/skimming",
    backLabel: "Tilbage til skimming",
    stages: {
      walkthrough: {
        label: "Se hvordan",
        intro:
          "Se, hvordan en god læser får overblik over en tekst uden at gå i detaljer.",
      },
      practice: {
        label: "Øv med hjælp",
        intro:
          "Skim teksten, og svar på spørgsmålet. Du får feedback med det samme og kan få et tip.",
      },
      check: {
        label: "Test dig selv",
        intro:
          "Nye tekster uden tips. Du ser svarene i gennemgangen. Målet er mindst 85 % rigtige.",
      },
      review: { label: "Gennemgang" },
    },
    read: {
      timed: true,
      label: "Hurtig læsning",
      title: "Skim teksten for helheden",
      tips: [
        "Læs første sætning i hvert afsnit.",
        "Spring tal, navne og eksempler over.",
        "Hold øje med ord som »men«, »til gengæld« og »derfor«.",
      ],
      done: "Jeg har skimmet teksten",
    },
    legend: {
      clue: "I teksten er signalordene markeret",
      detail: ", og detaljerne er understreget",
    },
    review: {
      mastered:
        "Flot! Du får overblik over teksten uden at fare vild i detaljerne.",
      practise: "Du er på vej. Se dine fejl nedenfor, og tag lektionen igen.",
      timesVerb: "skimmede",
    },
  },

  naerlaesning: {
    id: "naerlaesning",
    name: "Nærlæsning",
    basePath: "/reading/naerlaesning",
    backLabel: "Tilbage til nærlæsning",
    stages: {
      walkthrough: {
        label: "Se hvordan",
        intro:
          "Se, hvordan en god læser finder det præcise sted i teksten og læser det ord for ord.",
      },
      practice: {
        label: "Øv med hjælp",
        intro:
          "Læs teksten grundigt, og svar på spørgsmålene. Du får feedback med det samme og kan få et tip.",
      },
      check: {
        label: "Test dig selv",
        intro:
          "Nye tekster uden tips. Du ser svarene i gennemgangen. Målet er mindst 85 % rigtige.",
      },
      review: { label: "Gennemgang" },
    },
    read: {
      timed: false,
      label: "Grundig læsning",
      title: "Læs teksten grundigt",
      tips: [
        "Læs hele teksten én gang, så du ved, hvad den handler om.",
        "Til hvert spørgsmål: Find nøgleordet, og find stedet i teksten.",
        "Læs stedet ord for ord – små ord som »ikke«, »kun« og »alle« ændrer meget.",
      ],
      done: "Jeg har læst teksten",
    },
    legend: {
      clue: "I teksten er stedet med svaret markeret",
      detail: ", og det, der kan snyde, er understreget",
    },
    review: {
      mastered:
        "Flot! Du læser præcist og lader dig ikke snyde af ord, der ligner.",
      practise:
        "Du er på vej. Se dine fejl nedenfor – find stedet i teksten, og læs det igen.",
      timesVerb: "læste",
    },
  },

  inferens: {
    id: "inferens",
    name: "Læs mellem linjerne",
    basePath: "/reading/inferens",
    backLabel: "Tilbage til læs mellem linjerne",
    stages: {
      walkthrough: {
        label: "Se hvordan",
        intro:
          "Se, hvordan en god læser samler spor i teksten og forstår det, der ikke står direkte.",
      },
      practice: {
        label: "Øv med hjælp",
        intro:
          "Læs teksten, og svar på spørgsmålene. Du får feedback med det samme og kan få et tip.",
      },
      check: {
        label: "Test dig selv",
        intro:
          "Nye tekster uden tips. Du ser svarene i gennemgangen. Målet er mindst 85 % rigtige.",
      },
      review: { label: "Gennemgang" },
    },
    read: {
      timed: false,
      label: "Grundig læsning",
      title: "Læs teksten, og saml spor",
      tips: [
        "Læg mærke til, hvad folk gør og siger – ikke kun hvad der sker.",
        "Se efter ord, der viser følelser og holdninger.",
        "Dit svar skal kunne begrundes med noget i teksten.",
      ],
      done: "Jeg har læst teksten",
    },
    legend: {
      clue: "I teksten er sporene markeret",
      detail: ", og det, der kan snyde, er understreget",
    },
    review: {
      mastered:
        "Flot! Du forstår det, teksten siger mellem linjerne – og du kan begrunde det.",
      practise:
        "Du er på vej. Se dine fejl nedenfor – hvilke spor i teksten pegede på svaret?",
      timesVerb: "læste",
    },
  },
};

export function getStrategy(id) {
  return STRATEGIES[id];
}
