import { ClassNameProps } from '@/types/componentTypes'
import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'

type Props = ClassNameProps & {
    icon: string
}

export default function CIcon(props: Props) {
    return (
        <Icon icon={props.icon} className={classNames('', props.className)} />
    )
}
