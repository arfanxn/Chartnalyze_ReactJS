import CAlert from '@/components/CAlert'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
    messageClassName?: string
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
}

const CToast = forwardRef<HTMLDivElement, Props>(
    ({ className, message, messageClassName, type, ...props }, ref) => (
        <CAlert
            ref={ref}
            className={classNames(className)}
            message={message}
            type={type}
            messageClassName={classNames('font-semibold', messageClassName)}
            {...props}
        />
    ),
)

CToast.displayName = 'CToast'

export default CToast
