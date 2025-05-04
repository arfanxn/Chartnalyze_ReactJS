import TheLogo from '@/components/TheLogo'
import classNames from 'classnames'
import { Link } from 'react-router'
import CButton from '../CButton'
import { forwardRef, HTMLProps } from 'react'

type Props = HTMLProps<HTMLElement>

const Header = forwardRef<HTMLDivElement, Props>(({ className }, ref) => {
    const appName = import.meta.env.VITE__APP_NAME
    const navigations = [
        {
            label: 'Register',
            url: '/register',
        },
        {
            label: 'Login',
            url: '/login',
        },
    ]

    return (
        <header
            ref={ref}
            className={classNames(
                'fixed inset-x-0 top-0 z-50 border-b border-black/25 bg-white',
                className,
            )}
        >
            <nav className="mx-auto flex flex-row items-center justify-between px-4 py-2 md:px-8 lg:w-6xl">
                <Link to="/" className="inline-flex items-center">
                    <figure className="flex max-w-8 items-center justify-center md:max-w-10">
                        <TheLogo />
                    </figure>
                    <h1 className="text-lg font-bold md:text-2xl">{appName}</h1>
                </Link>

                <div className="flex flex-row gap-x-2">
                    {navigations.map(({ label, url }, index) => (
                        <Link key={label} to={url}>
                            <CButton
                                className={classNames(
                                    'text-sm outline outline-black md:text-base',
                                    {
                                        'bg-white! text-black!': index === 0,
                                    },
                                )}
                            >
                                {label}
                            </CButton>
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
})

Header.displayName = 'Header'

export default Header
