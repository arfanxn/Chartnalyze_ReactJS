import { ClassNameProps } from '@/types/componentTypes'
// import CImage from '@/components/CImage'
import classNames from 'classnames'
import CImage from '@/components/CImage'

type Props = ClassNameProps & {}

export default function TheLogo(props: Props) {
    return (
        <CImage
            className={(classNames(props.className), 'aspect-3/4 h-full w-fit')}
            src="/logo-3:4.png"
            alt="Logo"
        />
    )
}
