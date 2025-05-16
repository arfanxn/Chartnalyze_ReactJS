import DashboardLayout from '@/layouts/DashboardLayout'
import SelfProfileEditCard from '@/components/users/SelfProfileEditCard'

function SelfProfileEdit() {
    return (
        <DashboardLayout>
            <header>
                <h2 className="text-primary text-2xl font-semibold">Profile</h2>
            </header>

            <SelfProfileEditCard />
        </DashboardLayout>
    )
}

SelfProfileEdit.displayName = 'SelfProfileEdit'

export default SelfProfileEdit
