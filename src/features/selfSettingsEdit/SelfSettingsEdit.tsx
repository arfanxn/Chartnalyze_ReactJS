import DashboardLayout from '@/core/layouts/DashboardLayout'
import SelfPasswordEditCard from '@/features/selfSettingsEdit/components/SelfPasswordEditCard'

function SelfSettingsEdit() {
    return (
        <DashboardLayout>
            <header>
                <h2 className="text-primary text-2xl font-semibold">
                    Settings
                </h2>
            </header>

            <SelfPasswordEditCard />
        </DashboardLayout>
    )
}

SelfSettingsEdit.displayName = 'SelfSettingsEdit'

export default SelfSettingsEdit
