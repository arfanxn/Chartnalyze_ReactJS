import { forwardRef, HTMLProps, useRef } from 'react'
import Header from '@/core/components/dashboard/Header'
import Layout from '@/core/layouts/Layout'
import classNames from 'classnames'
import useElementSize from '@/shared/hooks/useElementSize'
import Sidebar from '@/core/components/dashboard/Sidebar'

type Props = HTMLProps<HTMLElement>

const DashboardLayout = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const headerRef = useRef<HTMLDivElement>(null)
        const sidebarRef = useRef<HTMLDivElement>(null)
        const { height: headerHeight } =
            useElementSize<HTMLDivElement>(headerRef)
        const { width: sidebarWidth } =
            useElementSize<HTMLDivElement>(sidebarRef)

        return (
            <Layout ref={ref} className={classNames(className)}>
                <Header ref={headerRef} />
                <div
                    style={{
                        marginTop: headerHeight,
                    }}
                >
                    <Sidebar ref={sidebarRef} />
                    <main
                        className="space-y-4 overflow-x-hidden px-4 pt-4 pb-8 md:space-y-4 md:px-8 md:pt-4 md:pb-8"
                        style={{ marginLeft: sidebarWidth }}
                    >
                        {props.children}
                    </main>
                </div>
            </Layout>
        )
    },
)

DashboardLayout.displayName = 'DashboardLayout'

export default DashboardLayout
