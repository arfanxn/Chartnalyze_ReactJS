import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { uppercaseFirst } from '@/shared/utils/stringUtils'
import { usePermissionPaginationStore } from '@/features/permissionsIndex/stores/usePermissionPaginationStore'

type Props = HTMLAttributes<HTMLTableElement>

const RolePaginationTable = forwardRef<HTMLTableElement, Props>(
    ({ className, ...props }, ref) => {
        const pagination = usePermissionPaginationStore(
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
                            Id
                        </th>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            Roles
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pagination?.permissions.map((permission) => (
                        <tr key={permission.id} className="cursor-pointer">
                            <td>
                                <span className="text-black">
                                    {permission.id}
                                </span>
                            </td>
                            <td>
                                <span className="text-black">
                                    {permission.name}
                                </span>
                            </td>
                            <td>
                                <ul className="flex flex-row flex-wrap gap-x-2">
                                    {permission.roles?.map((role) => (
                                        <li key={role.id}>
                                            <span className="text-black underline">
                                                {uppercaseFirst(role.name)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    },
)

RolePaginationTable.displayName = 'RolePaginationTable'

export default RolePaginationTable
