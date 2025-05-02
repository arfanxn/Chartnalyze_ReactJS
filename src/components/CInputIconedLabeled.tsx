import { ClassNameProps, OnClick, OnInputProps } from '@/types/componentTypes'
import CIcon from '@/components/CIcon'
import CInput from '@/components/CInput'
import classNames from 'classnames'
import { ulid } from 'ulid'
import { useState } from 'react'

type Props = ClassNameProps &
    OnInputProps & {
        label?: string
        labelClassName?: string
        icon?: string
        iconOnClick?: OnClick
        iconClassName?: string
        inputClassName?: string
    }

export default function CInputIconedLabeled(props: Props) {
    const inputId = ulid()

    const [isInputOnFocus, setIsInputOnFocus] = useState(false)

    return (
        <div className={classNames('flex flex-col gap-y-1', props.className)}>
            {props.label && (
                <div>
                    <label
                        htmlFor={inputId}
                        className={classNames(
                            'text-sm text-black',
                            props.labelClassName,
                        )}
                    >
                        {props.label}
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
                    id={inputId}
                    onInput={props.onInput}
                    className={classNames(
                        'w-full px-0! py-0! outline-none! focus:outline-none!',
                        props.inputClassName,
                    )}
                    onFocus={() => setIsInputOnFocus(true)}
                    onBlur={() => setIsInputOnFocus(false)}
                />
                {props.icon && (
                    <button onClick={props.iconOnClick}>
                        <CIcon
                            icon={props.icon}
                            className={classNames(
                                'text-lg text-black md:text-2xl',
                                props.iconClassName,
                            )}
                        />
                    </button>
                )}
            </div>
        </div>
    )
}
