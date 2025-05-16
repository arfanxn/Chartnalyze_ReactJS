/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router'
import { toast } from '@/helpers/toastHelpers'
import EntryLayout from '@/layouts/EntryLayout'
import { useSelfStore } from '@/stores/useSelfStore'
import VerifyCard from '@/components/users/VerifyCard'
import { useLoadingsStore } from '@/stores/useLoadingsStore'

function SelfEmailVerify() {
    const navigate = useNavigate()

    const self = useSelfStore((state) => state.self)
    const isSelfLoading = useLoadingsStore((state) => state.isLoading('self'))
    const verifySelfEmail = useSelfStore((state) => state.verifyEmail)

    const handle = async (form: { code: number }) => {
        const { message } = await verifySelfEmail(form)
        toast({ message, type: 'success' })
        navigate('/dashboard', { replace: true })
    }

    // TODO: implement better UIs for loading and errors
    if (isSelfLoading) return <div>Loading...</div>
    if (!self) return <div>Error...</div>

    return (
        <EntryLayout>
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <VerifyCard email={self.email} onVerify={handle} />
            </section>
        </EntryLayout>
    )
}

SelfEmailVerify.displayName = 'SelfEmailVerify'

export default SelfEmailVerify
