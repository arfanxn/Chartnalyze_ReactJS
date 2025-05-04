import { useSelector } from 'react-redux'
import { RootState } from '@/stores'
import Layout from '@/layouts/Layout'

function Dashboard() {
    const user = useSelector((state: RootState) => state.user.self)

    return (
        <Layout>
            <h1 className="text-primary text-4xl font-semibold">Dashboard</h1>
            <p>{JSON.stringify(user)}</p>
        </Layout>
    )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
