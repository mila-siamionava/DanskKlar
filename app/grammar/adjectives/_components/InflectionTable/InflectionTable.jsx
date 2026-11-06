import NounPhrase from "../NounPhrase/NounPhrase";

import styles from "./InflectionTable.module.css";

const COLUMNS = [
  "Ental ubestemt",
  "Ental bestemt",
  "Flertal ubestemt",
  "Flertal bestemt",
];

/*
  The four forms of the adjective, one noun per row,
  like the tables in the teaching slides.
  On a phone each row becomes a card with labelled forms.
*/
export default function InflectionTable({ rows }) {
  return (
    <section
      className={styles.wrapper}
      aria-labelledby="inflection-heading"
    >
      <h3 id="inflection-heading" className={styles.heading}>
        Bøjningsskema
      </h3>

      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td key={index} data-label={COLUMNS[index]}>
                  <NounPhrase phrase={cell} size="table" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
