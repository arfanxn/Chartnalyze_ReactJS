import { forwardRef, ImgHTMLAttributes } from 'react'
import classNames from 'classnames'
import { User } from '@/modules/users/User'
import CImage from '@/shared/components/CImage'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
    user: User
}

const UserAvatarImage = forwardRef<HTMLImageElement, Props>(
    ({ className, user, ...props }, ref) => {
        return (
            <CImage
                className={classNames(
                    'flex size-8 items-center justify-center overflow-hidden rounded-full outline outline-black md:size-10',
                    className,
                )}
                {...props}
                ref={ref}
                src={
                    user.avatarUrl
                        ? user.avatarUrl
                        : `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                }
            />
        )
    },
)

UserAvatarImage.displayName = 'UserAvatarImage'

export default UserAvatarImage
