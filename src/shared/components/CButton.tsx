import { forwardRef, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const CButton = forwardRef<HTMLButtonElement, Props>(
    ({ className, ...props }, ref) => (
        <button
            ref={ref}
            className={classNames(
                'bg-primary rounded-md px-2 py-1 text-white outline outline-black transition-transform duration-150 hover:scale-105 active:scale-95 md:px-4 md:py-2',
                className,
            )}
            {...props}
        >
            {props.children}
        </button>
    ),
)

CButton.displayName = 'CButton'

export default CButton
