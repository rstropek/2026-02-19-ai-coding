import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'reisekosten.db');

let db: Database.Database | null = null;
let initialized = false;

export function getDb(): Database.Database {
  if (!db) {
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    
    if (!initialized) {
      initDb(db);
      initialized = true;
    }
  }
  return db;
}

function initDb(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT    UNIQUE NOT NULL,
      name     TEXT    NOT NULL,
      role     TEXT    NOT NULL CHECK(role IN ('employee','accounting')),
      is_admin INTEGER NOT NULL DEFAULT 0
    );
  `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS countries (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT    UNIQUE NOT NULL,
      name TEXT    NOT NULL
    );
  `);

  database.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    UNIQUE NOT NULL,
      short_name  TEXT,
      street      TEXT,
      postal_code TEXT,
      city        TEXT,
      country_id  INTEGER REFERENCES countries(id) ON DELETE SET NULL
    );
  `);

  const userCount = database.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  
  if (userCount.count === 0) {
    database.prepare(`
      INSERT INTO users (username, name, role, is_admin)
      VALUES (?, ?, ?, ?)
    `).run('admin', 'Administrator', 'employee', 1);
  }

  const countryCount = database.prepare('SELECT COUNT(*) as count FROM countries').get() as { count: number };
  
  if (countryCount.count === 0) {
    const insertCountry = database.prepare('INSERT INTO countries (code, name) VALUES (?, ?)');
    insertCountry.run('AT', 'Österreich');
    insertCountry.run('DE', 'Deutschland');
    insertCountry.run('CH', 'Schweiz');
    insertCountry.run('IT', 'Italien');
    insertCountry.run('FR', 'Frankreich');
    insertCountry.run('HU', 'Ungarn');
    insertCountry.run('CZ', 'Tschechien');
    insertCountry.run('SK', 'Slowakei');
    insertCountry.run('SI', 'Slowenien');
  }
}
