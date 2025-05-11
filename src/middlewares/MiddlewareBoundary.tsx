import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { type MiddlewareComponent } from '@/types/componentTypes'
import { useLocation } from 'react-router'

export type MiddlewareBoundaryProps = {
    children?: React.ReactNode
    middlewares?: MiddlewareComponent[]
}

const MiddlewareBoundary = ({
    children,
    middlewares,
}: MiddlewareBoundaryProps) => {
    const [runningMiddlewaresCount, setRunningMiddlewaresCount] = useState(0)
    const location = useLocation()

    const next = () => {
        setRunningMiddlewaresCount((prev) => prev - 1)
    }

    useEffect(() => {
        setRunningMiddlewaresCount(middlewares?.length || 0)
    }, [location.key, middlewares])

    return (
        <>
            {middlewares &&
                middlewares.map((MC, index) => (
                    <MC key={`${location.key}-${index}`} next={next} />
                ))}

            {runningMiddlewaresCount === 0 ? (
                children || <Outlet />
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default MiddlewareBoundary
