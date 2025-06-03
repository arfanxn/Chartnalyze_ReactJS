import EntryLayout from '@/core/layouts/EntryLayout'
import CCard from '@/shared/components/CCard'
import { useNavigate } from 'react-router-dom'
import CIcon from '@/shared/components/CIcon'
import CButtonIconned from '@/shared/components/CButtonIconned'

function NotFound() {
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1) // Go back if there's history
        } else {
            navigate('/dashboard') // Default to dashboard
        }
    }

    return (
        <EntryLayout>
            <div className="relative h-screen w-full">
                <CCard className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform p-8 shadow-xl">
                    <div className="flex flex-col items-center justify-center space-y-6 text-center">
                        <div className="relative">
                            <h2 className="text-primary text-9xl font-bold opacity-25">
                                404
                            </h2>
                            <CIcon
                                icon="lucide:compass"
                                className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-6xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-black">
                                Page Not Found
                            </h3>
                            <p className="text-neutral-600">
                                Oops! The page you're looking for doesn't exist
                                or has been moved.
                            </p>
                        </div>

                        <div className="pt-4">
                            <CButtonIconned
                                type="button"
                                onClick={handleGoBack}
                                className="flex flex-row-reverse items-center gap-2"
                                icon="lucide:arrow-left"
                                iconClassName="text-lg!"
                                label={
                                    window.history.state?.idx > 0
                                        ? 'Return to Previous Page'
                                        : 'Go to Dashboard'
                                }
                            />
                        </div>
                    </div>
                </CCard>
            </div>
        </EntryLayout>
    )
}

NotFound.displayName = 'NotFound'

export default NotFound
