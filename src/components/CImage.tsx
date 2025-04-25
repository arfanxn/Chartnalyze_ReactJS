import { ClassNameProps } from '@/types/componentTypes'
import classNames from 'classnames'

type Props = ClassNameProps & {
    src?: string
    alt?: string
}

export default function CImage(props: Props) {
    return (
        <img
            className={classNames(props.className)}
            src={props.src}
            alt={props.alt}
        />
    )
}
