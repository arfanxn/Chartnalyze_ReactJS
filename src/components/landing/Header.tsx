import React, { forwardRef } from 'react'
import TheLogo from '@/components/TheLogo'
import classNames from 'classnames'

const LandingHeader = forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const appName = import.meta.env.VITE__APP_NAME

    return (
        <header
            ref={ref}
            className={classNames(
                // Base classes
                'fixed inset-x-0 top-0 z-50 flex flex-row items-center border-b border-black/25 bg-white px-4 py-2 md:px-8',
                // Incoming dynamic classes
                className,
            )}
            {...props}
        >
            <div className="inline-flex items-center">
                <figure className="flex max-w-6 items-center justify-center md:max-w-8">
                    <TheLogo />
                </figure>
                <h1 className="text-lg font-bold md:text-2xl">{appName}</h1>
            </div>
        </header>
    )
})

export default LandingHeader
