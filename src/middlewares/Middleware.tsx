import React, { useEffect } from 'react'
import { Outlet } from 'react-router'

type MiddlewareComponent = React.FC<{ children?: never }>

type Props = {
    children?: React.ReactNode
    middlewares?: MiddlewareComponent[]
}

const Middleware = ({ children, middlewares }: Props) => {
    useEffect(() => {
        //
    }, [])

    return (
        <>
            {middlewares &&
                middlewares.map((Middleware, index) => (
                    <Middleware key={index} />
                ))}
            {children || <Outlet />}
        </>
    )
}

export default Middleware
