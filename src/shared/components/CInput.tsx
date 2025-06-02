import { forwardRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = InputHTMLAttributes<HTMLInputElement>

const CInput = forwardRef<HTMLInputElement, Props>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={classNames(
                'rounded-md bg-white px-2 py-1 text-sm text-black outline outline-neutral-200 transition-transform duration-150 autofill:bg-white autofill:text-black focus:outline-black md:px-4 md:py-2 md:text-base',
                className,
            )}
            {...props} // includes all other props like onChange, value, etc.
        />
    ),
)

CInput.displayName = 'CInput'

export default CInput
