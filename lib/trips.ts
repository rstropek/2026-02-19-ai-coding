import { getDb } from './db';

export interface Trip {
  id: number;
  employee_id: number;
  customer_id: number | null;
  start_date: string;
  end_date: string;
  purpose: string;
  destination: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface TripWithDetails extends Trip {
  employee_name: string;
  customer_name: string | null;
}

export interface CreateTripInput {
  employee_id: number;
  customer_id?: number | null;
  start_date: string;
  end_date: string;
  purpose: string;
  destination: string;
}

export interface UpdateTripInput {
  id: number;
  customer_id?: number | null;
  start_date: string;
  end_date: string;
  purpose: string;
  destination: string;
  status?: 'draft' | 'submitted' | 'approved' | 'rejected';
}

export function getAllTrips(): TripWithDetails[] {
  const db = getDb();
  return db.prepare(`
    SELECT 
      t.*,
      u.name as employee_name,
      c.name as customer_name
    FROM trips t
    JOIN users u ON t.employee_id = u.id
    LEFT JOIN customers c ON t.customer_id = c.id
    ORDER BY t.start_date DESC
  `).all() as TripWithDetails[];
}

export function getTripsByEmployee(employeeId: number): TripWithDetails[] {
  const db = getDb();
  return db.prepare(`
    SELECT 
      t.*,
      u.name as employee_name,
      c.name as customer_name
    FROM trips t
    JOIN users u ON t.employee_id = u.id
    LEFT JOIN customers c ON t.customer_id = c.id
    WHERE t.employee_id = ?
    ORDER BY t.start_date DESC
  `).all(employeeId) as TripWithDetails[];
}

export function getTripById(id: number): Trip | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM trips WHERE id = ?').get(id) as Trip | undefined;
}

export function createTrip(input: CreateTripInput): Trip {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO trips (employee_id, customer_id, start_date, end_date, purpose, destination, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    input.employee_id,
    input.customer_id || null,
    input.start_date,
    input.end_date,
    input.purpose,
    input.destination,
    'draft'
  );
  
  return getTripById(result.lastInsertRowid as number)!;
}

export function updateTrip(input: UpdateTripInput): Trip {
  const db = getDb();
  db.prepare(`
    UPDATE trips
    SET 
      customer_id = ?,
      start_date = ?,
      end_date = ?,
      purpose = ?,
      destination = ?,
      status = ?,
      updated_at = datetime('now')
    WHERE id = ?
  `).run(
    input.customer_id || null,
    input.start_date,
    input.end_date,
    input.purpose,
    input.destination,
    input.status || 'draft',
    input.id
  );
  
  return getTripById(input.id)!;
}

export function deleteTrip(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM trips WHERE id = ?').run(id);
}

export function submitTrip(id: number): Trip {
  const db = getDb();
  db.prepare(`
    UPDATE trips
    SET status = 'submitted', updated_at = datetime('now')
    WHERE id = ?
  `).run(id);
  
  return getTripById(id)!;
}

export function approveTrip(id: number): Trip {
  const db = getDb();
  db.prepare(`
    UPDATE trips
    SET status = 'approved', updated_at = datetime('now')
    WHERE id = ?
  `).run(id);
  
  return getTripById(id)!;
}

export function rejectTrip(id: number): Trip {
  const db = getDb();
  db.prepare(`
    UPDATE trips
    SET status = 'rejected', updated_at = datetime('now')
    WHERE id = ?
  `).run(id);
  
  return getTripById(id)!;
}