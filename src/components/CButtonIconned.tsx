import CButton from '@/components/CButton'
import CIcon from '@/components/CIcon'
import { ClassNameProps } from '@/types/componentTypes'
import classNames from 'classnames'

type Props = ClassNameProps & {
    label: string
    labelClassname?: string
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
        >
            <span className={classNames(props.labelClassname)}>
                {props.label}
            </span>
            <CIcon
                icon={props.icon}
                className={classNames(props.iconClassName)}
            />
        </CButton>
    )
}
