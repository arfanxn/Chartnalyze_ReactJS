import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
    title: string
    value: number
    description?: string
}

const StatisticCard = forwardRef<HTMLDivElement, Props>(
    ({ className, title, value, description, ...props }, ref) => {
        return (
            <div
                className={classNames(
                    'rounded-lg bg-white p-5 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl',
                    className,
                )}
                {...props}
                ref={ref}
            >
                <h3 className="truncate text-sm font-medium text-neutral-600">
                    {title}
                </h3>
                {/* Using text-primary for the value as an accent, assuming it's a teal color */}
                <p className="text-primary mt-1 text-3xl font-semibold">
                    {value}
                </p>
                {description && (
                    <p className="mt-1 text-xs text-neutral-600">
                        {description}
                    </p>
                )}
            </div>
        )
    },
)

StatisticCard.displayName = 'StatisticCard'

export default StatisticCard
