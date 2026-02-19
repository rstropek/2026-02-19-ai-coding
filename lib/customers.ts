import { getDb } from './db';

export interface Customer {
  id: number;
  name: string;
  short_name: string | null;
  street: string | null;
  postal_code: string | null;
  city: string | null;
  country_id: number | null;
}

export interface CustomerWithCountry extends Customer {
  country_code: string | null;
  country_name: string | null;
}

export interface CreateCustomerInput {
  name: string;
  short_name?: string;
  street?: string;
  postal_code?: string;
  city?: string;
  country_id?: number | null;
}

export interface UpdateCustomerInput {
  id: number;
  name: string;
  short_name?: string;
  street?: string;
  postal_code?: string;
  city?: string;
  country_id?: number | null;
}

export function getAllCustomers(): CustomerWithCountry[] {
  const db = getDb();
  return db.prepare(`
    SELECT 
      c.*,
      co.code as country_code,
      co.name as country_name
    FROM customers c
    LEFT JOIN countries co ON c.country_id = co.id
    ORDER BY c.name
  `).all() as CustomerWithCountry[];
}

export function getCustomerById(id: number): Customer | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM customers WHERE id = ?').get(id) as Customer | undefined;
}

export function createCustomer(input: CreateCustomerInput): Customer {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO customers (name, short_name, street, postal_code, city, country_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    input.name,
    input.short_name || null,
    input.street || null,
    input.postal_code || null,
    input.city || null,
    input.country_id || null
  );
  
  return getCustomerById(result.lastInsertRowid as number)!;
}

export function updateCustomer(input: UpdateCustomerInput): Customer {
  const db = getDb();
  db.prepare(`
    UPDATE customers
    SET name = ?, short_name = ?, street = ?, postal_code = ?, city = ?, country_id = ?
    WHERE id = ?
  `).run(
    input.name,
    input.short_name || null,
    input.street || null,
    input.postal_code || null,
    input.city || null,
    input.country_id || null,
    input.id
  );
  
  return getCustomerById(input.id)!;
}

export function deleteCustomer(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM customers WHERE id = ?').run(id);
}
