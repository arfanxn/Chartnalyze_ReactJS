import { forwardRef, HTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'

import CCard from '@/shared/components/CCard'

import UserPaginationParamsForm from '@/features/usersIndex/components/UserPaginationParamsForm'
import { useUserPaginationStore } from '@/features/usersIndex/stores/useUserPaginationStore'
import UserPaginationTable from '@/features/usersIndex/components/UserPaginationTable'
import UserPaginationButtons from '@/features/usersIndex/components/UserPaginationButtons'

type Props = HTMLAttributes<HTMLDivElement>

const UserPaginationCard = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const paginate = useUserPaginationStore((state) => state.paginate)

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
                        Users
                    </h3>
                </header>

                <UserPaginationParamsForm />

                <UserPaginationTable />

                <UserPaginationButtons />
            </CCard>
        )
    },
)

UserPaginationCard.displayName = 'UserPaginationCard'

export default UserPaginationCard
