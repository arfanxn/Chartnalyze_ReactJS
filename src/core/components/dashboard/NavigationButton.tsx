import { forwardRef, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import CIcon from '@/shared/components/CIcon'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: string
    label: string
}

const NavigationButton = forwardRef<HTMLButtonElement, Props>(
    ({ className, icon, label, ...props }, ref) => (
        <button
            ref={ref}
            className={classNames(
                'flex w-full items-center gap-x-2 rounded-md px-2 py-1 font-medium transition-colors duration-150 hover:bg-neutral-100',
                className,
            )}
            {...props}
        >
            <CIcon icon={icon} className="text-xl" />
            <span>{label}</span>
        </button>
    ),
)

NavigationButton.displayName = 'NavigationButton'

export default NavigationButton
