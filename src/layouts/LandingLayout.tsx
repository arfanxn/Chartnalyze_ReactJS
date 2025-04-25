import { ChildrenProps, ClassNameProps } from '@/types/componentTypes'
import { ReactNode } from 'react'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'
import Layout from '@/layouts/Layout'
import classNames from 'classnames'

type Props = ChildrenProps & ClassNameProps & {}

const LandingLayout = (props: Props): ReactNode => {
    return (
        <Layout
            className={classNames(
                'relative flex flex-col px-4 md:px-8',
                props.className,
            )}
        >
            <Header />
            {props.children}
            <Footer />
        </Layout>
    )
}

export default LandingLayout
