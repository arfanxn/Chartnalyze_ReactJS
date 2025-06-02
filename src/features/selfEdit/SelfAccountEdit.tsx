import DashboardLayout from '@/core/layouts/DashboardLayout'
import SelfProfileEditCard from '@/features/selfEdit/components/SelfProfileEditCard'

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
