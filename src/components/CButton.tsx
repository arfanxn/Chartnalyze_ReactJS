import {
    ChildrenProps,
    ClassNameProps,
    OnClickProps,
} from '@/types/componentTypes'
import classNames from 'classnames'

type Props = ClassNameProps & ChildrenProps & OnClickProps & {}

export default function CButton(props: Props) {
    return (
        <button
            className={classNames(
                'bg-primary rounded-md px-2 py-1 text-white md:px-4 md:py-2',
                props.className,
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
