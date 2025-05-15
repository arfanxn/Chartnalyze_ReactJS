import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import { type MiddlewareComponent } from '@/types/componentTypes'
import { useLocation } from 'react-router'

export type MiddlewareBoundaryProps = {
    children?: React.ReactNode
    element?: React.JSX.Element
    middlewares?: MiddlewareComponent[]
}

const MiddlewareBoundary = ({
    children,
    element,
    middlewares = [],
}: MiddlewareBoundaryProps) => {
    const location = useLocation()

    const next = () => {
        //
    }

    useEffect(() => {
        //
    }, [])

    return (
        <>
            {middlewares.map((Middleware, index) => (
                <Middleware key={`${location.key}-${index}`} next={next} />
            ))}

            {children || element || <Outlet />}
        </>
    )
}

export default MiddlewareBoundary
