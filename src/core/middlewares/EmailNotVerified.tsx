import { MiddlewareComponent } from '@/shared/types/components'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelfStore } from '@/core/stores/useSelfStore'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'

const EmailNotVerified: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useSelfStore((state) => state.self)
    const isLoading = useLoadingsStore((state) => state.isLoading('self'))
    const isEmailNotVerified = self && self.emailVerifiedAt === null

    useEffect(() => {
        if (isLoading) return

        if (isEmailNotVerified) next()
        else navigate(-1)
    }, [isLoading, isEmailNotVerified, navigate, next])

    return null
}

export default EmailNotVerified
