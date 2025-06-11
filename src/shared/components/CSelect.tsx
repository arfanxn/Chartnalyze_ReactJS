import { forwardRef, SelectHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = SelectHTMLAttributes<HTMLSelectElement>

const CSelect = forwardRef<HTMLSelectElement, Props>(
    ({ className, ...props }, ref) => (
        <select
            ref={ref}
            className={classNames(
                'bg-primary rounded-md px-2 py-1 text-white outline outline-black transition-transform duration-150 hover:scale-105 active:scale-95 md:px-4 md:py-2',
                className,
            )}
            {...props}
        >
            {props.children}
        </select>
    ),
)

CSelect.displayName = 'CSelect'

export default CSelect
