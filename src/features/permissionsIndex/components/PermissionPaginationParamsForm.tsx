import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePermissionPaginationStore } from '@/features/permissionsIndex/stores/usePermissionPaginationStore'

type Props = HTMLAttributes<HTMLFormElement>

const PermissionPaginationParamsForm = forwardRef<HTMLFormElement, Props>(
    ({ className, ...props }, ref) => {
        const [searchParams, setSearchParams] = useSearchParams()
        const paginate = usePermissionPaginationStore((state) => state.paginate)

        const handleFilter = (keyword: string) => {
            const key = 'filter'
            if (keyword) searchParams.set(key, keyword)
            else searchParams.delete(key)

            setSearchParams(searchParams)
        }

        return (
            <form
                className={classNames(className, 'flex flex-row gap-4')}
                {...props}
                ref={ref}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="w-1/2">
                    <CInputIconedLabeled
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
            </form>
        )
    },
)

PermissionPaginationParamsForm.displayName = 'PermissionPaginationParamsForm'

export default PermissionPaginationParamsForm
