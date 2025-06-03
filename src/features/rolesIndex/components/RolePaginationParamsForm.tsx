import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRolePaginationStore } from '@/features/rolesIndex/stores/useRolePaginationStore'

type Props = HTMLAttributes<HTMLFormElement>

const RolePaginationParamsForm = forwardRef<HTMLFormElement, Props>(
    ({ className, ...props }, ref) => {
        const [searchParams, setSearchParams] = useSearchParams()
        const paginate = useRolePaginationStore((state) => state.paginate)

        const handleFilterName = (keyword: string) => {
            const key = 'filter[name]'
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
                                handleFilterName(keyword)
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

RolePaginationParamsForm.displayName = 'RolePaginationParamsForm'

export default RolePaginationParamsForm
