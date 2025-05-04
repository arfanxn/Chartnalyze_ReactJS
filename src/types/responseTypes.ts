export type ResponseBody = {
    message: string
    status: number
}

export type ResponseBodyData<T> = ResponseBody & {
    data: T
}

export type ResponseBodyErrors = ResponseBody & {
    errors: Record<string, string[]>
}
