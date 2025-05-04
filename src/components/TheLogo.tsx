import { forwardRef, ImgHTMLAttributes } from 'react'
import classNames from 'classnames'
import CImage from '@/components/CImage'

type Props = ImgHTMLAttributes<HTMLImageElement>

const TheLogo = forwardRef<HTMLImageElement, Props>(
    ({ className, ...props }, ref) => (
        <CImage
            ref={ref}
            className={classNames('aspect-3/4 h-full w-fit', className)}
            src="/logo-3-4.png"
            alt="Logo"
            {...props}
        />
    ),
)

TheLogo.displayName = 'TheLogo'

export default TheLogo
