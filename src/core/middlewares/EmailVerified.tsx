import { MiddlewareComponent } from '@/shared/types/components'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelfStore } from '@/core/stores/useSelfStore'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'

const EmailVerified: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useSelfStore((state) => state.self)
    const isLoading = useLoadingsStore((state) => state.isLoading('self'))
    const isEmailVerified = self && self.emailVerifiedAt

    useEffect(() => {
        if (isLoading) return

        if (isEmailVerified) next()
        else
            navigate('/otps/verify?action=verify-self-email', {
                replace: true,
                state: { form: { email: self?.email } },
            })
    }, [isLoading, isEmailVerified, self, navigate, next])

    return null
}

export default EmailVerified
