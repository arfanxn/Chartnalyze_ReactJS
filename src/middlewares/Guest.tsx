import { useLoadingsStore } from '@/stores/useLoadingsStore'
import { useSelfStore } from '@/stores/useSelfStore'
import { MiddlewareComponent } from '@/types/componentTypes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Guest: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()

    const self = useSelfStore((state) => state.self)
    const isLoading = useLoadingsStore((state) => state.isLoading('self'))
    const isGuest = self === null

    useEffect(() => {
        if (isLoading) return

        if (isGuest) next()
        else navigate('/dashboard', { replace: true })
    }, [isLoading, isGuest, navigate, next])

    return null
}

export default Guest
