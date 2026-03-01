import AdminLayout from '@/components/admin/AdminLayout'
import AdminProjects from '@/components/admin/AdminProjects'
export const metadata = { title: 'Projects — SekhDev Admin' }
export default function Page() {
  return <AdminLayout active="projects"><AdminProjects /></AdminLayout>
}
