import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { useActivityPaginationStore } from '@/features/activitiesIndex/stores/useActivityPaginationStore'
import {
    snakeCaseToTitleCase,
    uppercaseFirst,
} from '@/shared/utils/stringUtils'

type Props = HTMLAttributes<HTMLTableElement>

const ActivityPaginationTable = forwardRef<HTMLTableElement, Props>(
    ({ className, ...props }, ref) => {
        const pagination = useActivityPaginationStore(
            (state) => state.pagination,
        )

        return (
            <table
                className={classNames(
                    'w-full table-auto border-separate border-spacing-4',
                    className,
                )}
                {...props}
                ref={ref}
            >
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            User
                        </th>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            Description
                        </th>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            On
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pagination?.activities.map((activity) => (
                        <tr key={activity.id} className="cursor-pointer">
                            <td>
                                <span className="text-sm text-black">
                                    {snakeCaseToTitleCase(activity.type)}
                                </span>
                            </td>
                            <td>
                                <div className="flex flex-col items-start gap-x-2">
                                    <span className="text-black">
                                        {activity.user?.email || '-'}
                                    </span>
                                    <div className="inline-flex flex-col">
                                        <span className="text-sm text-black">
                                            {activity.userIpAddress}
                                        </span>
                                        <span className="text-xs text-black">
                                            {activity.userAgent}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="text-sm text-black">
                                    {activity.description}
                                </p>
                            </td>
                            <td>
                                <span className="text-sm text-black">
                                    {uppercaseFirst(
                                        activity.subject &&
                                            typeof activity.subject ===
                                                'object' &&
                                            'email' in activity.subject
                                            ? (activity.subject.email as string)
                                            : '-',
                                    )}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    },
)

ActivityPaginationTable.displayName = 'ActivityPaginationTable'

export default ActivityPaginationTable
