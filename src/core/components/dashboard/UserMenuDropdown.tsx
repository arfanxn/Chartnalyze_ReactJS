import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { useSelfStore } from '@/core/stores/useSelfStore'
import { useNavigate } from 'react-router'
import CDropdown from '@/shared/components/CDropdown'
import { toast } from '@/shared/helpers/toastHelpers'
import axios from 'axios'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import NavigationLink from './NavigationLink'
import NavigationButton from './NavigationButton'

type Props = HTMLAttributes<HTMLDivElement>

const NAVIGATIONS = [
    {
        label: 'Account',
        icon: 'lucide:circle-user-round',
        url: '/users/self/account/edit',
    },
    {
        label: 'Settings',
        icon: 'lucide:settings',
        url: '/users/self/settings/edit',
    },
]

const UserMenuDropdown = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const navigate = useNavigate()

        const self = useSelfStore((state) => state.self)
        const isSelfLoading = useLoadingsStore((state) =>
            state.isLoading('self'),
        )
        const logout = useSelfStore((state) => state.logout)

        const handleLogout = async () => {
            // TODO: implement a better UI confirmation dialog
            if (confirm('Are you sure you want to logout?') === false) return

            try {
                const { message } = await logout()
                toast({ message, type: 'success' })
                navigate('/users/login', { replace: true })
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    toast({ message: e.response!.data.message, type: 'error' })
                }
                throw e
            }
        }

        return (
            <CDropdown
                ref={ref}
                className={classNames('w-48 md:w-64', className)}
                {...props}
            >
                <header className="space-y-2">
                    <h3 className="text-sm leading-none font-medium text-black md:text-base">
                        {isSelfLoading || !self
                            ? '...'
                            : (self.name ?? self.username)}
                    </h3>
                    <p className="text-sm leading-none font-light text-black">
                        {isSelfLoading || !self ? '...' : self.email}
                    </p>
                </header>

                <nav className="mt-4 flex flex-col gap-y-2">
                    {NAVIGATIONS.map(({ label, icon, url }) => (
                        <NavigationLink
                            className="text-sm md:text-base"
                            key={url}
                            label={label}
                            icon={icon}
                            to={url}
                        />
                    ))}
                </nav>

                <hr className="border-0.5 border-neutral-300" />

                <footer>
                    <NavigationButton
                        onClick={handleLogout}
                        label="Logout"
                        icon="lucide:log-out"
                        className="text-sm md:text-base"
                    />
                </footer>
            </CDropdown>
        )
    },
)

UserMenuDropdown.displayName = 'UserMenuDropdown'

export default UserMenuDropdown
