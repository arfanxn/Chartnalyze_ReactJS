import { forwardRef, HTMLProps, useEffect, useRef, useState } from 'react'
import Footer from '@/features/landing/components/Footer'
import Header from '@/features/landing/components/Header'
import Layout from '@/core/layouts/Layout'
import classNames from 'classnames'

type Props = HTMLProps<HTMLElement>

const LandingLayout = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const footerRef = useRef<HTMLDivElement>(null)
        const [isFooterVisible, setIsFooterVisible] = useState(false)

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => setIsFooterVisible(entry.isIntersecting),
                { threshold: 0.1 },
            )

            const current = footerRef.current
            if (current) observer.observe(current)

            return () => {
                if (current) observer.unobserve(current)
                return undefined
            }
        }, [])

        return (
            <Layout ref={ref} className={classNames(className)}>
                <Header
                    className={classNames('transition-opacity duration-300', {
                        'opacity-0': isFooterVisible,
                    })}
                />
                <main className="flex flex-col gap-y-16 px-4 md:gap-y-24 md:px-8">
                    {props.children}
                </main>
                <Footer ref={footerRef} className="mt-16 md:mt-24" />
            </Layout>
        )
    },
)

LandingLayout.displayName = 'LandingLayout'

export default LandingLayout
