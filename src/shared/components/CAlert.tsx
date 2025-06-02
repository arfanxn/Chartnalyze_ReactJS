import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
    messageClassName?: string
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
}

const CAlert = forwardRef<HTMLDivElement, Props>(
    ({ className, message, messageClassName, type, ...props }, ref) => (
        <div ref={ref} className={classNames('w-full', className)} {...props}>
            <p
                className={classNames(
                    {
                        'text-primary': type === 'success',
                        'text-blue-500': type === 'info',
                        'text-yellow-500': type === 'warning',
                        'text-secondary': type === 'error',
                    },
                    messageClassName,
                )}
            >
                {message}
            </p>
        </div>
    ),
)

CAlert.displayName = 'CAlert'

export default CAlert
