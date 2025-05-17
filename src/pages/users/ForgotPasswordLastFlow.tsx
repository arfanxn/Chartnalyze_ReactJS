import { useNavigate } from 'react-router'
import EntryLayout from '@/layouts/EntryLayout'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import * as userService from '@/services/userService'
import VerifyCard from '@/components/users/VerifyCard'
import { toast } from '@/helpers/toastHelpers'

function ForgotPasswordFirstFlow() {
    const location = useLocation()
    const navigate = useNavigate()

    const {
        email,
        password,
        confirmPassword,
    }: {
        email: string | undefined
        password: string | undefined
        confirmPassword: string | undefined
    } = location.state?.form ?? {}

    const handle = async ({ code }: { code: number }) => {
        if (!email || !password || !confirmPassword) return
        const { message } = await userService.resetPassword({
            email,
            password,
            confirmPassword,
            code,
        })
        toast({ message, type: 'success' })
        navigate('/users/login', { replace: true })
    }

    useEffect(() => {
        if (!email) navigate('/users/forgot-password/flows/first')

        if (!password || !confirmPassword)
            navigate('/users/forgot-password/flows/second')
    }, [email, password, confirmPassword, navigate])

    if (!email) return <div>Error...</div>

    return (
        <EntryLayout>
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <VerifyCard email={email} onVerify={handle} />
            </section>
        </EntryLayout>
    )
}

export default ForgotPasswordFirstFlow
