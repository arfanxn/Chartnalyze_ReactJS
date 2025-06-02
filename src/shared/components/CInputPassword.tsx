// @/shared/components/CInputIconedLabeled.tsx
import { forwardRef, HTMLProps, InputHTMLAttributes, Ref } from 'react'
import classNames from 'classnames'
import { OnClick } from '@/shared/types/components'
import { useBool } from '@/shared/hooks/useBool'
import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'

type Props = {
    label?: string
    labelClassName?: string
    iconOnClick?: OnClick
    iconClassName?: string
    inputProps?: InputHTMLAttributes<HTMLInputElement>
    inputRef?: Ref<HTMLInputElement>
} & HTMLProps<HTMLDivElement>

const CInputPassword = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            label,
            labelClassName,
            iconOnClick,
            iconClassName,
            inputProps,
            inputRef,
            ...rest
        },
        ref,
    ) => {
        const [isPasswordVisible, , togglePasswordVisibility] = useBool()

        const onIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            togglePasswordVisibility()
            iconOnClick?.(e)
        }

        return (
            <CInputIconedLabeled
                {...rest}
                ref={ref}
                inputRef={inputRef}
                className={classNames(className)}
                label={label}
                labelClassName={classNames(labelClassName)}
                inputProps={{
                    ...inputProps,
                    autoComplete: 'off',
                    type: isPasswordVisible ? 'text' : 'password',
                }}
                icon={`lucide:${isPasswordVisible ? 'eye' : 'eye-closed'}`}
                iconOnClick={onIconClick}
                iconClassName={classNames(iconClassName)}
            />
        )
    },
)

CInputPassword.displayName = 'CInputPassword'

export default CInputPassword
