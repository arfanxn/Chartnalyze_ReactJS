// @/components/CInputIconedLabeled.tsx
import {
    forwardRef,
    HTMLProps,
    InputHTMLAttributes,
    Ref,
    useState,
} from 'react'
import CIcon from '@/components/CIcon'
import CInput from '@/components/CInput'
import classNames from 'classnames'
import { ulid } from 'ulid'
import { OnClick } from '@/types/componentTypes'

type Props = {
    label?: string
    labelClassName?: string
    icon?: string
    iconOnClick?: OnClick
    iconClassName?: string
    inputProps?: InputHTMLAttributes<HTMLInputElement>
    inputRef?: Ref<HTMLInputElement>
} & HTMLProps<HTMLDivElement>

const CInputIconedLabeled = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            label,
            labelClassName,
            icon,
            iconOnClick,
            iconClassName,
            inputProps,
            inputRef,
            ...rest
        },
        ref,
    ) => {
        const inputId = ulid()
        const [isInputOnFocus, setIsInputOnFocus] = useState(false)

        const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsInputOnFocus(true)
            inputProps?.onFocus?.(e)
        }

        const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsInputOnFocus(false)
            inputProps?.onBlur?.(e)
        }

        return (
            <div
                ref={ref}
                className={classNames('flex flex-col gap-y-1', className)}
                {...rest}
            >
                {label && (
                    <div>
                        <label
                            htmlFor={inputId}
                            className={classNames(
                                'text-sm text-black',
                                labelClassName,
                            )}
                        >
                            {label}
                        </label>
                    </div>
                )}

                <div
                    className={classNames(
                        'flex flex-row items-center justify-between gap-x-1 rounded-md bg-white px-2 py-1 outline-1 transition-colors duration-150',
                        isInputOnFocus ? 'outline-black' : 'outline-black/25',
                    )}
                >
                    <CInput
                        ref={inputRef}
                        {...inputProps}
                        id={inputId}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        className={classNames(
                            'w-full px-0! py-0! outline-none! focus:outline-none!',
                            inputProps?.className,
                        )}
                    />

                    {icon && (
                        <button type="button" onClick={iconOnClick}>
                            <CIcon
                                icon={icon}
                                className={classNames(
                                    'text-sm text-black md:text-lg',
                                    iconClassName,
                                )}
                            />
                        </button>
                    )}
                </div>
            </div>
        )
    },
)

CInputIconedLabeled.displayName = 'CInputIconedLabeled'

export default CInputIconedLabeled
