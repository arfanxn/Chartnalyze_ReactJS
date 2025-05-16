import CIcon from '@/components/CIcon'
import CImage from '@/components/CImage'
import classNames from 'classnames'
import NotificationsDropdown from '@/components/dashboard/NotificationsDropdown'
import UserMenuDropdown from '@/components/dashboard/UserMenuDropdown'
import { forwardRef, HTMLProps } from 'react'
import { Link, useNavigate } from 'react-router'
import TheLogo from '@/components/TheLogo'
import { useBool } from '@/hooks/useBool'
import { useSelfStore } from '@/stores/useSelfStore'
import { useScreenSize } from '@/hooks/useScreenSize'
import { useLoadingsStore } from '@/stores/useLoadingsStore'

type Props = HTMLProps<HTMLElement>

const Header = forwardRef<HTMLDivElement, Props>(({ className }, ref) => {
    const appName = import.meta.env.VITE__APP_NAME

    const navigate = useNavigate()
    const screenSize = useScreenSize()

    const self = useSelfStore((state) => state.self)
    const isSelfLoading = useLoadingsStore((state) => state.isLoading('self'))

    const [isNotificationsDropdownOpen, , toggleNotificationsDropdown] =
        useBool()
    const [isUserMenuDropdownOpen, , toggleUserMenuDropdown] = useBool()

    const notificationsDropdownButtonOnClick = () => {
        if (['xs', 'sm'].includes(screenSize)) navigate('/notifications')
        else toggleNotificationsDropdown()
    }

    return (
        <header
            ref={ref}
            className={classNames(
                'fixed inset-x-0 top-0 z-50 border-b border-neutral-500 bg-white',
                className,
            )}
        >
            <nav className="mx-auto flex flex-row items-center justify-between bg-white px-4 py-2 md:px-8 lg:max-w-7xl">
                <Link to="/" className="inline-flex items-center">
                    <figure className="flex max-w-8 items-center justify-center md:max-w-10">
                        <TheLogo />
                    </figure>
                    <h1 className="hidden text-lg font-bold md:inline md:text-2xl">
                        {appName}
                    </h1>
                </Link>

                <div className="flex flex-row items-center gap-x-2 md:gap-x-4">
                    <div className="relative">
                        <button
                            className="flex size-8 cursor-pointer flex-row items-center justify-center overflow-hidden rounded-full outline outline-black md:size-10"
                            onClick={notificationsDropdownButtonOnClick}
                        >
                            <CIcon
                                icon="lucide:bell"
                                className="text-xl text-black md:text-xl"
                            />
                        </button>
                        <NotificationsDropdown
                            className={classNames(
                                isNotificationsDropdownOpen
                                    ? 'hidden md:block'
                                    : 'hidden',
                            )}
                        />
                    </div>
                    <div className="relative">
                        <button
                            className="flex h-8 cursor-pointer items-center justify-center md:h-10"
                            onClick={toggleUserMenuDropdown}
                        >
                            <figure className="flex size-8 items-center justify-center overflow-hidden rounded-full outline outline-black md:size-10">
                                <CImage
                                    // TODO: replace with user image
                                    src="https://react-demo.tailadmin.com/images/user/owner.jpg"
                                />
                            </figure>
                            <div className="ml-2 flex items-center gap-x-2">
                                <span className="hidden md:inline md:text-sm">
                                    {isSelfLoading || !self
                                        ? '...'
                                        : (self.name ?? self.username)}
                                </span>
                                <CIcon
                                    icon="lucide:chevron-down"
                                    className={classNames(
                                        'mt-0.5 hidden text-xl transition-transform duration-150 md:block md:text-xl',
                                        isUserMenuDropdownOpen
                                            ? 'rotate-180'
                                            : '',
                                    )}
                                />
                            </div>
                        </button>
                        <UserMenuDropdown
                            className={classNames(
                                isUserMenuDropdownOpen ? 'block' : 'hidden',
                            )}
                        />
                    </div>
                </div>
            </nav>
        </header>
    )
})

Header.displayName = 'Header'

export default Header
