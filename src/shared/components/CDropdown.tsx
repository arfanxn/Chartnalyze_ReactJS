import { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement>

const CDropdown = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={classNames(
                    'absolute top-full right-0 left-auto z-[60] mt-2 space-y-2 rounded-md bg-white p-4 text-black shadow-lg outline outline-neutral-500 transition-opacity duration-150 md:left-auto',
                    className,
                )}
                {...props}
            >
                {props.children}
            </div>
        )
    },
)

CDropdown.displayName = 'CDropdown'

export default CDropdown
