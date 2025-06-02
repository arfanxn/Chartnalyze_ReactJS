export const isEven = (num: number): boolean => num % 2 === 0

export const isNumber = (value: unknown): value is number =>
    typeof value === 'number' && isFinite(value)

export const isString = (value: unknown): value is string =>
    typeof value === 'string'
