import classNames from 'classnames'
import { forwardRef, HTMLProps } from 'react'
import { useCurrentRouteTitle } from '@/core/hooks/useCurrentRouteTitle'
import { useScrollToTopOnRouteChange } from '@/shared/hooks/useScrollToTopOnRouteChange'

type Props = HTMLProps<HTMLDivElement>

const Layout = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        useCurrentRouteTitle()
        useScrollToTopOnRouteChange()

        return (
            <div
                ref={ref}
                className={classNames(
                    'relative mx-auto lg:max-w-7xl',
                    className,
                )}
                {...props}
            >
                {props.children}
            </div>
        )
    },
)

Layout.displayName = 'Layout'

export default Layout
