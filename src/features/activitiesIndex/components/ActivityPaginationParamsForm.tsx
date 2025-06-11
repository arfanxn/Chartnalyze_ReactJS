import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useActivityPaginationStore } from '@/features/activitiesIndex/stores/useActivityPaginationStore'
import { snakeCaseToTitleCase } from '@/shared/utils/stringUtils'
import { type Type, TYPES } from '@/modules/activities/types/Type'
import CButton from '@/shared/components/CButton'

type Props = HTMLAttributes<HTMLFormElement>

const ActivityPaginationParamsForm = forwardRef<HTMLFormElement, Props>(
    ({ className, ...props }, ref) => {
        const [searchParams, setSearchParams] = useSearchParams()
        const paginate = useActivityPaginationStore((state) => state.paginate)

        const handleFilterType = (typ: Type) => {
            const key = 'filter[type]'
            if (searchParams.get(key) === typ) searchParams.delete(key)
            else searchParams.set(key, typ)

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
                    {TYPES.map((typ) => (
                        <CButton
                            key={typ}
                            className={classNames(
                                'py-1!',
                                searchParams.get('filter[type]') !== typ &&
                                    'border-neutral-300! bg-white! text-black!',
                            )}
                            type="button"
                            onClick={() => {
                                handleFilterType(typ)
                                paginate()
                            }}
                        >
                            {snakeCaseToTitleCase(typ)}
                        </CButton>
                    ))}
                </div>
            </form>
        )
    },
)

ActivityPaginationParamsForm.displayName = 'ActivityPaginationParamsForm'

export default ActivityPaginationParamsForm
