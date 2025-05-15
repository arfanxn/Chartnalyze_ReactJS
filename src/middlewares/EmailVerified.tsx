import { MiddlewareComponent } from '@/types/componentTypes'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelfStore } from '@/stores/useSelfStore'
import { useLoadingsStore } from '@/stores/useLoadingsStore'

const EmailVerified: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useSelfStore((state) => state.self)
    const isLoading = useLoadingsStore((state) => state.isLoading('self'))
    const isEmailVerified = self && self.emailVerifiedAt

    useEffect(() => {
        if (isLoading) return

        if (isEmailVerified) next()
        else navigate('/users/self/email/verify')
    }, [isLoading, isEmailVerified, navigate, next])

    return null
}

export default EmailVerified
