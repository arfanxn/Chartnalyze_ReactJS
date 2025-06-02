import { Icon, IconProps } from '@iconify/react'
import classNames from 'classnames'

type Props = IconProps & {}

const CIcon = ({ icon, className, ...props }: Props) => (
    <Icon icon={icon} className={classNames('', className)} {...props} />
)

CIcon.displayName = 'CIcon'

export default CIcon
