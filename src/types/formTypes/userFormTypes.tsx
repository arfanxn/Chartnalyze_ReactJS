export type RegisterForm = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export type LoginForm = {
    identifier: string // username or email
    password: string
}

export type ResetPasswordForm = {
    email: string
    password: string
    confirmPassword: string
    code: number
}

export type UpdateSelfForm = {
    name: string | null
    birthDate: string | null
    username: string
}

export type UpdateSelfEmailForm = {
    email: string
    code: number
}
