## Projektinhalt

In diesem Projekt wird eine einfache Reisekostenabrechnung implementiert. Mitarbeiter:innen erfassen Reisen mit Bezug zu Kunden sowie Barauslagen. Mitarbeiter:innen aus dem Bereich der Buchhaltung überprüfen die eingereichten Reisen und bestätigen den Erhalt der entsprechenden Belege.

## Sprache

Die Sprache für Spezifikationen und Dokumentation ist Deutsch. Im Quellcode wird jedoch immer Englisch verwendet. Englisch verwenden wir auch für technische Dokumente.

Englisch ist auf jeden Fall für alle Variablen, Funktionsnamen, Klassennamen, Tabellen, Tabellenspalten, etc. zu verwenden.

## Technologien

- Programmiersprache: TypeScript
- Framework: Next.js
- Datenbank: SQLite ohne ORM (volle Kontrolle über SQL-Abfragen)
- Runtime: Node.js
- Session Management: iron-session
- Validation: Zod
- CSS: Kein Framework, reines CSS (inkl. Nested CSS)
- Wenn Tests, dann mit Jest; aktuell keine Frontend-Tests geplant

## Guidelines

- Abhängigkeiten immer mit `npm install` hinzufügen, nicht durch manuelles Eintragen in `package.json`.
- Immer die aktuellste Version von Abhängigkeiten verwenden, es sei denn, es gibt spezifische Gründe für eine ältere Version.
- Alle Funktionen rund um das Projekt (z.B. Build, Tests starten, Anwendung starten) müssen mit Scripts in `package.json` ausführbar sein.
