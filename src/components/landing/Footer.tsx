import TheLogo from '@/components/TheLogo'
import CIcon from '@/components/CIcon'
import classNames from 'classnames'
import React, { forwardRef } from 'react'
import moment from 'moment'
import { Link } from 'react-router'

const Footer = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const appName = import.meta.env.VITE__APP_NAME
        const appDescription = `Chartnalyze combines AI-powered market analysis with
                    easy-to-understand financial education, helping both
                    beginners and experts make confident, data-driven investment
                    decisions in real-time.`

        const navigations = [
            {
                label: 'Home',
                url: '/',
            },
            {
                label: 'Register',
                url: '/register',
            },
            {
                label: 'Login',
                url: '/login',
            },
            {
                label: 'Forgot Password',
                url: '/forgot-password',
            },
        ]

        const downloads = [
            {
                label: 'Android',
                url: '', // TODO: add url to playstore
            },
            {
                label: 'iOS (soon)',
                url: '', // TODO: add url to playstore
            },
        ]

        return (
            <footer
                ref={ref}
                className={classNames(
                    'absolute inset-x-0 top-full z-50 flex min-h-screen flex-col space-y-8 bg-white px-4 py-2 md:px-8 md:py-2',
                    className,
                )}
                {...props}
            >
                <section className="flex flex-row justify-between">
                    <div className="space-y-8">
                        <div className="ml-[-1rem] inline-flex items-center">
                            <figure className="flex size-16 items-center justify-center md:size-24">
                                <TheLogo />
                            </figure>
                            <h1 className="ml-[-0.5rem] text-4xl font-bold md:text-6xl">
                                {appName}
                            </h1>
                        </div>
                        <p className="text-lg md:text-2xl">{appDescription}</p>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-y-2 md:gap-y-4">
                    <nav className="flex flex-col justify-start gap-y-2 md:gap-y-4">
                        <h2 className="text-lg font-semibold md:text-2xl">
                            Navigation
                        </h2>

                        <ul className="flex flex-col gap-y-2 md:gap-y-4">
                            {navigations.map(({ label, url }) => (
                                <li key={label}>
                                    <a
                                        className="text-lg hover:underline md:text-2xl"
                                        href={url}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav className="flex flex-col justify-start gap-y-2 md:gap-y-4">
                        <h2 className="text-lg font-semibold md:text-2xl">
                            Download
                        </h2>

                        <ul className="flex flex-col gap-y-2 md:gap-y-4">
                            {downloads.map(({ label, url }) => (
                                <li key={label}>
                                    <Link
                                        className="text-lg hover:underline md:text-2xl"
                                        to={url}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </section>

                <hr className="border-1 border-black" />

                <section>
                    <div className="inline-flex items-center gap-x-1">
                        <CIcon
                            icon="lucide:copyright"
                            className="text-xl md:text-2xl"
                        />
                        <p className="text-base md:text-lg">
                            {moment().format('YYYY')} {appName} All Rights
                            Reserved
                        </p>
                    </div>
                </section>
            </footer>
        )
    },
)

export default Footer
