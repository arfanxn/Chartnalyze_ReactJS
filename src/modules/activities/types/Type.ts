export const TYPES = ['register', 'verify_email', 'login', 'logout'] as const

export type Type = (typeof TYPES)[number]
