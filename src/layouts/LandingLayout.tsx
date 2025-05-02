import { ChildrenProps, ClassNameProps } from '@/types/componentTypes'
import { useEffect, useRef, useState } from 'react'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'
import Layout from '@/layouts/Layout'
import classNames from 'classnames'

const LandingLayout = ({
    children,
    className,
}: ChildrenProps & ClassNameProps) => {
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
        <Layout className={classNames(className)}>
            <Header
                className={classNames('transition-opacity duration-300', {
                    'opacity-0': isFooterVisible,
                })}
            />
            {children}
            <Footer ref={footerRef} />
        </Layout>
    )
}

export default LandingLayout
