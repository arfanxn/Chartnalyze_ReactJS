import { MiddlewareComponent } from '@/types/componentTypes'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelfStore } from '@/stores/useSelfStore'

const Authenticated: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()

    const self = useSelfStore((state) => state.self)
    const isAuthenticated = self !== null

    useEffect(() => {
        if (isAuthenticated) next()
        else navigate('/users/login', { replace: true })
    }, [isAuthenticated, navigate, next])

    return null
}

export default Authenticated
