import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import {
    ROLE_ADMIN,
    ROLE_ANALYST,
    ROLE_USER,
} from '@/modules/roles/constants/roles'
import { RoleName } from '@/modules/roles/types/RoleName'
import { useUserPaginationStore } from '@/features/usersIndex/stores/useUserPaginationStore'
import moment from 'moment'
import { uppercaseFirst } from '@/shared/utils/stringUtils'
import { AssignUserRoleForm } from '@/features/usersIndex/types/AssignUserRoleForm'
import { assignToUser } from '@/modules/roles/roleService'
import axios from 'axios'
import { toast } from '@/shared/helpers/toastHelpers'
import UserAvatarImage from '@/core/components/users/UserAvatarImage'

type Props = HTMLAttributes<HTMLTableElement>

const UserPaginationTable = forwardRef<HTMLTableElement, Props>(
    ({ className, ...props }, ref) => {
        const pagination = useUserPaginationStore((state) => state.pagination)
        const paginate = useUserPaginationStore((state) => state.paginate)

        const handleRoleChange = async (userId: string, roleName: RoleName) => {
            try {
                const form: AssignUserRoleForm = {
                    userId,
                    roleName,
                }
                const { message } = await assignToUser(form)
                toast({ message, type: 'success' })
                paginate()
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    toast({ message: e.response!.data.message, type: 'error' })
                }
                throw e
            }
        }

        return (
            <table
                className={classNames(
                    'w-full table-auto border-separate border-spacing-y-4',
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
                            User
                        </th>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            Role
                        </th>
                        <th
                            scope="col"
                            className="text-left font-medium text-black"
                        >
                            Registered
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pagination?.users.map((user) => (
                        <tr
                            key={user.id}
                            className="cursor-pointer hover:bg-neutral-100"
                        >
                            <td>
                                <div className="flex flex-row items-center gap-x-2">
                                    <UserAvatarImage user={user} />
                                    <div className="inline-flex flex-col">
                                        <span className="leading-none text-black">
                                            {user.name}
                                        </span>
                                        <span className="text-sm text-black">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.role!.name === ROLE_ADMIN ? (
                                    <span className="text-black">
                                        {uppercaseFirst(ROLE_ADMIN)}
                                    </span>
                                ) : (
                                    <select
                                        defaultValue={user.role!.name}
                                        className="text-black"
                                        onChange={(e) => {
                                            const value = e.target.value
                                            handleRoleChange(
                                                user.id,
                                                value as RoleName,
                                            )
                                        }}
                                    >
                                        <option
                                            key={user.role!.name}
                                            value={user.role!.name}
                                        >
                                            {uppercaseFirst(user.role!.name)}
                                        </option>
                                        {[ROLE_ANALYST, ROLE_USER]
                                            .filter(
                                                (roleName) =>
                                                    roleName !==
                                                    user.role!.name,
                                            )
                                            .map((roleName) => (
                                                <option
                                                    key={roleName}
                                                    value={roleName}
                                                >
                                                    {uppercaseFirst(roleName)}
                                                </option>
                                            ))}
                                    </select>
                                )}
                            </td>
                            <td>
                                <time
                                    dateTime={user.createdAt}
                                    className="text-black"
                                >
                                    {moment(user.createdAt).format(
                                        'DD MMMM YYYY, HH:mm',
                                    )}
                                </time>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    },
)

UserPaginationTable.displayName = 'UserPaginationTable'

export default UserPaginationTable
