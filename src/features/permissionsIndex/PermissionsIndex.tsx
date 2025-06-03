import DashboardLayout from '@/core/layouts/DashboardLayout'
import PermissionPaginationCard from '@/features/permissionsIndex/components/PermissionPaginationCard'

function PermissionsIndex() {
    return (
        <DashboardLayout>
            <header>
                <h2 className="text-primary text-2xl font-semibold">
                    User Management
                </h2>
            </header>
            <PermissionPaginationCard />
        </DashboardLayout>
    )
}

PermissionsIndex.displayName = 'PermissionsIndex'

export default PermissionsIndex
