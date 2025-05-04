import { ResponseBody, ResponseBodyErrors } from '@/types/responseTypes'
import axios, { AxiosError } from 'axios'
import { FieldValues, UseFormSetError, FieldPath } from 'react-hook-form'

export const handleUnprocessableEntity = <T extends FieldValues>(
    errors: ResponseBodyErrors,
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

export const isUnprocessableEntity = (error: unknown): error is AxiosError<ResponseBody> => {
    return (
        axios.isAxiosError(error) &&
        error.response?.status === 422 &&
        'errors' in error.response.data &&
        typeof error.response.data.errors === 'object'
    )
}
