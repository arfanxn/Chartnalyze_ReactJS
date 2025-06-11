import DashboardLayout from '@/core/layouts/DashboardLayout'
import ActivityPaginationCard from '@/features/activitiesIndex/components/ActivityPaginationCard'

function ActivitiesIndex() {
    return (
        <DashboardLayout>
            <header>
                <h2 className="text-primary text-2xl font-semibold">Monitor</h2>
            </header>
            <ActivityPaginationCard />
        </DashboardLayout>
    )
}

ActivitiesIndex.displayName = 'ActivitiesIndex'

export default ActivitiesIndex
