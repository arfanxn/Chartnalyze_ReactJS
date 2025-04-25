import { ClassNameProps } from '@/types/componentTypes'
// import CImage from '@/components/CImage'
import classNames from 'classnames'
import CIcon from '@/components/CIcon'

type Props = ClassNameProps & {}

export default function CLogo(props: Props) {
    return (
        // <CImage
        //     className={classNames(props.className)}
        //     src="/logo.png"
        //     alt="Logo"
        // />
        <CIcon
            className={classNames(props.className)}
            icon="mdi:alphabet-c-box"
        />
    )
}
