import { MiddlewareComponent } from '@/types/componentTypes'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelfStore } from '@/stores/useSelfStore'

const EmailVerified: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useSelfStore((state) => state.self)
    const isEmailVerified = self && self.emailVerifiedAt

    useEffect(() => {
        if (isEmailVerified) next()
        else navigate('/users/self/email/verify')
    }, [isEmailVerified, navigate, next])

    return null
}

export default EmailVerified
