import AdminLayout from '@/components/admin/AdminLayout'
import AdminSettings from '@/components/admin/AdminSettings'
export const metadata = { title: 'Settings — SekhDev Admin' }
export default function Page() {
  return <AdminLayout active="settings"><AdminSettings /></AdminLayout>
}
