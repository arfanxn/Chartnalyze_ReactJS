import DashboardLayout from '@/core/layouts/DashboardLayout'
import { Link } from 'react-router'

function UsersIndex() {
    return (
        <DashboardLayout>
            <h1 className="text-primary text-4xl font-semibold">Users Index</h1>
            <Link
                className="bg-secondary rounded-md px-2 py-1 text-white"
                to={'/dashboard'}
            >
                Dashboard
            </Link>
        </DashboardLayout>
    )
}

UsersIndex.displayName = 'UsersIndex'

export default UsersIndex
