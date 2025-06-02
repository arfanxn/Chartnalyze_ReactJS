import TheLogo from '@/shared/components/TheLogo'
import classNames from 'classnames'
import { Link } from 'react-router'
import CButton from '@/shared/components/CButton'
import { forwardRef, HTMLProps } from 'react'
import { useSelfStore } from '@/core/stores/useSelfStore'

type Props = HTMLProps<HTMLElement>

const GUEST_NAVIGATIONS = [
    { label: 'Register', url: '/users/register' },
    { label: 'Login', url: '/users/login' },
]
const AUTHENTICATED_NAVIGATIONS = [{ label: 'Dashboard', url: '/dashboard' }]

const Header = forwardRef<HTMLDivElement, Props>(({ className }, ref) => {
    const appName = import.meta.env.VITE__APP_NAME

    const self = useSelfStore((state) => state.self)

    const navigations = self ? AUTHENTICATED_NAVIGATIONS : GUEST_NAVIGATIONS

    return (
        <header
            ref={ref}
            className={classNames(
                'fixed inset-x-0 top-0 z-50 border-b border-neutral-500 bg-white',
                className,
            )}
        >
            <nav className="mx-auto flex flex-row items-center justify-between px-4 py-2 md:px-8 lg:max-w-7xl">
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
                                className={classNames('text-sm md:text-base', {
                                    'bg-white! text-black!': index === 0,
                                })}
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
