import DashboardLayout from '@/core/layouts/DashboardLayout'
import RolePaginationCard from '@/features/rolesIndex/components/RolePaginationCard'

function UsersIndex() {
    return (
        <DashboardLayout>
            <header>
                <h2 className="text-primary text-2xl font-semibold">
                    User Management
                </h2>
            </header>
            <RolePaginationCard />
        </DashboardLayout>
    )
}

UsersIndex.displayName = 'UsersIndex'

export default UsersIndex
