import { ResponseBodyErrors } from '@/shared/types/responses'
import axios, { AxiosError } from 'axios'
import { FieldValues, UseFormSetError, FieldPath } from 'react-hook-form'

export const isUnprocessableEntity = (
    error: unknown,
): error is AxiosError<ResponseBodyErrors> => {
    if (
        axios.isAxiosError(error) &&
        'response' in error &&
        error.response !== undefined &&
        error.response.status === 422 &&
        'errors' in error.response.data &&
        typeof error.response.data.errors === 'object'
    )
        return true
    return false
}

export const handleUnprocessableEntity = <T extends FieldValues>(
    errors: Record<string, string | string[]>,
    setError: UseFormSetError<T>,
): void => {
    Object.entries(errors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages
        setError(field as FieldPath<T>, {
            type: 'server',
            message: message,
        })
    })
}
