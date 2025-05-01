import TheLogo from '@/components/TheLogo'
import classNames from 'classnames'
import { ClassNameProps } from '@/types/componentTypes'
import { Link } from 'react-router'
import CButton from '../CButton'

type Props = ClassNameProps & {}

const Header = ({ className }: Props) => {
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
            className={classNames(
                'fixed inset-x-0 top-0 z-50 flex flex-row items-center justify-between border-b border-black/25 bg-white px-4 py-2 md:px-8',
                className,
            )}
        >
            <div className="inline-flex items-center">
                <figure className="flex max-w-8 items-center justify-center md:max-w-10">
                    <TheLogo />
                </figure>
                <h1 className="text-lg font-bold md:text-2xl">{appName}</h1>
            </div>

            <nav className="flex flex-row gap-x-2">
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
            </nav>
        </header>
    )
}

export default Header
