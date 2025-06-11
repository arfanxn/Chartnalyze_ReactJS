import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { useActivityPaginationStore } from '@/features/activitiesIndex/stores/useActivityPaginationStore'
import axios from 'axios'
import { toast } from '@/shared/helpers/toastHelpers'
import { useSearchParams } from 'react-router-dom'
import CButton from '@/shared/components/CButton'
import { animateScroll } from 'react-scroll'

type Props = HTMLAttributes<HTMLDivElement>

const ActivityPaginationButtons = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const pagination = useActivityPaginationStore(
            (state) => state.pagination,
        )
        const paginate = useActivityPaginationStore((state) => state.paginate)
        const [searchParams, setSearchParams] = useSearchParams()

        const scrollToTop = () => {
            animateScroll.scrollToTop({
                duration: 500, // Adjust duration as needed
                smooth: true, // Enable smooth scrolling
            })
        }

        const handleNext = async () => {
            try {
                if (!pagination?.hasNext) return

                searchParams.set('page', `${pagination.page + 1}`)
                setSearchParams(searchParams)
                paginate()
                scrollToTop()
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    toast({ message: e.response!.data.message, type: 'error' })
                }
                throw e
            }
        }

        const handlePrev = async () => {
            try {
                if (!pagination?.hasPrev) return

                searchParams.set('page', `${pagination.page - 1}`)
                setSearchParams(searchParams)
                paginate()
                scrollToTop()
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    toast({ message: e.response!.data.message, type: 'error' })
                }
                throw e
            }
        }

        return (
            <nav
                className={classNames(
                    'flex flex-row items-center justify-start gap-4',
                    className,
                )}
                {...props}
                ref={ref}
            >
                <CButton
                    className={classNames('py-1!', {
                        'opacity-50': !pagination?.hasPrev,
                    })}
                    type="button"
                    onClick={handlePrev}
                    disabled={!pagination?.hasPrev}
                >
                    Prev
                </CButton>
                <CButton
                    className={classNames('py-1!', {
                        'opacity-50': !pagination?.hasNext,
                    })}
                    type="button"
                    onClick={handleNext}
                    disabled={!pagination?.hasNext}
                >
                    Next
                </CButton>
            </nav>
        )
    },
)

ActivityPaginationButtons.displayName = 'ActivityPaginationButtons'

export default ActivityPaginationButtons
