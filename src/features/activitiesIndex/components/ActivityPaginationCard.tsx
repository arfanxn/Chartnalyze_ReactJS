import { forwardRef, HTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'

import CCard from '@/shared/components/CCard'

import ActivityPaginationParamsForm from '@/features/activitiesIndex/components/ActivityPaginationParamsForm'
import { useActivityPaginationStore } from '@/features/activitiesIndex/stores/useActivityPaginationStore'
import ActivityPaginationTable from '@/features/activitiesIndex/components/ActivityPaginationTable'
import ActivityPaginationButtons from '@/features/activitiesIndex/components/ActivityPaginationButtons'

type Props = HTMLAttributes<HTMLDivElement>

const ActivityPaginationCard = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const paginate = useActivityPaginationStore((state) => state.paginate)

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
                        Activities
                    </h3>
                </header>

                <ActivityPaginationParamsForm />

                <ActivityPaginationTable />

                <ActivityPaginationButtons />
            </CCard>
        )
    },
)

ActivityPaginationCard.displayName = 'ActivityPaginationCard'

export default ActivityPaginationCard
