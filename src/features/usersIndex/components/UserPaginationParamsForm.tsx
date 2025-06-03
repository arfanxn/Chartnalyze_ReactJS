import CButton from '@/shared/components/CButton'
import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUserPaginationStore } from '@/features/usersIndex/stores/useUserPaginationStore'
import { uppercaseFirst } from '@/shared/utils/stringUtils'
import { ROLE_NAMES } from '@/modules/roles/constants/roles'
import { type RoleName } from '@/modules/roles/types/RoleName'

type Props = HTMLAttributes<HTMLFormElement>

const UserPaginationParamsForm = forwardRef<HTMLFormElement, Props>(
    ({ className, ...props }, ref) => {
        const [searchParams, setSearchParams] = useSearchParams()
        const paginate = useUserPaginationStore((state) => state.paginate)

        const handleFilterRole = (role: RoleName) => {
            const key = 'filter[role]'
            if (searchParams.get(key) === role) searchParams.delete(key)
            else searchParams.set(key, role)

            setSearchParams(searchParams)
        }

        const handleFilter = (keyword: string) => {
            const key = 'filter'
            if (keyword) searchParams.set(key, keyword)
            else searchParams.delete(key)

            setSearchParams(searchParams)
        }

        return (
            <form
                className={classNames(className, 'flex flex-col gap-4')}
                {...props}
                ref={ref}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="w-1/2">
                    <CInputIconedLabeled
                        id="user-search-input"
                        icon="lucide:search"
                        iconOnClick={paginate}
                        inputProps={{
                            placeholder: 'Search',
                            onInput: (e) => {
                                const keyword = e.currentTarget.value
                                handleFilter(keyword)
                            },
                            onKeyDown: (e) => {
                                if (e.key === 'Enter') paginate()
                            },
                        }}
                    />
                </div>

                <div className="flex flex-row gap-4">
                    {ROLE_NAMES.map((role) => (
                        <CButton
                            key={role}
                            className={classNames(
                                'py-1!',
                                searchParams.get('filter[role]') !== role &&
                                    'border-neutral-300! bg-white! text-black!',
                            )}
                            type="button"
                            onClick={() => {
                                handleFilterRole(role)
                                paginate()
                            }}
                        >
                            {uppercaseFirst(role)}
                        </CButton>
                    ))}
                </div>
            </form>
        )
    },
)

UserPaginationParamsForm.displayName = 'UserPaginationParamsForm'

export default UserPaginationParamsForm
