import DashboardLayout from '@/layouts/DashboardLayout'
import { Link } from 'react-router'

function NotificationsIndex() {
    return (
        <DashboardLayout>
            <h1 className="text-primary text-4xl font-semibold">
                Notifications Index
            </h1>
            <Link
                className="bg-secondary rounded-md px-2 py-1 text-white"
                to={'/dashboard'}
            >
                Dashboard
            </Link>
        </DashboardLayout>
    )
}

NotificationsIndex.displayName = 'NotificationsIndex'

export default NotificationsIndex
