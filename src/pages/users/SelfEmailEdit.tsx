/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router'
import { toast } from '@/helpers/toastHelpers'
import EntryLayout from '@/layouts/EntryLayout'
import { useSelfStore } from '@/stores/useSelfStore'
import VerifyCard from '@/components/users/VerifyCard'
import { useLocation } from 'react-router'

function SelfEmailEdit() {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const email = query.get('email')
    if (!email) return null
    const navigate = useNavigate()

    const updateSelfEmail = useSelfStore((state) => state.updateEmail)

    const handle = async (form: { email: string; code: number }) => {
        const { message } = await updateSelfEmail(form)
        toast({ message, type: 'success' })
        navigate('/users/self/account/edit', { replace: true })
    }

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
