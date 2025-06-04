import classNames from 'classnames'
import { forwardRef, HTMLProps } from 'react'
import NavigationLink from '@/core/components/dashboard/NavigationLink'
import { useSelfStore } from '@/core/stores/useSelfStore'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import { ROLE_ADMIN } from '@/modules/roles/constants/roles'

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

const MENU_NG: NavigationGroup = {
    group: 'Menu',
    items: [
        {
            label: 'Dashboard',
            icon: 'lucide:layout-dashboard',
            url: '/dashboard',
        },
    ],
}

const USER_MANAGEMENT_NG: NavigationGroup = {
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
}

const ADMIN_NGS = [MENU_NG, USER_MANAGEMENT_NG]
const NGS = [MENU_NG]

const Sidebar = forwardRef<HTMLElement, Props>(
    ({ className, ...props }, ref) => {
        const self = useSelfStore((state) => state.self)
        const isSelfLoading = useLoadingsStore((state) =>
            state.isLoading('self'),
        )

        if (isSelfLoading) return <div>Loading...</div>

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
                    {(self?.role?.name === ROLE_ADMIN ? ADMIN_NGS : NGS).map(
                        ({ group, items }) => (
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
                        ),
                    )}
                </nav>
            </aside>
        )
    },
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
