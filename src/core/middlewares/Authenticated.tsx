import { MiddlewareComponent } from '@/shared/types/components'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelfStore } from '@/core/stores/useSelfStore'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'

const Authenticated: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()
    const self = useSelfStore((state) => state.self)
    const isLoading = useLoadingsStore((state) => state.isLoading('self'))
    const isAuthenticated = self !== null

    useEffect(() => {
        if (isLoading) return

        if (isAuthenticated) next()
        else navigate('/users/login', { replace: true })
    }, [isLoading, isAuthenticated, navigate, next])

    return null
}

export default Authenticated
