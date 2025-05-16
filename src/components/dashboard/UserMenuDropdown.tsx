/* eslint-disable react-hooks/rules-of-hooks */
import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { useSelfStore } from '@/stores/useSelfStore'
import { Link, useNavigate } from 'react-router'
import CIcon from '@/components/CIcon'
import CDropdown from '@/components/CDropdown'
import { toast } from '@/helpers/toastHelpers'
import axios from 'axios'
import { useLoadingsStore } from '@/stores/useLoadingsStore'

type Props = HTMLAttributes<HTMLDivElement>

const NAVIGATIONS = [
    {
        label: 'Profile',
        icon: 'lucide:circle-user-round',
        url: '/users/self/profile/edit',
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

                <nav className="mt-4 space-y-2">
                    {NAVIGATIONS.map(({ label, icon, url }) => (
                        <Link
                            key={url}
                            className={classNames(
                                'flex w-full items-center gap-x-2 rounded-md px-2 py-1 font-medium text-black transition-colors duration-150 hover:bg-neutral-100 hover:text-black md:text-base',
                            )}
                            to={url}
                        >
                            <CIcon icon={icon} className="text-xl" />
                            {label}
                        </Link>
                    ))}
                </nav>

                <hr className="border-0.5 border-neutral-300" />

                <footer>
                    <button
                        className={classNames(
                            'flex w-full items-center gap-x-2 rounded-md px-2 py-1 font-medium text-black transition-colors duration-150 hover:bg-neutral-100 hover:text-black md:text-base',
                        )}
                        onClick={handleLogout}
                    >
                        <CIcon icon="lucide:log-out" className="text-xl" />
                        <span>Logout</span>
                    </button>
                </footer>
            </CDropdown>
        )
    },
)

UserMenuDropdown.displayName = 'UserMenuDropdown'

export default UserMenuDropdown
