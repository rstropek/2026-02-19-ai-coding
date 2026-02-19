import { getAllUsers } from '@/lib/users';
import UserManagementClient from './client';

export default function BenutzerPage() {
  const users = getAllUsers();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Benutzerverwaltung</h1>
      </div>
      <UserManagementClient users={users} />
    </div>
  );
}
