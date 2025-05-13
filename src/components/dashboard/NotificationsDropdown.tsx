import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { Notification } from '@/types/notificationTypes'
import moment from 'moment'
import CDropdown from '@/components/CDropdown'
import CImage from '@/components/CImage'
import CButton from '@/components/CButton'
import { Link } from 'react-router'

type Props = HTMLAttributes<HTMLDivElement>

const DUMMY_NOTIFICATIONS: Notification[] = Array.from(
    { length: 10 },
    (_, i) => ({
        id: i.toString(),
        notifiedId: i.toString(),
        notifiedType: 1,
        notifierId: null,
        notifierType: 0,
        type: 1,
        title: 'Watchlist Alert',
        message: `The price of Bitcoin has changed by ${i}% in the last 24 hours.`,
        data: null,
        readAt: i % 2 === 0 ? null : moment().toISOString(),
        createdAt: moment()
            .subtract(Math.floor(Math.random() * 100), 'days')
            .toISOString(),
        updatedAt: null,
        notifier:
            i % 3 === 0
                ? null
                : {
                      id: i.toString(),
                      name: 'John Doe',
                      username: 'johndoe',
                      email: `johndoe${i}@example.com`,
                      birthDate: moment().toISOString(),
                      emailVerifiedAt: null,
                      createdAt: moment()
                          .subtract(Math.floor(Math.random() * 100), 'days')
                          .toISOString(),
                      updatedAt: null,
                  },
    }),
)

const NotificationsDropdown = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
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
                        {DUMMY_NOTIFICATIONS.map((notification) => (
                            <li key={notification.id}>
                                <article className="flex flex-row items-start gap-x-2 rounded-md px-2 py-2 hover:bg-neutral-100">
                                    <figure className="flex-shrink-0 overflow-hidden rounded-full outline outline-black">
                                        <CImage
                                            className="size-8 object-contain md:size-10"
                                            src={
                                                notification.notifier
                                                    ? 'https://react-demo.tailadmin.com/images/user/owner.jpg' // TODO: replace with user image
                                                    : '/logo-3-4.png'
                                            }
                                        />
                                    </figure>
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

                        {/* <li>
                            <article className="flex flex-row items-start gap-x-2 rounded-md px-2 py-2 hover:bg-neutral-100">
                                <figure className="flex-shrink-0 overflow-hidden rounded-full outline outline-black">
                                    <CImage
                                        className="size-8 object-contain md:size-10"
                                        src={
                                            'https://react-demo.tailadmin.com/images/user/owner.jpg'
                                        }
                                    />
                                </figure>
                                <div className="flex flex-col justify-between space-y-1">
                                    <p className="leading-none break-words">
                                        lorem
                                    </p>
                                    <time
                                        dateTime={moment().toISOString()}
                                        className="text-sm"
                                    >
                                        {moment(
                                            moment().subtract(1, 'days'),
                                        ).fromNow()}
                                    </time>
                                </div>
                            </article>
                        </li> */}

                        <li aria-hidden="true">
                            <hr className="border-0.5 border-neutral-300" />
                        </li>
                    </ul>
                </section>

                <footer className="p-2">
                    <Link to="/notifications">
                        <CButton
                            className={classNames(
                                'w-full bg-white! text-sm text-black! outline outline-black md:text-base',
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
