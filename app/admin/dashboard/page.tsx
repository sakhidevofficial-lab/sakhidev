import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/components/admin/AdminDashboard'
export const metadata = { title: 'Dashboard — SekhDev Admin' }
export default function DashboardPage() {
  return <AdminLayout active="dashboard"><AdminDashboard /></AdminLayout>
}
