import { forwardRef, HTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'

import CCard from '@/shared/components/CCard'

import { usePermissionPaginationStore } from '@/features/permissionsIndex/stores/usePermissionPaginationStore'
import PermissionPaginationParamsForm from '@/features/permissionsIndex/components/PermissionPaginationParamsForm'
import PermissionPaginationTable from '@/features/permissionsIndex/components/PermissionPaginationTable'
import PermissionPaginationButtons from '@/features/permissionsIndex/components/PermissionPaginationButtons'

type Props = HTMLAttributes<HTMLDivElement>

const PermissionPaginationCard = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const paginate = usePermissionPaginationStore((state) => state.paginate)

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
                        Permissions
                    </h3>
                </header>

                <PermissionPaginationParamsForm />

                <PermissionPaginationTable />

                <PermissionPaginationButtons />
            </CCard>
        )
    },
)

PermissionPaginationCard.displayName = 'PermissionPaginationCard'

export default PermissionPaginationCard
