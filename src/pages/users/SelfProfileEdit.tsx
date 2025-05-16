import DashboardLayout from '@/layouts/DashboardLayout'
import SelfProfileEditCard from '@/components/users/SelfProfileEditCard'

function SelfProfileEdit() {
    return (
        <DashboardLayout>
            <h1 className="text-primary text-2xl font-semibold">Profile</h1>

            <SelfProfileEditCard />
        </DashboardLayout>
    )
}

SelfProfileEdit.displayName = 'SelfProfileEdit'

export default SelfProfileEdit
