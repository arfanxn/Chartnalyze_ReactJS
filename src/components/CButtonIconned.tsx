import CButton from '@/components/CButton'
import CIcon from '@/components/CIcon'
import { ClassNameProps, OnClickProps } from '@/types/componentTypes'
import classNames from 'classnames'

type Props = ClassNameProps &
    OnClickProps & {
        label: string
        labelClassName?: string
        icon: string
        iconClassName?: string
    }

export default function CButtonIconned(props: Props) {
    return (
        <CButton
            className={classNames(
                'inline-flex items-center space-x-2',
                props.className,
            )}
            onClick={props.onClick}
        >
            <span className={classNames(props.labelClassName)}>
                {props.label}
            </span>
            <CIcon
                icon={props.icon}
                className={classNames(props.iconClassName)}
            />
        </CButton>
    )
}
