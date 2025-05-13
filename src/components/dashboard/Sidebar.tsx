import classNames from 'classnames'
import { Link } from 'react-router'
import { forwardRef, HTMLProps } from 'react'
import CIcon from '../CIcon'
import { useLocation } from 'react-router'

type Props = HTMLProps<HTMLElement>

type Navigation = {
    label: string
    icon: string
    url: string
}

type NavigationGroup = {
    group: string
    items: Navigation[]
}

const NAVIGATIONS: NavigationGroup[] = [
    {
        group: 'Menu',
        items: [
            {
                label: 'Dashboard',
                icon: 'lucide:layout-dashboard',
                url: '/dashboard',
            },
        ],
    },
    {
        group: 'User Management',
        items: [
            {
                label: 'Users',
                icon: 'lucide:users-round',
                url: '/users',
            },
            {
                label: 'Roles',
                icon: 'lucide:shield',
                url: '/roles',
            },
            {
                label: 'Permissions',
                icon: 'lucide:key-round',
                url: '/permissions',
            },
        ],
    },
]

const Sidebar = forwardRef<HTMLElement, Props>(
    ({ className, ...props }, ref) => {
        const location = useLocation()

        return (
            <aside
                ref={ref}
                className={classNames(
                    'fixed z-50 hidden h-screen w-full border-t border-r border-neutral-500 bg-white px-4 py-4 md:block md:max-w-64 md:px-8',
                    className,
                )}
                {...props}
            >
                <nav className="space-y-4">
                    {NAVIGATIONS.map(({ group, items }) => (
                        <section key={group}>
                            <h2 className="font-medium text-black md:text-sm">
                                {group}
                            </h2>
                            <ul className="mt-2 space-y-2">
                                {items.map(({ label, icon, url }) => (
                                    <li key={url}>
                                        <Link
                                            className={classNames(
                                                'ml-2 flex items-center gap-x-2 rounded-md px-2 py-1 font-medium transition-colors duration-150 md:text-lg',
                                                location.pathname === url
                                                    ? 'text-primary bg-primary/10'
                                                    : 'text-black hover:bg-neutral-100',
                                            )}
                                            to={url}
                                        >
                                            <CIcon
                                                icon={icon}
                                                className="text-xl"
                                            />
                                            <span>{label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </nav>
            </aside>
        )
    },
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
