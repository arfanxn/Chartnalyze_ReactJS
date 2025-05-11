import { useAppSelector } from '@/hooks/useAppSelector'
import { MiddlewareComponent } from '@/types/componentTypes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Guest: MiddlewareComponent = ({ next }) => {
    const navigate = useNavigate()

    const self = useAppSelector((state) => state.user.self)
    const isGuest = self === null

    useEffect(() => {
        if (isGuest) next()
        else navigate('/dashboard', { replace: true })
    }, [isGuest, navigate, next])

    return null
}

export default Guest
