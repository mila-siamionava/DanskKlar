/*
  English and Russian help texts for the adjective lessons and exercises.
  Shown under the Danish text when the learner picks a help language
  in the account menu. Danish words stay in Danish.

  Keys:
    lesson:<lesson id>             the lesson intro
    scene:<lesson id>/<scene id>   the rule shown at the end of a scene
    exercise:<exercise id>         the exercise instructions
    question:<exercise id>/<n>     the explanation after question n (from 0)

  A missing key just means no translation is shown.
*/

const CHOOSE = {
  en: "Choose the form of the adjective that fits the sentence.",
  ru: "Выберите форму прилагательного, которая подходит к предложению.",
};

const FIND_ERROR = {
  en: "One part of the sentence is wrong. Choose the part with the mistake.",
  ru: "Одна часть предложения неправильная. Выберите часть с ошибкой.",
};

export const adjectiveHelp = {
  // ---------- 1. grad: Grundregler ----------

  "lesson:hvad-er": {
    en: "An adjective (tillægsord) tells you what something is like: colour, size, shape and feelings. It stands before a noun or after er. Test: if you can put at være in front of the word, it is an adjective.",
    ru: "Прилагательное (tillægsord) описывает, какой предмет: цвет, размер, форму, чувства. Оно стоит перед существительным или после er. Проверка: если перед словом можно поставить at være, это прилагательное.",
  },
  "scene:hvad-er/en-roed-bil": {
    en: "The adjective stands before the noun and describes it.",
    ru: "Прилагательное стоит перед существительным и описывает его.",
  },
  "scene:hvad-er/bilen-er-roed": {
    en: "The adjective can also stand after er: bilen er rød, huset er gammelt.",
    ru: "Прилагательное может стоять и после er: bilen er rød, huset er gammelt.",
  },
  "scene:hvad-er/at-vaere-smart": {
    en: "Can you say at være smart? Then smart is an adjective.",
    ru: "Можно сказать at være smart? Значит, smart — прилагательное.",
  },
  "scene:hvad-er/rundt-bord": {
    en: "Adjectives describe qualities: colour, size, shape, feelings.",
    ru: "Прилагательные описывают качества: цвет, размер, форму, чувства.",
  },

  "lesson:grundform": {
    en: "An adjective describes a noun. It stands before the noun and gets an ending that matches the noun.",
    ru: "Прилагательное описывает существительное. Оно стоит перед ним и получает окончание, которое подходит к существительному.",
  },
  "scene:grundform/en-bil": {
    en: "en-word: the adjective gets no ending.",
    ru: "Слово с en: у прилагательного нет окончания.",
  },
  "scene:grundform/et-hus": {
    en: "et-word: the adjective gets -t.",
    ru: "Слово с et: прилагательное получает -t.",
  },
  "scene:grundform/biler": {
    en: "Plural: the adjective gets -e. Short vowel: n becomes nn.",
    ru: "Множественное число: прилагательное получает -e. После краткой гласной n удваивается: nn.",
  },
  "scene:grundform/huse": {
    en: "Plural: it is the same for en-words and et-words.",
    ru: "Во множественном числе одинаково для слов с en и с et.",
  },

  "lesson:bestemt-form": {
    en: "Bilen, huset and bilerne are the definite form. When an adjective comes in front, the ending moves away from the noun. Instead den, det or de stands in front, and the adjective always gets -e.",
    ru: "Bilen, huset и bilerne — определённая форма. Если перед существительным стоит прилагательное, окончание у существительного исчезает. Вместо него впереди стоит den, det или de, а прилагательное всегда получает -e.",
  },
  "scene:bestemt-form/bilen": {
    en: "en-word: den + adjective with -e. Bil without -en.",
    ru: "Слово с en: den + прилагательное с -e. Bil без -en.",
  },
  "scene:bestemt-form/huset": {
    en: "et-word: det + adjective with -e. No -t here!",
    ru: "Слово с et: det + прилагательное с -e. Здесь нет -t!",
  },
  "scene:bestemt-form/bilerne": {
    en: "Plural: de + adjective with -e. Biler without -ne.",
    ru: "Множественное число: de + прилагательное с -e. Biler без -ne.",
  },
  "scene:bestemt-form/husene": {
    en: "de is used for both en-words and et-words in the plural.",
    ru: "de используется во множественном числе и для слов с en, и для слов с et.",
  },

  "lesson:ejefald": {
    en: "After possessives (min, mit, mine, din, hans, hendes, vores, jeres, deres), after the genitive with -s (Peters, firmaets) and after denne, dette, disse, the adjective always gets -e. The noun stays in its basic form.",
    ru: "После притяжательных слов (min, mit, mine, din, hans, hendes, vores, jeres, deres), после родительного падежа на -s (Peters, firmaets) и после denne, dette, disse прилагательное всегда получает -e. Существительное остаётся в начальной форме.",
  },
  "scene:ejefald/min-bil": {
    en: "After min, din, hans … the adjective gets -e – also with en-words.",
    ru: "После min, din, hans … прилагательное получает -e — даже со словами с en.",
  },
  "scene:ejefald/mit-hus": {
    en: "After mit the adjective gets -e, not -t.",
    ru: "После mit прилагательное получает -e, а не -t.",
  },
  "scene:ejefald/peters-bil": {
    en: "After a genitive with -s the adjective gets -e.",
    ru: "После родительного падежа на -s прилагательное получает -e.",
  },
  "scene:ejefald/dette-hus": {
    en: "After denne, dette and disse the adjective gets -e.",
    ru: "После denne, dette и disse прилагательное получает -e.",
  },

  "lesson:efter-er": {
    en: "The adjective can also stand after er or bliver. Then it matches the noun: no ending for en-words, -t for et-words and -e in the plural. This is also true when the noun is in the definite form.",
    ru: "Прилагательное может стоять и после er или bliver. Тогда оно согласуется с существительным: без окончания для слов с en, -t для слов с et и -e во множественном числе. Это правило действует и для определённой формы существительного.",
  },
  "scene:efter-er/bilen-er": {
    en: "en-word: no ending – not even after bilen.",
    ru: "Слово с en: без окончания — даже после bilen.",
  },
  "scene:efter-er/huset-er": {
    en: "et-word: the adjective gets -t.",
    ru: "Слово с et: прилагательное получает -t.",
  },
  "scene:efter-er/bilerne-er": {
    en: "Plural: the adjective gets -e.",
    ru: "Множественное число: прилагательное получает -e.",
  },
  "scene:efter-er/huset-bliver": {
    en: "After bliver the same rule applies as after er.",
    ru: "После bliver действует то же правило, что и после er.",
  },

  "lesson:skema": {
    en: "The adjective changes for gender (en/et), number (singular/plural) and definiteness (indefinite/definite). Only one form is different: et-words in the indefinite singular get -t. All other forms get -e.",
    ru: "Прилагательное изменяется по роду (en/et), числу (единственное/множественное) и определённости (неопределённая/определённая форма). Отличается только одна форма: слова с et в неопределённой форме единственного числа получают -t. Все остальные формы получают -e.",
  },
  "scene:skema/et-roedt-hus": {
    en: "Indefinite singular, et-word: + t.",
    ru: "Неопределённая форма, единственное число, слово с et: + t.",
  },
  "scene:skema/det-roede-hus": {
    en: "Definite singular: det + adjective with -e.",
    ru: "Определённая форма, единственное число: det + прилагательное с -e.",
  },
  "scene:skema/roede-huse": {
    en: "Indefinite plural: + e.",
    ru: "Неопределённая форма, множественное число: + e.",
  },
  "scene:skema/de-roede-huse": {
    en: "Definite plural: de + adjective with -e.",
    ru: "Определённая форма, множественное число: de + прилагательное с -e.",
  },

  // ---------- 1. grad: Endelser og undtagelser ----------

  "lesson:ig-som": {
    en: "Adjectives ending in -ig follow the normal rule: vigtig, vigtigt, vigtige. Adjectives ending in -som get a double m when they get -e: langsom → langsomme.",
    ru: "Прилагательные на -ig следуют обычному правилу: vigtig, vigtigt, vigtige. У прилагательных на -som m удваивается, когда добавляется -e: langsom → langsomme.",
  },
  "scene:ig-som/vigtig-beslutning": {
    en: "en-word: no ending.",
    ru: "Слово с en: без окончания.",
  },
  "scene:ig-som/vigtigt-moede": {
    en: "et-word: + t, as normal.",
    ru: "Слово с et: + t, как обычно.",
  },
  "scene:ig-som/langsomt-tog": {
    en: "et-word: + t. No double m here.",
    ru: "Слово с et: + t. Здесь m не удваивается.",
  },
  "scene:ig-som/det-langsomme-tog": {
    en: "With -e: m becomes mm. langsom → langsomme.",
    ru: "С -e: m удваивается. langsom → langsomme.",
  },

  "lesson:sk-vis": {
    en: "Adjectives ending in -sk and -vis do not get -t in the indefinite singular. In the other forms they get -e as normal. With barsk and delvis you may write the word with or without -t.",
    ru: "Прилагательные на -sk и -vis не получают -t в неопределённой форме единственного числа. В остальных формах они получают -e, как обычно. У barsk и delvis можно писать и с -t, и без него.",
  },
  "scene:sk-vis/dansk-flag": {
    en: "-sk: no -t. et dansk flag, et typisk eksempel.",
    ru: "-sk: без -t. et dansk flag, et typisk eksempel.",
  },
  "scene:sk-vis/danske-flag": {
    en: "Plural and definite form: + e as normal.",
    ru: "Множественное число и определённая форма: + e, как обычно.",
  },
  "scene:sk-vis/barsk-vejr": {
    en: "barsk and delvis: the -t may be there, but it does not have to be.",
    ru: "barsk и delvis: -t можно писать, но не обязательно.",
  },

  "lesson:en-el-er": {
    en: "When adjectives ending in -en, -el and -er get -e, the e in the last syllable disappears: lækker → lækre, doven → dovne, gammel → gamle. With -t this does not happen: et lækkert måltid.",
    ru: "Когда прилагательные на -en, -el и -er получают -e, буква e в последнем слоге исчезает: lækker → lækre, doven → dovne, gammel → gamle. С -t этого не происходит: et lækkert måltid.",
  },
  "scene:en-el-er/den-laekre-kage": {
    en: "lækker → lækre: the e disappears (and kk becomes k).",
    ru: "lækker → lækre: e исчезает (и kk превращается в k).",
  },
  "scene:en-el-er/dovne-maend": {
    en: "doven → dovne: the e disappears.",
    ru: "doven → dovne: e исчезает.",
  },
  "scene:en-el-er/gamle-huse": {
    en: "gammel → gamle: the e disappears (and mm becomes m).",
    ru: "gammel → gamle: e исчезает (и mm превращается в m).",
  },
  "scene:en-el-er/laekkert-maaltid": {
    en: "With -t the e does not disappear: et lækkert måltid, et gammelt hus.",
    ru: "С -t буква e не исчезает: et lækkert måltid, et gammelt hus.",
  },

  "lesson:dobbelt-l": {
    en: "A group of adjectives ending in -el are stressed on the last syllable: aktuel, ideel, kriminel, generel. Here l becomes ll when -e is added. With -t there is only one l.",
    ru: "У группы прилагательных на -el ударение падает на последний слог: aktuel, ideel, kriminel, generel. У них l удваивается, когда добавляется -e. С -t остаётся одна l.",
  },
  "scene:dobbelt-l/aktuelle-nyheder": {
    en: "aktuel → aktuelle: l becomes ll.",
    ru: "aktuel → aktuelle: l удваивается.",
  },
  "scene:dobbelt-l/den-ideelle-loesning": {
    en: "ideel → ideelle: l becomes ll.",
    ru: "ideel → ideelle: l удваивается.",
  },
  "scene:dobbelt-l/aktuelt-emne": {
    en: "With -t: only one l. et aktuelt emne.",
    ru: "С -t: только одна l. et aktuelt emne.",
  },

  "lesson:t-et": {
    en: "If the adjective ends in -t (kort, glat, let, købt), it does not get an extra -t. If it ends in -et (malet, snavset, stribet, forkølet), -et becomes -ede when -e is needed: den malede bænk.",
    ru: "Если прилагательное оканчивается на -t (kort, glat, let, købt), второе -t не добавляется. Если оно оканчивается на -et (malet, snavset, stribet, forkølet), то -et превращается в -ede, когда нужно -e: den malede bænk.",
  },
  "scene:t-et/kort-moede": {
    en: "The word ends in -t: no extra -t. et kort møde.",
    ru: "Слово оканчивается на -t: второе -t не нужно. et kort møde.",
  },
  "scene:t-et/korte-film": {
    en: "Plural and definite form: + e as normal.",
    ru: "Множественное число и определённая форма: + e, как обычно.",
  },
  "scene:t-et/den-malede-baenk": {
    en: "malet → malede: -et becomes -ede.",
    ru: "malet → malede: -et превращается в -ede.",
  },
  "scene:t-et/snavset-glas": {
    en: "The word ends in -et: no extra -t. et snavset glas.",
    ru: "Слово оканчивается на -et: второе -t не нужно. et snavset glas.",
  },

  "lesson:tillaegsform": {
    en: "Many adjectives come from verbs (participles). Regular verbs: -et becomes -ede (krævet → de krævede papirer). Irregular verbs: -en/-et becomes -ne (stjålen → den stjålne cykel). Some change like normal adjectives: en åben dør, et åbent vindue.",
    ru: "Многие прилагательные образованы от глаголов (причастия). Правильные глаголы: -et превращается в -ede (krævet → de krævede papirer). Неправильные глаголы: -en/-et превращается в -ne (stjålen → den stjålne cykel). Некоторые изменяются как обычные прилагательные: en åben dør, et åbent vindue.",
  },
  "scene:tillaegsform/stjaalen-cykel": {
    en: "en-word: stjålen.",
    ru: "Слово с en: stjålen.",
  },
  "scene:tillaegsform/stjaalet-ur": {
    en: "et-word: -en becomes -et. et stjålet ur.",
    ru: "Слово с et: -en превращается в -et. et stjålet ur.",
  },
  "scene:tillaegsform/den-stjaalne-cykel": {
    en: "With -e: stjålne. The same with frossen → det frosne kød.",
    ru: "С -e: stjålne. Так же frossen → det frosne kød.",
  },
  "scene:tillaegsform/det-ankomne-tog": {
    en: "-ne: it has happened. det ankomne tog = the train that had arrived.",
    ru: "-ne: действие уже произошло. det ankomne tog = поезд, который прибыл.",
  },
  "scene:tillaegsform/det-ankommende-tog": {
    en: "-ende: it is happening now. det ankommende tog = the train that is arriving.",
    ru: "-ende: действие происходит сейчас. det ankommende tog = поезд, который прибывает.",
  },
  "scene:tillaegsform/aabent-brev": {
    en: "åben changes like a normal adjective: et åbent brev, den åbne dør.",
    ru: "åben изменяется как обычное прилагательное: et åbent brev, den åbne dør.",
  },

  "lesson:uboejelige": {
    en: "Some adjectives never change: words ending in -e (moderne, stille, bange, ringe), words ending in -ende (spændende), some words ending in a vowel (lilla, ru, ædru) and stakkels. blå and grå only get -t. ny and fri change, but with one t. lille is små in the plural.",
    ru: "Некоторые прилагательные никогда не изменяются: слова на -e (moderne, stille, bange, ringe), слова на -ende (spændende), некоторые слова на гласную (lilla, ru, ædru) и stakkels. blå и grå получают только -t. ny и fri изменяются, но с одной t. lille во множественном числе — små.",
  },
  "scene:uboejelige/moderne-hus": {
    en: "If the word ends in -e, it never changes: moderne, stille, bange.",
    ru: "Если слово оканчивается на -e, оно никогда не изменяется: moderne, stille, bange.",
  },
  "scene:uboejelige/spaendende-moeder": {
    en: "-ende never changes: et spændende møde, spændende møder.",
    ru: "-ende никогда не изменяется: et spændende møde, spændende møder.",
  },
  "scene:uboejelige/blaat-kort": {
    en: "blå and grå get -t: et blåt kort.",
    ru: "blå и grå получают -t: et blåt kort.",
  },
  "scene:uboejelige/det-blaa-kort": {
    en: "But no -e: det blå kort, blå kort.",
    ru: "Но без -e: det blå kort, blå kort.",
  },
  "scene:uboejelige/nyt-tag": {
    en: "ny and fri: nyt, frit, nye, frie. Only one t.",
    ru: "ny и fri: nyt, frit, nye, frie. Только одна t.",
  },
  "scene:uboejelige/smaa-biler": {
    en: "lille is små in the plural: en lille bil, små biler. But: den lille bil.",
    ru: "lille во множественном числе — små: en lille bil, små biler. Но: den lille bil.",
  },
  "scene:uboejelige/stakkels-barn": {
    en: "stakkels never changes: det stakkels barn, stakkels børn.",
    ru: "stakkels никогда не изменяется: det stakkels barn, stakkels børn.",
  },

  // ---------- 1. grad: Tegnsætning ----------

  "lesson:komma": {
    en: "If two adjectives stand next to each other and you can put og between them, use a comma: en kold, frostklar morgen (kold og frostklar). If the last adjective belongs closely to the noun, there is no comma: sprøde franske kartofler.",
    ru: "Если два прилагательных стоят рядом и между ними можно поставить og, нужна запятая: en kold, frostklar morgen (kold og frostklar). Если последнее прилагательное тесно связано с существительным, запятая не нужна: sprøde franske kartofler.",
  },
  "scene:komma/kold-frostklar": {
    en: "kold and frostklar: both describe the morning. Use a comma.",
    ru: "kold и frostklar: оба описывают утро. Ставим запятую.",
  },
  "scene:komma/splinterny-roed": {
    en: "splinterny and rød: use a comma.",
    ru: "splinterny и rød: ставим запятую.",
  },
  "scene:komma/sproede-franske": {
    en: "franske kartofler belong together. You cannot say 'sprøde og franske'. No comma.",
    ru: "franske kartofler — одно целое. Нельзя сказать «sprøde og franske». Запятая не нужна.",
  },

  // ---------- 2. og 3. grad ----------

  "lesson:grader": {
    en: "When you compare things, the adjective can change for degree. Positive (1. grad): rød. Comparative (2. grad): rødere. Superlative (3. grad): rødest. With den, det or de the superlative gets -e: den rødeste bil.",
    ru: "При сравнении прилагательное изменяется по степеням. Положительная (1. grad): rød. Сравнительная (2. grad): rødere. Превосходная (3. grad): rødest. После den, det или de превосходная степень получает -e: den rødeste bil.",
  },
  "scene:grader/grad-1": {
    en: "The positive (1. grad) is the basic form: bilen er rød.",
    ru: "Положительная степень (1. grad) — это начальная форма: bilen er rød.",
  },
  "scene:grader/grad-2": {
    en: "Comparative (2. grad): + ere. Min bil er rødere end din.",
    ru: "Сравнительная степень (2. grad): + ere. Min bil er rødere end din.",
  },
  "scene:grader/grad-3": {
    en: "Superlative (3. grad): + est. Den bil er rødest.",
    ru: "Превосходная степень (3. grad): + est. Den bil er rødest.",
  },
  "scene:grader/grad-3-bestemt": {
    en: "With den, det, de: superlative + e. den rødeste bil.",
    ru: "После den, det, de: превосходная степень + e. den rødeste bil.",
  },

  "lesson:komparativ": {
    en: "The comparative is used when you compare two things. It is often followed by end (than): Ole er højere end Peter. The comparative never changes: en billigere bil, et billigere hus, billigere huse.",
    ru: "Сравнительная степень используется, когда сравнивают два предмета. После неё часто стоит end (чем): Ole er højere end Peter. Сравнительная степень никогда не изменяется: en billigere bil, et billigere hus, billigere huse.",
  },
  "scene:komparativ/hoejere-end": {
    en: "Comparative + end: Ole er højere end Peter.",
    ru: "Сравнительная степень + end: Ole er højere end Peter.",
  },
  "scene:komparativ/billigere-hus": {
    en: "The comparative never gets -t: et billigere hus.",
    ru: "Сравнительная степень никогда не получает -t: et billigere hus.",
  },
  "scene:komparativ/billigere-huse": {
    en: "And never -e: billigere huse, de billigere huse.",
    ru: "И никогда не получает -e: billigere huse, de billigere huse.",
  },

  "lesson:superlativ": {
    en: "The superlative is used when something is number one. Most adjectives get -est: højest, kortest. Adjectives ending in -ig, -lig and -som only get -st: billigst, vigtigst, langsomst. After den, det, de, min, Peters … the superlative gets -e: det billigste hus, min yngste søn.",
    ru: "Превосходная степень используется, когда что-то на первом месте. Большинство прилагательных получает -est: højest, kortest. Прилагательные на -ig, -lig и -som получают только -st: billigst, vigtigst, langsomst. После den, det, de, min, Peters … превосходная степень получает -e: det billigste hus, min yngste søn.",
  },
  "scene:superlativ/hoejest": {
    en: "Most adjectives: + est. Ole er højest.",
    ru: "Большинство прилагательных: + est. Ole er højest.",
  },
  "scene:superlativ/billigst": {
    en: "-ig, -lig and -som: only + st. Lejligheden er billigst.",
    ru: "-ig, -lig и -som: только + st. Lejligheden er billigst.",
  },
  "scene:superlativ/det-billigste-hus": {
    en: "With det: + e. det billigste hus.",
    ru: "После det: + e. det billigste hus.",
  },
  "scene:superlativ/den-hoejeste": {
    en: "With den: + e. den højeste mand.",
    ru: "После den: + e. den højeste mand.",
  },

  "lesson:grad-stavning": {
    en: "Some adjectives change a little when they get -ere and -est. A short vowel gives a double consonant: smuk → smukkere, langsom → langsommere. Words ending in -en, -el and -er lose the e: lækker → lækrere, doven → dovnere. Words ending in -r keep the r: dyr → dyrere.",
    ru: "Некоторые прилагательные немного меняются, когда получают -ere и -est. После краткой гласной согласная удваивается: smuk → smukkere, langsom → langsommere. Слова на -en, -el и -er теряют e: lækker → lækrere, doven → dovnere. Слова на -r сохраняют r: dyr → dyrere.",
  },
  "scene:grad-stavning/smukkere": {
    en: "Short vowel: k becomes kk. smuk → smukkere, smukkest.",
    ru: "Краткая гласная: k удваивается. smuk → smukkere, smukkest.",
  },
  "scene:grad-stavning/langsommere": {
    en: "-som: m becomes mm. langsom → langsommere. But: langsomst.",
    ru: "-som: m удваивается. langsom → langsommere. Но: langsomst.",
  },
  "scene:grad-stavning/laekrere": {
    en: "lækker → lækrere: the e disappears. lækrest, den lækreste.",
    ru: "lækker → lækrere: e исчезает. lækrest, den lækreste.",
  },
  "scene:grad-stavning/dyrere": {
    en: "dyr → dyrere: remember the whole -ere after r. Not 'dyre'.",
    ru: "dyr → dyrere: после r пишется всё окончание -ere. Не «dyre».",
  },

  "lesson:mere-mest": {
    en: "Some adjectives use mere and mest instead of -ere and -est: long words (intelligent, interessant), words ending in -sk and -vis (praktisk), words ending in -et (forkølet), words ending in -e and -ende (moderne, spændende), and aktuel, ideel. With den, det and de the adjective gets -e: de mest praktiske løsninger.",
    ru: "Некоторые прилагательные образуют степени с помощью mere и mest вместо -ere и -est: длинные слова (intelligent, interessant), слова на -sk и -vis (praktisk), слова на -et (forkølet), слова на -e и -ende (moderne, spændende), а также aktuel, ideel. После den, det и de прилагательное получает -e: de mest praktiske løsninger.",
  },
  "scene:mere-mest/mere-moderne": {
    en: "moderne → mere moderne → mest moderne.",
    ru: "moderne → mere moderne → mest moderne.",
  },
  "scene:mere-mest/mest-praktisk": {
    en: "-sk: praktisk → mere praktisk → mest praktisk.",
    ru: "-sk: praktisk → mere praktisk → mest praktisk.",
  },
  "scene:mere-mest/den-mest-interessante": {
    en: "With den: mest + adjective with -e. den mest interessante film.",
    ru: "После den: mest + прилагательное с -e. den mest interessante film.",
  },

  "lesson:uregelmaessige": {
    en: "Some common adjectives are irregular. You have to learn them by heart: god – bedre – bedst, dårlig – værre – værst, lille – mindre – mindst, stor – større – størst, gammel – ældre – ældst, ung – yngre – yngst, lang – længere – længst, mange – flere – flest, meget – mere – mest, få – færre – færrest.",
    ru: "Некоторые частые прилагательные неправильные. Их нужно выучить наизусть: god – bedre – bedst, dårlig – værre – værst, lille – mindre – mindst, stor – større – størst, gammel – ældre – ældst, ung – yngre – yngst, lang – længere – længst, mange – flere – flest, meget – mere – mest, få – færre – færrest.",
  },
  "scene:uregelmaessige/bedre": {
    en: "god → bedre → bedst.",
    ru: "god → bedre → bedst.",
  },
  "scene:uregelmaessige/stoerre": {
    en: "stor → større → størst. o becomes ø.",
    ru: "stor → større → størst. o превращается в ø.",
  },
  "scene:uregelmaessige/aeldst": {
    en: "gammel → ældre → ældst.",
    ru: "gammel → ældre → ældst.",
  },
  "scene:uregelmaessige/det-mindste-barn": {
    en: "lille → mindre → mindst. det mindste barn.",
    ru: "lille → mindre → mindst. det mindste barn.",
  },
  "scene:uregelmaessige/flere": {
    en: "mange → flere → flest. Not 'mere biler'.",
    ru: "mange → flere → flest. Не «mere biler».",
  },

  "lesson:sammenligning": {
    en: "This is how you compare. Comparative + end: Ole er højere end Peter. lige så + positive + som when two things are the same: Ole er lige så høj som Peter. ikke så + positive + som: Peter er ikke så høj som Ole.",
    ru: "Как сравнивать. Сравнительная степень + end: Ole er højere end Peter. lige så + положительная степень + som, когда два предмета одинаковые: Ole er lige så høj som Peter. ikke så + положительная степень + som: Peter er ikke så høj som Ole.",
  },
  "scene:sammenligning/hurtigere-end": {
    en: "Comparative + end: bilen er hurtigere end cyklen.",
    ru: "Сравнительная степень + end: bilen er hurtigere end cyklen.",
  },
  "scene:sammenligning/lige-saa": {
    en: "lige så + positive + som. Not 'lige så højere'.",
    ru: "lige så + положительная степень + som. Не «lige så højere».",
  },
  "scene:sammenligning/ikke-saa": {
    en: "ikke så + positive + som: Peter er ikke så høj som Ole.",
    ru: "ikke så + положительная степень + som: Peter er ikke så høj som Ole.",
  },

  // ---------- exercises ----------

  "exercise:vaelg-formen": CHOOSE,
  "exercise:endelser": CHOOSE,
  "exercise:find-fejlen": FIND_ERROR,
  "exercise:grad-vaelg": CHOOSE,
  "exercise:grad-fejl": FIND_ERROR,

  // Vælg den rigtige form
  "question:vaelg-formen/0": {
    en: "en hund is an en-word in the indefinite form: no ending.",
    ru: "en hund — слово с en в неопределённой форме: без окончания.",
  },
  "question:vaelg-formen/1": {
    en: "et hus is an et-word in the indefinite form: the adjective gets -t.",
    ru: "et hus — слово с et в неопределённой форме: прилагательное получает -t.",
  },
  "question:vaelg-formen/2": {
    en: "Plural: the adjective gets -e. Short vowel: k becomes kk.",
    ru: "Множественное число: прилагательное получает -e. После краткой гласной k удваивается.",
  },
  "question:vaelg-formen/3": {
    en: "After den, det and de the adjective always gets -e.",
    ru: "После den, det и de прилагательное всегда получает -e.",
  },
  "question:vaelg-formen/4": {
    en: "After min, din, hans … the adjective gets -e.",
    ru: "После min, din, hans … прилагательное получает -e.",
  },
  "question:vaelg-formen/5": {
    en: "After er: huset is an et-word, so the adjective gets -t.",
    ru: "После er: huset — слово с et, поэтому прилагательное получает -t.",
  },
  "question:vaelg-formen/6": {
    en: "After er: børnene is plural, so the adjective gets -e.",
    ru: "После er: børnene — множественное число, поэтому прилагательное получает -e.",
  },
  "question:vaelg-formen/7": {
    en: "After hans the adjective gets -e.",
    ru: "После hans прилагательное получает -e.",
  },
  "question:vaelg-formen/8": {
    en: "et problem is an et-word in the indefinite form: + t.",
    ru: "et problem — слово с et в неопределённой форме: + t.",
  },
  "question:vaelg-formen/9": {
    en: "After det (definite form) the adjective gets -e – not -t.",
    ru: "После det (определённая форма) прилагательное получает -e, а не -t.",
  },
  "question:vaelg-formen/10": {
    en: "Adjectives ending in -sk do not get -t: et dansk ord.",
    ru: "Прилагательные на -sk не получают -t: et dansk ord.",
  },
  "question:vaelg-formen/11": {
    en: "Adjectives ending in -e never change.",
    ru: "Прилагательные на -e никогда не изменяются.",
  },
  "question:vaelg-formen/12": {
    en: "After a genitive (Peters) the adjective gets -e, and gammel becomes gamle.",
    ru: "После родительного падежа (Peters) прилагательное получает -e, и gammel превращается в gamle.",
  },
  "question:vaelg-formen/13": {
    en: "lille is små in the plural.",
    ru: "lille во множественном числе — små.",
  },
  "question:vaelg-formen/14": {
    en: "moderne ends in -e and never changes.",
    ru: "moderne оканчивается на -e и никогда не изменяется.",
  },
  "question:vaelg-formen/15": {
    en: "After er: blodtryk is an et-word, so the adjective gets -t.",
    ru: "После er: blodtryk — слово с et, поэтому прилагательное получает -t.",
  },
  "question:vaelg-formen/16": {
    en: "et måltid is an et-word in the indefinite form: + t.",
    ru: "et måltid — слово с et в неопределённой форме: + t.",
  },
  "question:vaelg-formen/17": {
    en: "After er: kaffen is an en-word, so no ending – not even in the definite form.",
    ru: "После er: kaffen — слово с en, поэтому без окончания, даже в определённой форме.",
  },
  "question:vaelg-formen/18": {
    en: "kort already ends in -t: no extra -t.",
    ru: "kort уже оканчивается на -t: второе -t не нужно.",
  },
  "question:vaelg-formen/19": {
    en: "After denne, dette and disse the adjective gets -e.",
    ru: "После denne, dette и disse прилагательное получает -e.",
  },

  // Endelser og undtagelser
  "question:endelser/0": {
    en: "-ig follows the rule: et møde is an et-word, so + t.",
    ru: "-ig следует правилу: et møde — слово с et, поэтому + t.",
  },
  "question:endelser/1": {
    en: "After det the adjective gets -e, and -som gets a double m: langsomme.",
    ru: "После det прилагательное получает -e, а у -som удваивается m: langsomme.",
  },
  "question:endelser/2": {
    en: "Adjectives ending in -sk do not get -t: et typisk problem.",
    ru: "Прилагательные на -sk не получают -t: et typisk problem.",
  },
  "question:endelser/3": {
    en: "kage is an en-word in the indefinite form: no ending.",
    ru: "kage — слово с en в неопределённой форме: без окончания.",
  },
  "question:endelser/4": {
    en: "After den the adjective gets -e, and the e in -er disappears: lækker → lækre.",
    ru: "После den прилагательное получает -e, а e в -er исчезает: lækker → lækre.",
  },
  "question:endelser/5": {
    en: "After min the adjective gets -e, and the e in -en disappears: doven → dovne.",
    ru: "После min прилагательное получает -e, а e в -en исчезает: doven → dovne.",
  },
  "question:endelser/6": {
    en: "et hus: + t. With -t the e does not disappear: et gammelt hus.",
    ru: "et hus: + t. С -t буква e не исчезает: et gammelt hus.",
  },
  "question:endelser/7": {
    en: "Plural: + e, and l becomes ll: aktuelle.",
    ru: "Множественное число: + e, и l удваивается: aktuelle.",
  },
  "question:endelser/8": {
    en: "løsning is an en-word in the indefinite form: no ending.",
    ru: "løsning — слово с en в неопределённой форме: без окончания.",
  },
  "question:endelser/9": {
    en: "kort already ends in -t: no extra -t.",
    ru: "kort уже оканчивается на -t: второе -t не нужно.",
  },
  "question:endelser/10": {
    en: "After de the adjective gets -e, and -et becomes -ede: snavsede.",
    ru: "После de прилагательное получает -e, и -et превращается в -ede: snavsede.",
  },
  "question:endelser/11": {
    en: "bænk is an en-word in the indefinite form: malet without an ending.",
    ru: "bænk — слово с en в неопределённой форме: malet без окончания.",
  },
  "question:endelser/12": {
    en: "After den: stjålen becomes stjålne.",
    ru: "После den: stjålen превращается в stjålne.",
  },
  "question:endelser/13": {
    en: "After er: døren is an en-word, so no ending.",
    ru: "После er: døren — слово с en, поэтому без окончания.",
  },
  "question:endelser/14": {
    en: "vinduet is an et-word, so åben gets -t: åbent.",
    ru: "vinduet — слово с et, поэтому åben получает -t: åbent.",
  },
  "question:endelser/15": {
    en: "The train is coming in now, so it is -ende: det ankommende tog.",
    ru: "Поезд прибывает сейчас, поэтому -ende: det ankommende tog.",
  },
  "question:endelser/16": {
    en: "Adjectives ending in -ende never change.",
    ru: "Прилагательные на -ende никогда не изменяются.",
  },
  "question:endelser/17": {
    en: "blå and grå get -t with et-words: et blåt tæppe.",
    ru: "blå и grå получают -t со словами с et: et blåt tæppe.",
  },
  "question:endelser/18": {
    en: "ny gets -t with et-words, but only one t: et nyt tag.",
    ru: "ny получает -t со словами с et, но только одну t: et nyt tag.",
  },
  "question:endelser/19": {
    en: "stakkels never changes.",
    ru: "stakkels никогда не изменяется.",
  },

  // Find fejlen
  "question:find-fejlen/0": {
    en: "hus is an et-word: et stort hus.",
    ru: "hus — слово с et: et stort hus.",
  },
  "question:find-fejlen/1": {
    en: "After er: kollega is an en-word in the singular, so no ending.",
    ru: "После er: kollega — слово с en в единственном числе, поэтому без окончания.",
  },
  "question:find-fejlen/2": {
    en: "With den + adjective the noun loses its ending: den gamle bil.",
    ru: "С den + прилагательное существительное теряет окончание: den gamle bil.",
  },
  "question:find-fejlen/3": {
    en: "After er: børnene is plural, so the adjective gets -e.",
    ru: "После er: børnene — множественное число, поэтому прилагательное получает -e.",
  },
  "question:find-fejlen/4": {
    en: "telefon is an en-word: en ny telefon.",
    ru: "telefon — слово с en: en ny telefon.",
  },
  "question:find-fejlen/5": {
    en: "After er: huset is an et-word, so the adjective gets -t.",
    ru: "После er: huset — слово с et, поэтому прилагательное получает -t.",
  },
  "question:find-fejlen/6": {
    en: "Adjectives ending in -sk do not get -t: et dansk pas.",
    ru: "Прилагательные на -sk не получают -t: et dansk pas.",
  },
  "question:find-fejlen/7": {
    en: "After det (definite form) the adjective gets -e: det nye hus.",
    ru: "После det (определённая форма) прилагательное получает -e: det nye hus.",
  },
  "question:find-fejlen/8": {
    en: "små is only plural. In the singular it is lille: en lille lejlighed.",
    ru: "små — только множественное число. В единственном числе — lille: en lille lejlighed.",
  },
  "question:find-fejlen/9": {
    en: "After a genitive (Peters) the adjective gets -e: Peters gamle cykel.",
    ru: "После родительного падежа (Peters) прилагательное получает -e: Peters gamle cykel.",
  },
  "question:find-fejlen/10": {
    en: "lille is små in the plural: to små børn.",
    ru: "lille во множественном числе — små: to små børn.",
  },
  "question:find-fejlen/11": {
    en: "After mit the adjective gets -e: mit nye job.",
    ru: "После mit прилагательное получает -e: mit nye job.",
  },
  "question:find-fejlen/12": {
    en: "After er: lejligheden is an en-word in the singular, so no ending.",
    ru: "После er: lejligheden — слово с en в единственном числе, поэтому без окончания.",
  },
  "question:find-fejlen/13": {
    en: "After er: vejret is an et-word, so the adjective gets -t.",
    ru: "После er: vejret — слово с et, поэтому прилагательное получает -t.",
  },
  "question:find-fejlen/14": {
    en: "After er: disse sko is plural, so the adjective gets -e.",
    ru: "После er: disse sko — множественное число, поэтому прилагательное получает -e.",
  },
  "question:find-fejlen/15": {
    en: "tidspunkt is an et-word: et dårligt tidspunkt.",
    ru: "tidspunkt — слово с et: et dårligt tidspunkt.",
  },
  "question:find-fejlen/16": {
    en: "sort already ends in -t: et sort tag.",
    ru: "sort уже оканчивается на -t: et sort tag.",
  },
  "question:find-fejlen/17": {
    en: "hår is an et-word, and here it is singular: langt hår.",
    ru: "hår — слово с et, и здесь оно в единственном числе: langt hår.",
  },
  "question:find-fejlen/18": {
    en: "middag is an en-word in the indefinite form: en dejlig middag.",
    ru: "middag — слово с en в неопределённой форме: en dejlig middag.",
  },
  "question:find-fejlen/19": {
    en: "After er: lejlighed is an en-word, so no ending.",
    ru: "После er: lejlighed — слово с en, поэтому без окончания.",
  },

  // Gradbøjning: vælg formen
  "question:grad-vaelg/0": {
    en: "We compare two people with end: comparative, højere.",
    ru: "Сравниваем двух людей с помощью end: сравнительная степень, højere.",
  },
  "question:grad-vaelg/1": {
    en: "After den the superlative gets -e: den varmeste dag.",
    ru: "После den превосходная степень получает -e: den varmeste dag.",
  },
  "question:grad-vaelg/2": {
    en: "Number one without den: superlative, højest.",
    ru: "На первом месте, без den: превосходная степень, højest.",
  },
  "question:grad-vaelg/3": {
    en: "We compare two things with end: comparative.",
    ru: "Сравниваем два предмета с помощью end: сравнительная степень.",
  },
  "question:grad-vaelg/4": {
    en: "god – bedre – bedst. After det: det bedste job.",
    ru: "god – bedre – bedst. После det: det bedste job.",
  },
  "question:grad-vaelg/5": {
    en: "dårlig – værre – værst. Comparative + end: værre end.",
    ru: "dårlig – værre – værst. Сравнительная степень + end: værre end.",
  },
  "question:grad-vaelg/6": {
    en: "gammel – ældre – ældst.",
    ru: "gammel – ældre – ældst.",
  },
  "question:grad-vaelg/7": {
    en: "ung – yngre – yngst. After den: den yngste.",
    ru: "ung – yngre – yngst. После den: den yngste.",
  },
  "question:grad-vaelg/8": {
    en: "dyr → dyrere: remember the whole -ere after r.",
    ru: "dyr → dyrere: после r пишется всё окончание -ere.",
  },
  "question:grad-vaelg/9": {
    en: "-sk uses mest. After den the adjective gets -e: den mest praktiske løsning.",
    ru: "-sk образует степени с mest. После den прилагательное получает -e: den mest praktiske løsning.",
  },
  "question:grad-vaelg/10": {
    en: "Words ending in -e use mere: mere moderne.",
    ru: "Слова на -e образуют степени с mere: mere moderne.",
  },
  "question:grad-vaelg/11": {
    en: "lille – mindre – mindst.",
    ru: "lille – mindre – mindst.",
  },
  "question:grad-vaelg/12": {
    en: "mange – flere – flest. Things you can count: flere, not mere.",
    ru: "mange – flere – flest. Для того, что можно посчитать: flere, а не mere.",
  },
  "question:grad-vaelg/13": {
    en: "lang – længere – længst. After den: den længste.",
    ru: "lang – længere – længst. После den: den længste.",
  },
  "question:grad-vaelg/14": {
    en: "lækker → lækrere: the e disappears.",
    ru: "lækker → lækrere: e исчезает.",
  },
  "question:grad-vaelg/15": {
    en: "-ig only gets -st: vigtigst. After det: det vigtigste.",
    ru: "-ig получает только -st: vigtigst. После det: det vigtigste.",
  },
  "question:grad-vaelg/16": {
    en: "langsom → langsommere: m becomes mm.",
    ru: "langsom → langsommere: m удваивается.",
  },
  "question:grad-vaelg/17": {
    en: "After min the superlative gets -e: min bedste ven.",
    ru: "После min превосходная степень получает -e: min bedste ven.",
  },
  "question:grad-vaelg/18": {
    en: "We compare two languages with end: comparative.",
    ru: "Сравниваем два языка с помощью end: сравнительная степень.",
  },
  "question:grad-vaelg/19": {
    en: "lige så + positive + som: lige så høj som.",
    ru: "lige så + положительная степень + som: lige så høj som.",
  },

  // Gradbøjning: find fejlen
  "question:grad-fejl/0": {
    en: "Short adjectives get -ere: højere, not mere høj.",
    ru: "Короткие прилагательные получают -ere: højere, а не mere høj.",
  },
  "question:grad-fejl/1": {
    en: "After den the superlative gets -e: den bedste film.",
    ru: "После den превосходная степень получает -e: den bedste film.",
  },
  "question:grad-fejl/2": {
    en: "After a comparative you use end: hurtigere end.",
    ru: "После сравнительной степени используется end: hurtigere end.",
  },
  "question:grad-fejl/3": {
    en: "After den the superlative gets -e: den ældste.",
    ru: "После den превосходная степень получает -e: den ældste.",
  },
  "question:grad-fejl/4": {
    en: "god – bedre – bedst. You do not say godere.",
    ru: "god – bedre – bedst. Слова godere нет.",
  },
  "question:grad-fejl/5": {
    en: "Things you can count: flere biler, not mere biler.",
    ru: "Для того, что можно посчитать: flere biler, а не mere biler.",
  },
  "question:grad-fejl/6": {
    en: "dyr → dyrere: remember the whole -ere after r.",
    ru: "dyr → dyrere: после r пишется всё окончание -ere.",
  },
  "question:grad-fejl/7": {
    en: "Either -ste or mest – not both: den vigtigste opgave.",
    ru: "Либо -ste, либо mest — но не оба сразу: den vigtigste opgave.",
  },
  "question:grad-fejl/8": {
    en: "Words ending in -e use mere: mere moderne.",
    ru: "Слова на -e образуют степени с mere: mere moderne.",
  },
  "question:grad-fejl/9": {
    en: "lige så + positive + som: lige så høj som.",
    ru: "lige så + положительная степень + som: lige så høj som.",
  },
  "question:grad-fejl/10": {
    en: "ung – yngre – yngst: yngre end mig.",
    ru: "ung – yngre – yngst: yngre end mig.",
  },
  "question:grad-fejl/11": {
    en: "After a comparative you use end: mindre end mig.",
    ru: "После сравнительной степени используется end: mindre end mig.",
  },
  "question:grad-fejl/12": {
    en: "langsom → langsommere: m becomes mm.",
    ru: "langsom → langsommere: m удваивается.",
  },
  "question:grad-fejl/13": {
    en: "After den the superlative gets -e: den varmeste dag.",
    ru: "После den превосходная степень получает -e: den varmeste dag.",
  },
  "question:grad-fejl/14": {
    en: "After den the superlative gets -e: den højeste. Without den: Hvem er højest?",
    ru: "После den превосходная степень получает -e: den højeste. Без den: Hvem er højest?",
  },
  "question:grad-fejl/15": {
    en: "stor – større – størst.",
    ru: "stor – større – størst.",
  },
  "question:grad-fejl/16": {
    en: "With end you use the comparative: ældre end mig.",
    ru: "С end используется сравнительная степень: ældre end mig.",
  },
  "question:grad-fejl/17": {
    en: "After den the superlative gets -e: den værste dag.",
    ru: "После den превосходная степень получает -e: den værste dag.",
  },
  "question:grad-fejl/18": {
    en: "lækker → lækrere: the e disappears.",
    ru: "lækker → lækrere: e исчезает.",
  },
  "question:grad-fejl/19": {
    en: "After den the adjective gets -e: den mest praktiske løsning.",
    ru: "После den прилагательное получает -e: den mest praktiske løsning.",
  },
};

function help(key, field) {
  const text = adjectiveHelp[key];

  return text ? { [`${field}_en`]: text.en, [`${field}_ru`]: text.ru } : {};
}

// adds intro_en/_ru to a lesson and rule_en/_ru to its scenes
export function withLessonHelp(lesson) {
  return {
    ...lesson,
    ...help(`lesson:${lesson.id}`, "intro"),
    scenes: lesson.scenes.map((scene) => ({
      ...scene,
      ...help(`scene:${lesson.id}/${scene.id}`, "rule"),
    })),
  };
}

// adds instructions_en/_ru to an exercise and why_en/_ru to its questions
export function withExerciseHelp(exercise) {
  return {
    ...exercise,
    ...help(`exercise:${exercise.id}`, "instructions"),
    questions: exercise.questions.map((question, index) => ({
      ...question,
      ...help(`question:${exercise.id}/${index}`, "why"),
    })),
  };
}
