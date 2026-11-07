/*
  English and Russian for the short Danish texts around the lessons:
  titles, section names, the rows of the Husk box and the captions
  under the animation. Keyed by the Danish text itself, so a text
  that is used in several places is translated once.

  Danish example phrases (bilen er rød, en rød cykel …) are not
  translated: they are what the learner should read in Danish.

  helpFor(danish) → { en, ru } or {} when there is no translation.
*/

const texts = {
  // ---------- sections and parts ----------
  "1. grad: grundform": ["Positive: the basic form", "Положительная степень: начальная форма"],
  "2. og 3. grad: gradbøjning": [
    "Comparative and superlative",
    "Сравнительная и превосходная степень",
  ],
  Grundregler: ["Basic rules", "Основные правила"],
  "Endelser og undtagelser": ["Endings and exceptions", "Окончания и исключения"],
  Tegnsætning: ["Punctuation", "Пунктуация"],
  Gradbøjning: ["Degrees of comparison", "Степени сравнения"],
  Sammenligning: ["Comparing", "Сравнение"],
  "Øv én regel ad gangen": ["Practise one rule at a time", "Тренируйте одно правило за раз"],
  "Blandede øvelser": ["Mixed exercises", "Смешанные упражнения"],

  // ---------- lesson titles ----------
  "Hvad er et adjektiv?": ["What is an adjective?", "Что такое прилагательное?"],
  "Grundform: en, et og flertal": [
    "Basic form: en, et and plural",
    "Начальная форма: en, et и множественное число",
  ],
  "Bestemt form: den, det, de": [
    "Definite form: den, det, de",
    "Определённая форма: den, det, de",
  ],
  "Efter min, Peters og denne": ["After min, Peters and denne", "После min, Peters и denne"],
  "Efter er og bliver": ["After er and bliver", "После er и bliver"],
  "Hele skemaet: ental og flertal": [
    "The whole table: singular and plural",
    "Вся таблица: единственное и множественное число",
  ],
  "Adjektiver på -ig og -som": [
    "Adjectives ending in -ig and -som",
    "Прилагательные на -ig и -som",
  ],
  "Adjektiver på -sk og -vis": [
    "Adjectives ending in -sk and -vis",
    "Прилагательные на -sk и -vis",
  ],
  "Adjektiver på -en, -el og -er": [
    "Adjectives ending in -en, -el and -er",
    "Прилагательные на -en, -el и -er",
  ],
  "Aktuel, ideel, kriminel: dobbelt l": [
    "Aktuel, ideel, kriminel: double l",
    "Aktuel, ideel, kriminel: двойная l",
  ],
  "Adjektiver på -t og -et": [
    "Adjectives ending in -t and -et",
    "Прилагательные на -t и -et",
  ],
  "Tillægsform: stjålen, stjålet, stjålne": [
    "Participles: stjålen, stjålet, stjålne",
    "Причастия: stjålen, stjålet, stjålne",
  ],
  "Adjektiver, der ikke ændrer sig": [
    "Adjectives that do not change",
    "Прилагательные, которые не изменяются",
  ],
  "Komma mellem adjektiver": ["Commas between adjectives", "Запятая между прилагательными"],
  "De tre grader": ["The three degrees", "Три степени сравнения"],
  "2. grad: -ere og end": ["Comparative: -ere and end", "Сравнительная степень: -ere и end"],
  "3. grad: -est eller -st": ["Superlative: -est or -st", "Превосходная степень: -est или -st"],
  "Stavning: mm, lækrere, dyrere": [
    "Spelling: mm, lækrere, dyrere",
    "Правописание: mm, lækrere, dyrere",
  ],
  "Mere og mest": ["Mere and mest", "Mere и mest"],
  "Uregelmæssige: god, bedre, bedst": [
    "Irregular: god, bedre, bedst",
    "Неправильные: god, bedre, bedst",
  ],
  "End, lige så … som, ikke så … som": [
    "Comparing: end, lige så … som, ikke så … som",
    "Сравнение: end, lige så … som, ikke så … som",
  ],

  // ---------- mixed exercises ----------
  "Vælg den rigtige form": ["Choose the right form", "Выберите правильную форму"],
  "Find fejlen": ["Find the mistake", "Найдите ошибку"],
  "Gradbøjning: vælg formen": [
    "Degrees: choose the form",
    "Степени сравнения: выберите форму",
  ],
  "Gradbøjning: find fejlen": [
    "Degrees: find the mistake",
    "Степени сравнения: найдите ошибку",
  ],

  // ---------- Husk rows: case — ending ----------
  "foran — en rød bil": ["before the noun — en rød bil", "перед существительным — en rød bil"],
  "efter er — bilen er rød": ["after er — bilen er rød", "после er — bilen er rød"],
  "testen — at være …": ["the test — at være …", "проверка — at være …"],
  "en-ord — ingen endelse": ["en-word — no ending", "слово с en — без окончания"],
  "et-ord — + t": ["et-word — + t", "слово с et — + t"],
  "flertal — + e": ["plural — + e", "множественное число — + e"],
  "ejefald -s — + e": ["genitive -s — + e", "родительный падеж на -s — + e"],
  "et-ord, ental — + t": ["et-word, singular — + t", "слово с et, ед. число — + t"],
  "alle andre — + e": ["all other forms — + e", "все остальные формы — + e"],
  "-sk, -vis — intet -t": ["-sk, -vis — no -t", "-sk, -vis — без -t"],
  "ellers — + e": ["otherwise — + e", "в остальных случаях — + e"],
  "+ e — e'et forsvinder": ["+ e — the e disappears", "+ e — e исчезает"],
  "+ t — ingen ændring": ["+ t — no change", "+ t — без изменений"],
  "+ t — ét l": ["+ t — one l", "+ t — одна l"],
  "-t — intet ekstra -t": ["-t — no extra -t", "-t — без второго -t"],
  "-ne / -ende — sket / sker nu": [
    "-ne / -ende — has happened / is happening now",
    "-ne / -ende — уже произошло / происходит сейчас",
  ],
  "aldrig ændring — -e, -ende, stakkels": [
    "never changes — -e, -ende, stakkels",
    "никогда не изменяется — -e, -ende, stakkels",
  ],
  "blå, grå — kun -t": ["blå, grå — only -t", "blå, grå — только -t"],
  "ny, fri — ét t": ["ny, fri — one t", "ny, fri — одна t"],
  "lille — små i flertal": ["lille — små in the plural", "lille — små во множественном числе"],
  "og passer — komma": ["og fits — comma", "можно вставить og — запятая"],
  "og passer ikke — intet komma": ["og does not fit — no comma", "og не подходит — без запятой"],
  "2. grad — + ere": ["comparative — + ere", "сравнительная степень — + ere"],
  "3. grad — + est": ["superlative — + est", "превосходная степень — + est"],
  "sammenlign — + end": ["comparing — + end", "сравнение — + end"],
  "bøjes ikke — ingen -t, -e": ["does not change — no -t, -e", "не изменяется — без -t и -e"],
  "de fleste — + est": ["most adjectives — + est", "большинство прилагательных — + est"],
  "kort vokal — dobbelt konsonant": [
    "short vowel — double consonant",
    "краткая гласная — двойная согласная",
  ],
  "-en, -el, -er — e forsvinder": ["-en, -el, -er — the e disappears", "-en, -el, -er — e исчезает"],
  "2. grad — mere": ["comparative — mere", "сравнительная степень — mere"],
  "3. grad — mest": ["superlative — mest", "превосходная степень — mest"],
  "forskellige — 2. grad + end": [
    "different — comparative + end",
    "разные — сравнительная степень + end",
  ],
  "ens — lige så … som": ["the same — lige så … som", "одинаковые — lige så … som"],
  "mindre — ikke så … som": ["less — ikke så … som", "меньше — ikke så … som"],

  // ---------- captions under the animation ----------
  "Adjektivet kommer på plads": ["The adjective moves into place", "Прилагательное встаёт на место"],
  "Testen: at være …": ["The test: at være …", "Проверка: at være …"],
  "Adjektivet står foran navneordet": [
    "The adjective stands before the noun",
    "Прилагательное стоит перед существительным",
  ],
  "den / det / de kommer foran, og navneordet mister endelsen": [
    "den / det / de comes in front, and the noun loses its ending",
    "Впереди появляется den / det / de, а существительное теряет окончание",
  ],
  "Adjektivet står mellem ordet og navneordet": [
    "The adjective stands between that word and the noun",
    "Прилагательное стоит между этим словом и существительным",
  ],
  "Ejefald: Peters bil (-s viser, hvem der ejer)": [
    "Genitive: Peters bil (-s shows who owns it)",
    "Родительный падеж: Peters bil (-s показывает, чьё это)",
  ],
  "Adjektivet står efter verbet": [
    "The adjective stands after the verb",
    "Прилагательное стоит после глагола",
  ],
  "Det nye adjektiv kommer foran": [
    "The new adjective comes in front",
    "Новое прилагательное встаёт впереди",
  ],
  "Endelsen kommer på": ["The ending is added", "Добавляется окончание"],
  "Vi sammenligner med en anden bil: 2. grad": [
    "We compare with another car: comparative",
    "Сравниваем с другой машиной: сравнительная степень",
  ],
  "Bilen er nummer ét af alle: 3. grad": [
    "The car is number one of all: superlative",
    "Машина на первом месте среди всех: превосходная степень",
  ],
  "Vi bruger 3. grad foran navneordet": [
    "We use the superlative before the noun",
    "Используем превосходную степень перед существительным",
  ],
  "den kommer foran, og navneordet mister endelsen": [
    "den comes in front, and the noun loses its ending",
    "Впереди появляется den, а существительное теряет окончание",
  ],
  "det kommer foran, og navneordet mister endelsen": [
    "det comes in front, and the noun loses its ending",
    "Впереди появляется det, а существительное теряет окончание",
  ],
  "Vi sammenligner Ole med Peter": ["We compare Ole with Peter", "Сравниваем Ole с Peter"],
  "Vi sammenligner med end": ["We compare using end", "Сравниваем с помощью end"],
  "Ole er nummer ét: 3. grad": ["Ole is number one: superlative", "Ole на первом месте: превосходная степень"],
  "Lejligheden er nummer ét: 3. grad": [
    "The flat is number one: superlative",
    "Квартира на первом месте: превосходная степень",
  ],
  "Vi sammenligner: 2. grad": ["We compare: comparative", "Сравниваем: сравнительная степень"],
  "mere eller mest står foran adjektivet": [
    "mere or mest stands before the adjective",
    "mere или mest стоит перед прилагательным",
  ],
  "Vi sammenligner: 2. grad med mere": [
    "We compare: comparative with mere",
    "Сравниваем: сравнительная степень с mere",
  ],
  "Nummer ét: 3. grad med mest": [
    "Number one: superlative with mest",
    "На первом месте: превосходная степень с mest",
  ],
  "Vi bruger mest foran navneordet": [
    "We use mest before the noun",
    "Используем mest перед существительным",
  ],
  "den og mest kommer foran": ["den and mest come in front", "Впереди появляются den и mest"],
  "Ordet skifter form": ["The word changes its form", "Слово меняет форму"],
  "Ordene kommer på plads": ["The words move into place", "Слова встают на место"],
  "Vi sammenligner bilen med cyklen": [
    "We compare the car with the bike",
    "Сравниваем машину с велосипедом",
  ],
  "end kommer efter adjektivet": ["end comes after the adjective", "end стоит после прилагательного"],
  "Ole og Peter er ens": ["Ole and Peter are the same", "Ole и Peter одинаковые"],
  "lige så står foran, som står efter": [
    "lige så stands before, som after",
    "lige så стоит перед, som — после",
  ],
  "Peter er mindre høj end Ole": ["Peter is less tall than Ole", "Peter ниже, чем Ole"],
  "ikke så står foran, som står efter": [
    "ikke så stands before, som after",
    "ikke så стоит перед, som — после",
  ],
};

// captions that start the same way: "Bestemt form: bilen", "Sætningen: huset er …"
const patterns = [
  ["Bestemt form: ", "Definite form: ", "Определённая форма: "],
  ["Sætningen: ", "The sentence: ", "Предложение: "],
  ["Navneordet: ", "The noun: ", "Существительное: "],
  ["Ejestedord: ", "Possessive: ", "Притяжательное слово: "],
  ["Vi tilføjer adjektivet ", "We add the adjective ", "Добавляем прилагательное "],
];

export function helpFor(danish) {
  if (!danish) return {};

  const exact = texts[danish];
  if (exact) return { en: exact[0], ru: exact[1] };

  for (const [prefix, en, ru] of patterns) {
    if (danish.startsWith(prefix)) {
      const rest = danish.slice(prefix.length);

      return { en: `${en}${rest}`, ru: `${ru}${rest}` };
    }
  }

  return {};
}
