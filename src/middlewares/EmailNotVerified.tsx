import { MiddlewareComponent } from '@/types/componentTypes'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const EmailNotVerified: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useAppSelector((state) => state.user.self)
    const isEmailNotVerified = self && self.emailVerifiedAt === null

    useEffect(() => {
        if (isEmailNotVerified) next()
        else navigate(-1)
    }, [isEmailNotVerified, navigate, next])

    return null
}

export default EmailNotVerified
