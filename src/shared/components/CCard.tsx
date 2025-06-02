import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement>

const CCard = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={classNames(
                'rounded-md text-white shadow-[0px_10px_0px_1px_rgba(0,0,0,0.25)] outline outline-black',
                className,
            )}
            {...props}
        >
            {props.children}
        </div>
    ),
)

CCard.displayName = 'CCard'

export default CCard
