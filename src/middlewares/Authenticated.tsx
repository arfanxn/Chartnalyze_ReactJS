import { MiddlewareComponent } from '@/types/componentTypes'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const Authenticated: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()

    const self = useAppSelector((state) => state.user.self)
    const isAuthenticated = self !== null

    useEffect(() => {
        if (isAuthenticated) next()
        else navigate('/users/login', { replace: true })
    }, [isAuthenticated, navigate, next])

    return null
}

export default Authenticated
