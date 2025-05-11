import { MiddlewareComponent } from '@/types/componentTypes'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const EmailVerified: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useAppSelector((state) => state.user.self)
    const isEmailVerified = self && self.emailVerifiedAt

    useEffect(() => {
        if (isEmailVerified) next()
        else navigate('/users/verify')
    }, [isEmailVerified, navigate, next])

    return null
}

export default EmailVerified
