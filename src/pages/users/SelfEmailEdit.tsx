import { useNavigate } from 'react-router'
import { toast } from '@/helpers/toastHelpers'
import EntryLayout from '@/layouts/EntryLayout'
import { useSelfStore } from '@/stores/useSelfStore'
import VerifyCard from '@/components/users/VerifyCard'
import { useLocation } from 'react-router'
import { useEffect } from 'react'

function SelfEmailEdit() {
    const { state } = useLocation()
    const email = state?.form?.email as string | undefined
    const navigate = useNavigate()

    const updateSelfEmail = useSelfStore((state) => state.updateEmail)

    const handle = async (form: { email: string; code: number }) => {
        const { message } = await updateSelfEmail(form)
        toast({ message, type: 'success' })
        navigate('/users/self/account/edit', { replace: true })
    }

    useEffect(() => {
        if (!email)
            navigate('/users/self/account/edit', {
                replace: true,
                state: { form: { email } },
            })
    }, [email, navigate])

    if (!email) return <div>Error...</div>

    return (
        <EntryLayout>
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <VerifyCard email={email} onVerify={handle} />
            </section>
        </EntryLayout>
    )
}

SelfEmailEdit.displayName = 'SelfEmailEdit'

export default SelfEmailEdit
