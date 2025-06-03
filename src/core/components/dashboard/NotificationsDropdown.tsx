import { forwardRef, HTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import CDropdown from '@/shared/components/CDropdown'
import CButton from '@/shared/components/CButton'
import { Link } from 'react-router'
import { useNotificationPaginationStore } from '@/core/stores/useNotificationPaginationStore'

type Props = HTMLAttributes<HTMLDivElement>

const NotificationsDropdown = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const paginate = useNotificationPaginationStore(
            (state) => state.paginate,
        )
        const pagination = useNotificationPaginationStore(
            (state) => state.pagination,
        )

        useEffect(() => {
            paginate({})
        }, [paginate])

        return (
            <CDropdown
                ref={ref}
                className={classNames('h-0 w-0 md:h-auto md:w-96', className)}
                {...props}
            >
                <header>
                    <h3 className="text-base font-medium text-black md:text-lg">
                        Notifications
                    </h3>
                </header>

                <hr className="border-0.5 border-neutral-300" />

                <section className="scrollbar-thumb-neutral-300 scrollbar-track-white scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-y-scroll md:max-h-[50vh]">
                    <ul>
                        {pagination?.notifications.map((notification) => (
                            <li key={notification.id}>
                                <article className="flex cursor-pointer flex-row items-start gap-x-2 rounded-md px-2 py-2 hover:bg-neutral-100">
                                    <div className="flex flex-col justify-between space-y-1">
                                        <p className="leading-none break-words">
                                            {notification.message}
                                        </p>
                                        <time
                                            dateTime={notification.createdAt}
                                            className="text-sm"
                                        >
                                            {moment(
                                                notification.createdAt,
                                            ).fromNow()}
                                        </time>
                                    </div>
                                </article>
                            </li>
                        ))}
                        <li aria-hidden="true">
                            <hr className="border-0.5 border-neutral-300" />
                        </li>
                    </ul>
                </section>

                <footer className="p-2">
                    <Link to="/notifications">
                        <CButton
                            className={classNames(
                                'w-full bg-white! text-sm text-black! md:text-base',
                            )}
                        >
                            View all notifications
                        </CButton>
                    </Link>
                </footer>
            </CDropdown>
        )
    },
)

NotificationsDropdown.displayName = 'NotificationsDropdown'

export default NotificationsDropdown
