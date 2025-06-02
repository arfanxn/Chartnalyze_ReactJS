import { forwardRef, HTMLProps } from 'react'
import Header from '@/features/landing/components/Header'
import Layout from '@/core/layouts/Layout'
import classNames from 'classnames'

type Props = HTMLProps<HTMLElement>

const EntryLayout = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        return (
            <Layout ref={ref} className={classNames(className)}>
                <Header />
                <main className="flex flex-col gap-y-16 px-4 md:gap-y-24 md:px-8">
                    {props.children}
                </main>
            </Layout>
        )
    },
)

EntryLayout.displayName = 'EntryLayout'

export default EntryLayout
