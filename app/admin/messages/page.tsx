import AdminLayout from '@/components/admin/AdminLayout'
import AdminMessages from '@/components/admin/AdminMessages'
export const metadata = { title: 'Messages — SekhDev Admin' }
export default function MessagesPage() {
  return <AdminLayout active="messages"><AdminMessages /></AdminLayout>
}
