import DashboardLayout from '@/layouts/DashboardLayout'
import SelfProfileEditCard from '@/components/users/SelfProfileEditCard'

function SelfAccountEdit() {
    return (
        <DashboardLayout>
            <header>
                <h2 className="text-primary text-2xl font-semibold">Account</h2>
            </header>

            <SelfProfileEditCard />
        </DashboardLayout>
    )
}

SelfAccountEdit.displayName = 'SelfAccountEdit'

export default SelfAccountEdit
