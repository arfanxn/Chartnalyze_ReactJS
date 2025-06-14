import * as otpRepository from '@/modules/otps/otpRepository'

export const send = async (form: {
    email: string
}): Promise<{ message: string }> => {
    const response = await otpRepository.send(form)
    return {
        message: response.data.message,
    }
}
