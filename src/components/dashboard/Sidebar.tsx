import classNames from 'classnames'
import { forwardRef, HTMLProps } from 'react'
import NavigationLink from '@/components/dashboard/NavigationLink'

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
                                        <NavigationLink
                                            className="ml-2 md:text-lg"
                                            to={url}
                                            label={label}
                                            icon={icon}
                                        />
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
