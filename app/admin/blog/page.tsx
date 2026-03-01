import AdminLayout from '@/components/admin/AdminLayout'
import AdminBlog from '@/components/admin/AdminBlog'
export const metadata = { title: 'Blog — SekhDev Admin' }
export default function Page() {
  return <AdminLayout active="blog"><AdminBlog /></AdminLayout>
}
