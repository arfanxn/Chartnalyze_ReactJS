import { forwardRef, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import { NavLink, LinkProps } from 'react-router'
import NavigationButton from './NavigationButton'

type Props = ButtonHTMLAttributes<HTMLAnchorElement> &
    LinkProps & {
        icon: string
        label: string
    }

const NavigationLink = forwardRef<HTMLAnchorElement, Props>(
    ({ className, to, icon, label, ...props }, ref) => (
        <NavLink ref={ref} to={to} {...props}>
            {({ isActive }) => {
                return (
                    <NavigationButton
                        className={classNames(
                            isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-black',
                            className,
                        )}
                        icon={icon}
                        label={label}
                    />
                )
            }}
        </NavLink>
    ),
)

NavigationLink.displayName = 'NavigationLink'

export default NavigationLink
