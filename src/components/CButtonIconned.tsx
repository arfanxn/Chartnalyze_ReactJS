import { forwardRef, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import CButton from '@/components/CButton'
import CIcon from '@/components/CIcon'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string
    labelClassName?: string
    icon: string
    iconClassName?: string
}

const CButtonIconned = forwardRef<HTMLButtonElement, Props>(
    (
        { className, label, labelClassName, icon, iconClassName, ...props },
        ref,
    ) => (
        <CButton
            ref={ref}
            className={classNames(
                'inline-flex items-center space-x-2',
                className,
            )}
            {...props}
        >
            <span className={classNames(labelClassName)}>{label}</span>
            <CIcon icon={icon} className={classNames(iconClassName)} />
        </CButton>
    ),
)

CButtonIconned.displayName = 'CButtonIconned'

export default CButtonIconned
