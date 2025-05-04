import { ResponseBodyErrors } from '@/types/responseTypes'
import axios, { AxiosError } from 'axios'
import { FieldValues, UseFormSetError, FieldPath } from 'react-hook-form'
import { toast } from '@/helpers/toastHelpers'

export const isUnprocessableEntity = (
    error: unknown,
): error is AxiosError<ResponseBodyErrors> => {
    return (
        axios.isAxiosError(error) &&
        error.response?.status === 422 &&
        'errors' in error.response.data &&
        typeof error.response.data.errors === 'object'
    )
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

export const handleError = <Fields extends FieldValues>(
    error: unknown,
    additionals?: {
        setError?: UseFormSetError<Fields>
    },
) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            if (isUnprocessableEntity(error) && additionals?.setError)
                handleUnprocessableEntity(
                    error.response.data.errors,
                    additionals.setError,
                )
            else
                toast({
                    message: error.response.data.message,
                    type: 'error',
                })
        }
    } else {
        // TODO: add other error types
    }
}
