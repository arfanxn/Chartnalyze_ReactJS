import { forwardRef, ImgHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = ImgHTMLAttributes<HTMLImageElement>

const CImage = forwardRef<HTMLImageElement, Props>(
    ({ className, ...props }, ref) => (
        <img ref={ref} className={classNames(className)} {...props} />
    ),
)

CImage.displayName = 'CImage'

export default CImage
