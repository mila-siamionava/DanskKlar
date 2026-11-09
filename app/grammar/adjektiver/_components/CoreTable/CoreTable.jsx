import HelpText from "@/components/i18n/HelpText/HelpText";
import { helpFor } from "@/data/grammar/textHelp";

import NounPhrase from "../NounPhrase/NounPhrase";

import styles from "./CoreTable.module.css";

/*
  The whole rule of a part in one small table, shown first on Regler.
  Endings are marked with [ ] (see lib/grammar/phrase.js).
*/
const tables = {
  grundform: {
    columns: ["", "Ubestemt", "Bestemt"],
    rows: [
      ["en-ord", "en gul bil", "den gul[e] bil"],
      ["et-ord", "et gul[t] hus", "det gul[e] hus"],
      ["flertal", "gul[e] biler", "de gul[e] biler"],
    ],
    note: "Kun et-ord i ubestemt ental får -t. Alle andre former får -e.",
    note_en: "Only et-words in the indefinite singular get -t. All other forms get -e.",
    note_ru:
      "Только слова с et в неопределённой форме ед. числа получают -t. Все остальные формы получают -e.",
  },
  grad: {
    columns: ["1. grad", "2. grad", "3. grad", "+ den/det/de"],
    rows: [["høj", "høj[ere]", "høj[est]", "den høj[este]"]],
    note: "2. grad: + ere (med end). 3. grad: + est. Med den, det, de: + este.",
    note_en: "Comparative: + ere (with end). Superlative: + est. With den, det, de: + este.",
    note_ru:
      "Сравнительная степень: + ere (с end). Превосходная: + est. С den, det, de: + este.",
  },
};

export default function CoreTable({ partId }) {
  const table = tables[partId];

  if (!table) return null;

  return (
    <section className={styles.box} aria-labelledby="core-heading">
      <div>
        <h2 id="core-heading" className={styles.heading}>
          Reglen kort
        </h2>
        <HelpText {...helpFor("Reglen kort")} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {table.columns.map((column, index) =>
              column ? (
                <th key={column} scope="col">
                  {column}
                </th>
              ) : (
                <td key={index} />
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 && table.columns[0] === "" ? (
                  <th key={index} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={index}>
                    <NounPhrase phrase={cell} size="small" />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p className={styles.note}>{table.note}</p>
        <HelpText en={table.note_en} ru={table.note_ru} />
      </div>
    </section>
  );
}
