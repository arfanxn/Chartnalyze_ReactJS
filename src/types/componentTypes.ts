import React from 'react'

export type MiddlewareComponent = React.FC<{
    children?: never
    next: () => void | Promise<void>
}>

export type OnClick = (event: React.MouseEvent<HTMLButtonElement>) => void
export type OnClickProps = {
    onClick?: OnClick
}

export type OnSubmit = (event: React.FormEvent<HTMLFormElement>) => void
export type OnSubmitProps = {
    onSubmit?: OnSubmit
}

export type OnInput = (event: React.FormEvent<HTMLInputElement>) => void
export type OnInputProps = {
    onInput?: OnInput
}

export type OnFocus = (event: React.FocusEvent<HTMLInputElement>) => void
export type OnFocusProps = {
    onFocus?: OnFocus
}

export type OnBlur = (event: React.FocusEvent<HTMLInputElement>) => void
export type OnBlurProps = {
    onBlur?: OnBlur
}
