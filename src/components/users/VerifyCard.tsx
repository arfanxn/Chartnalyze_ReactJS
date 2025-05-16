// External libraries
import { useForm } from 'react-hook-form'
import { string, object, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useRef,
} from 'react'
import classNames from 'classnames'
// Services
import * as otpService from '@/services/otpService'
import {
    handleUnprocessableEntity,
    isUnprocessableEntity,
} from '@/helpers/errorHelpers'
import { toast } from '@/helpers/toastHelpers'
// Custom hooks
import { useCountdown } from '@/hooks/useCountdown'
// Components
import CButton from '@/components/CButton'
import CCard from '@/components/CCard'
import CInputIconedLabeled from '@/components/CInputIconedLabeled'
import CAlert from '@/components/CAlert'
import CIcon from '@/components/CIcon'
import axios from 'axios'

const COUNTDOWN = 90 // 90 seconds

const schema = object().shape({
    email: string().label('Email').required().email().min(2).max(50),
    code: number()
        .label('Code')
        .typeError('Code must be a number')
        .required()
        .integer('Code must be a number')
        .min(100000, 'Code must be 6 digits')
        .max(999999, 'Code must be 6 digits'),
})

type Props = HTMLAttributes<HTMLDivElement> & {
    email: string
    code?: number
    onVerify: (form: { email: string; code: number }) => Promise<void> | void
}

const VerifyCard = forwardRef<HTMLDivElement, Props>(
    ({ className, email, code, onVerify, ...props }, ref) => {
        const hasSent = useRef(false)

        const { countdown, isCountdowning, startCountdown, resetCountdown } =
            useCountdown(COUNTDOWN)

        const {
            register,
            handleSubmit,
            getValues,
            setValue,
            setError,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
        })

        useEffect(() => {
            if (email) setValue('email', email)
            if (code) setValue('code', code)

            console.log('useEffect', { email, code })
        }, [email, code, setValue])

        const handleVerify = async () => {
            console.log('handleVerify', getValues())

            try {
                const form = getValues()
                let result = onVerify(form)
                if (result instanceof Promise) result = await result
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    if (isUnprocessableEntity(e)) {
                        handleUnprocessableEntity(
                            e.response!.data.errors,
                            setError,
                        )
                    }
                }
                throw e
            }
        }

        const handleSend = useCallback(async () => {
            try {
                await otpService.send({ email: email })
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    if (e.response?.status === 429)
                        toast({
                            message:
                                'OTP did not send properly, please try resending',
                            type: 'error',
                        })
                }
            }
        }, [email])

        const handleResend = async () => {
            try {
                resetCountdown()
                startCountdown()
                toast({ message: 'Otp sent successfully', type: 'success' })
                const form = { email: email }
                await otpService.send(form)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    if (e.response?.status === 429) {
                        toast({
                            message: e.response.data.message,
                            type: 'error',
                        })
                    }
                }
                throw e
            }
        }

        useEffect(() => {
            if (!hasSent.current) {
                hasSent.current = true
                startCountdown()
                handleSend()
            }
        }, [handleSend, startCountdown])

        return (
            <CCard
                ref={ref}
                className={classNames(
                    'w-full space-y-4 p-8 md:my-24 md:w-[50%] lg:w-[33%]',
                    className,
                )}
                {...props}
            >
                <header>
                    <h3 className="text-lg font-semibold text-black md:text-2xl">
                        We just sent an Email
                    </h3>
                    <p className="inline-flex flex-col text-sm font-extralight text-black md:text-base">
                        <span>Enter the otp we sent to</span>
                        <span className="text-primary">{email}</span>
                    </p>
                </header>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(handleVerify)}
                >
                    <input {...register('email')} type="hidden" />
                    <div className="space-y-1">
                        <CInputIconedLabeled
                            inputProps={{
                                ...register('code'),
                                autoComplete: 'off',
                            }}
                        />
                        {errors.code && (
                            <CAlert
                                message={errors.code.message!}
                                type="error"
                            />
                        )}
                    </div>

                    <CButton className="w-full py-2! font-semibold md:text-base">
                        Done
                    </CButton>
                </form>

                <div className="flex flex-row items-center justify-between">
                    <p className="text-center text-base font-semibold text-black">
                        Didn't get the code?{' '}
                        <button
                            onClick={handleResend}
                            disabled={isCountdowning}
                            type="button"
                            className={classNames('text-primary', {
                                'cursor-wait': isCountdowning,
                            })}
                        >
                            Resend it
                        </button>
                    </p>

                    <div
                        className={classNames(
                            'inline-flex items-center gap-x-0.5 transition-opacity duration-300',
                            {
                                'opacity-0': isCountdowning === false,
                            },
                        )}
                    >
                        <CIcon
                            className="text-neutral-300"
                            icon="lucide:clock"
                        />
                        <span className="font-semibold text-black">
                            {countdown}s
                        </span>
                    </div>
                </div>
            </CCard>
        )
    },
)

VerifyCard.displayName = 'VerifyCard'

export default VerifyCard
