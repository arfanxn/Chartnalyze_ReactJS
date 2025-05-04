import classNames from 'classnames'
import { forwardRef, HTMLProps } from 'react'
import { useCurrentRouteTitle } from '@/hooks/useCurrentRouteTitle'
import { useScrollToTopOnRouteChange } from '@/hooks/useScrollToTopOnRouteChange'

type Props = HTMLProps<HTMLElement>

const Layout = forwardRef<HTMLElement, Props>(
    ({ className, ...props }, ref) => {
        useCurrentRouteTitle()
        useScrollToTopOnRouteChange()

        return (
            <main
                ref={ref}
                className={classNames(
                    'relative mx-auto flex flex-col space-y-16 px-4 md:space-y-24 md:px-8 lg:w-6xl',
                    className,
                )}
            >
                {props.children}
            </main>
        )
    },
)

Layout.displayName = 'Layout'

export default Layout
