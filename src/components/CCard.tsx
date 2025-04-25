import { ChildrenProps, ClassNameProps } from '@/types/componentTypes'
import classNames from 'classnames'

type Props = ClassNameProps & ChildrenProps & {}

export default function CCard(props: Props) {
    return (
        <article
            className={classNames(
                'rounded-md text-white shadow-[0px_10px_0px_1px_rgba(0,0,0,0.25)] outline outline-black',
                props.className,
            )}
        >
            {props.children}
        </article>
    )
}
