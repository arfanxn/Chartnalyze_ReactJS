import { ChildrenProps, ClassNameProps } from '@/types/componentTypes'
import classNames from 'classnames'

type Props = ClassNameProps & ChildrenProps & {}

export default function CButton(props: Props) {
    return (
        <button
            className={classNames(
                'bg-primary rounded-md px-2 py-1 text-white md:px-4 md:py-2',
                props.className,
            )}
        >
            {props.children}
        </button>
    )
}
