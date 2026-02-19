import { getDb } from './db';

export type UserRole = 'employee' | 'accounting';

export interface User {
  id: number;
  username: string;
  name: string;
  role: UserRole;
  is_admin: number;
}

export interface CreateUserInput {
  username: string;
  name: string;
  role: UserRole;
  is_admin: boolean;
}

export interface UpdateUserInput {
  id: number;
  username: string;
  name: string;
  role: UserRole;
  is_admin: boolean;
}

export function getAllUsers(): User[] {
  const db = getDb();
  return db.prepare('SELECT * FROM users ORDER BY name').all() as User[];
}

export function getUserByUsername(username: string): User | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;
}

export function getUserById(id: number): User | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
}

export function createUser(input: CreateUserInput): User {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO users (username, name, role, is_admin)
    VALUES (?, ?, ?, ?)
  `).run(input.username, input.name, input.role, input.is_admin ? 1 : 0);
  
  return getUserById(result.lastInsertRowid as number)!;
}

export function updateUser(input: UpdateUserInput): User {
  const db = getDb();
  db.prepare(`
    UPDATE users
    SET username = ?, name = ?, role = ?, is_admin = ?
    WHERE id = ?
  `).run(input.username, input.name, input.role, input.is_admin ? 1 : 0, input.id);
  
  return getUserById(input.id)!;
}

export function deleteUser(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM users WHERE id = ?').run(id);
}
