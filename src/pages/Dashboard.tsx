import DashboardLayout from '@/layouts/DashboardLayout'
import { Link } from 'react-router'
import { useSelfStore } from '@/stores/useSelfStore'

function Dashboard() {
    const self = useSelfStore((state) => state.self)

    return (
        <DashboardLayout>
            <h1 className="text-primary text-4xl font-semibold">Dashboard</h1>
            <p className="block break-words">{JSON.stringify(self, null, 2)}</p>
            <Link
                className="bg-secondary rounded-md px-2 py-1 text-white"
                to={'/users'}
            >
                UsersIndex
            </Link>
        </DashboardLayout>
    )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
