import DashboardLayout from '@/core/layouts/DashboardLayout'
import UserPaginationCard from './components/UserPaginationCard'

function UsersIndex() {
    return (
        <DashboardLayout>
            <header>
                <h2 className="text-primary text-2xl font-semibold">
                    User Management
                </h2>
            </header>
            <UserPaginationCard />
        </DashboardLayout>
    )
}

UsersIndex.displayName = 'UsersIndex'

export default UsersIndex
