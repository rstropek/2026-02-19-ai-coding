import { getDb } from './db';

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface CreateCountryInput {
  code: string;
  name: string;
}

export interface UpdateCountryInput {
  id: number;
  code: string;
  name: string;
}

export function getAllCountries(): Country[] {
  const db = getDb();
  return db.prepare('SELECT * FROM countries ORDER BY name').all() as Country[];
}

export function getCountryById(id: number): Country | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM countries WHERE id = ?').get(id) as Country | undefined;
}

export function createCountry(input: CreateCountryInput): Country {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO countries (code, name)
    VALUES (?, ?)
  `).run(input.code, input.name);
  
  return getCountryById(result.lastInsertRowid as number)!;
}

export function updateCountry(input: UpdateCountryInput): Country {
  const db = getDb();
  db.prepare(`
    UPDATE countries
    SET code = ?, name = ?
    WHERE id = ?
  `).run(input.code, input.name, input.id);
  
  return getCountryById(input.id)!;
}

export function deleteCountry(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM countries WHERE id = ?').run(id);
}
