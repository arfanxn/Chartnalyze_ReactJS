import { MiddlewareComponent } from '@/types/componentTypes'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelfStore } from '@/stores/useSelfStore'

const EmailNotVerified: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useSelfStore((state) => state.self)
    const isEmailNotVerified = self && self.emailVerifiedAt === null

    useEffect(() => {
        if (isEmailNotVerified) next()
        else navigate(-1)
    }, [isEmailNotVerified, navigate, next])

    return null
}

export default EmailNotVerified
