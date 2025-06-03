import { forwardRef, HTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'

import CCard from '@/shared/components/CCard'

import { useRolePaginationStore } from '@/features/rolesIndex/stores/useRolePaginationStore'
import RolePaginationParamsForm from '@/features/rolesIndex/components/RolePaginationParamsForm'
import RolePaginationTable from '@/features/rolesIndex/components/RolePaginationTable'

type Props = HTMLAttributes<HTMLDivElement>

const RolePaginationCard = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const paginate = useRolePaginationStore((state) => state.paginate)

        useEffect(() => {
            paginate()
        }, [paginate])

        return (
            <CCard
                className={classNames('space-y-4 px-6 py-4', className)}
                {...props}
                ref={ref}
            >
                <header>
                    <h3 className="text-primary text-2xl font-semibold">
                        Roles
                    </h3>
                </header>

                <RolePaginationParamsForm />

                <RolePaginationTable />
            </CCard>
        )
    },
)

RolePaginationCard.displayName = 'RolePaginationCard'

export default RolePaginationCard
