import CIcon from '@/components/CIcon'
import { ClassNameProps } from '@/types/componentTypes'
import classNames from 'classnames'

type Props = ClassNameProps & {
    label?: string
    labelClassname?: string
    icon?: string
    iconClassName?: string
}

export default function CButtonIconned(props: Props) {
    if (!props.label && !props.icon) {
        throw new Error('CButtonIconned requires at least a label or an icon.')
    }

    return (
        <button
            className={classNames(
                'inline-flex items-center space-x-1 px-1 py-2',
                props.className,
            )}
        >
            {props.label && (
                <span className={classNames(props.labelClassname)}>
                    {props.label}
                </span>
            )}
            {props.icon && (
                <CIcon
                    icon={props.icon}
                    className={classNames(props.iconClassName)}
                />
            )}
        </button>
    )
}
