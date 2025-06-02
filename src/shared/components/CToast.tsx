import CAlert from '@/shared/components/CAlert'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import { ToastContentProps } from 'react-toastify'

type Props = HTMLAttributes<HTMLDivElement> &
    ToastContentProps & {
        messageClassName?: string
        message: string
        type: 'success' | 'info' | 'warning' | 'error'
    }

const CToast = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            message,
            messageClassName,
            type,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            closeToast,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            toastProps,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            isPaused,
            ...props
        },
        ref,
    ) => (
        <CAlert
            {...props}
            ref={ref}
            className={classNames(className)}
            message={message}
            type={type}
            messageClassName={classNames('font-semibold', messageClassName)}
        />
    ),
)

CToast.displayName = 'CToast'

export default CToast
