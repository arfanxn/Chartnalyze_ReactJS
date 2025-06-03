import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { useRolePaginationStore } from '@/features/rolesIndex/stores/useRolePaginationStore'
import { uppercaseFirst } from '@/shared/utils/stringUtils'

type Props = HTMLAttributes<HTMLTableElement>

const RolePaginationTable = forwardRef<HTMLTableElement, Props>(
    ({ className, ...props }, ref) => {
        const pagination = useRolePaginationStore((state) => state.pagination)

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
                            Permissions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pagination?.roles.map((role) => (
                        <tr key={role.id} className="cursor-pointer">
                            <td>
                                <span className="text-black">{role.id}</span>
                            </td>
                            <td>
                                <span className="text-black">
                                    {uppercaseFirst(role.name)}
                                </span>
                            </td>
                            <td>
                                <ul className="flex flex-row flex-wrap gap-x-2">
                                    {role.permissions?.map((permission) => (
                                        <li key={permission.id}>
                                            <span className="text-black underline">
                                                {permission.name}
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
