import AdminLayout from '@/components/admin/AdminLayout'
import AdminTeam from '@/components/admin/AdminTeam'
export const metadata = { title: 'Team — SekhDev Admin' }
export default function Page() {
  return <AdminLayout active="team"><AdminTeam /></AdminLayout>
}
