/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router'
import { toast } from '@/helpers/toastHelpers'
import EntryLayout from '@/layouts/EntryLayout'
import { useSelfStore } from '@/stores/useSelfStore'
import VerifyCard from '@/components/users/VerifyCard'

function SelfEmailVerify() {
    console.log('SelfEmailVerify is mounted')

    const navigate = useNavigate()

    const self = useSelfStore((state) => state.self)
    if (self === null) return null
    const verifySelfEmail = useSelfStore((state) => state.verifyEmail)

    const handle = async (form: { code: number }) => {
        const { message } = await verifySelfEmail(form)
        toast({ message, type: 'success' })
        navigate('/dashboard', { replace: true })
    }

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
