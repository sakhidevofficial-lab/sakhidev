import AdminLayout from '@/components/admin/AdminLayout'
import AdminServices from '@/components/admin/AdminServices'
export const metadata = { title: 'Services — SekhDev Admin' }
export default function Page() {
  return <AdminLayout active="services"><AdminServices /></AdminLayout>
}
