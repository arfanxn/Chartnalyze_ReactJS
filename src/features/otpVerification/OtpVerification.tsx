import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { number, object, string } from 'yup'
import axios from 'axios'
import classNames from 'classnames'

// Services
import * as otpService from '@/modules/otps/otpService'

// Helpers
import { isUnprocessableEntity } from '@/shared/helpers/errorHelpers'
import { toast } from '@/shared/helpers/toastHelpers'

// Layouts
import EntryLayout from '@/core/layouts/EntryLayout'

// Components
import CAlert from '@/shared/components/CAlert'
import CButton from '@/shared/components/CButton'
import CCard from '@/shared/components/CCard'
import CIcon from '@/shared/components/CIcon'
import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'

// Hooks
import { useCountdown } from '@/shared/hooks/useCountdown'
import useLocalStorage from 'use-local-storage'
import { useSelfStore } from '@/core/stores/useSelfStore'

// Constants
const COUNTDOWN_DURATION = 90 // Seconds
type FormAction = 'verify-self-email' | 'update-self-email' | 'reset-password'

// Validation Schema
const validationSchema = object().shape({
    email: string().label('Email').required().email().min(2).max(50),
    code: number()
        .label('Code')
        .typeError('Code must be a number')
        .required()
        .integer('Code must be a number')
        .min(100000, 'Code must be 6 digits')
        .max(999999, 'Code must be 6 digits'),
})

// Type Definitions
type FormValues = {
    email: string
    code: number
}
type OptionalFormValues = Partial<FormValues>
type PersistedFormValues = Omit<OptionalFormValues, 'code'>
type Errors = {
    email?: string | string[]
    code?: string | string[]
}

function OtpVerification() {
    // Routing and State Hooks
    const { state: locationState, search } = useLocation()
    const action = new URLSearchParams(search).get(
        'action',
    ) as FormAction | null
    const navigate = useNavigate()

    // Form Persistence
    const [persistedForm, setPersistedForm] = useLocalStorage<
        PersistedFormValues | undefined
    >('otp-verification-form', undefined)

    // Form Control
    const {
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    })

    // Countdown Management
    const [persistedCountdownWillFinishAt, setPersistedCountdownWillFinishAt] =
        useLocalStorage<number | undefined>(
            'otp-verification-countdown-will-finish-at',
            undefined,
        )
    const {
        countdown,
        countdownWillFinishAt,
        isCountdowning,
        startCountdownFrom,
        startCountdown,
        resetCountdown,
    } = useCountdown(COUNTDOWN_DURATION)

    // Form Watchers
    const watchedFormEmail = useWatch({ control, name: 'email' })

    // ============================================================
    //                  Action Handler Helper
    // ============================================================

    const handleActionSuccess = (message: string, redirectPath: string) => {
        toast({ message, type: 'success' })
        navigate(redirectPath, { replace: true })
        setPersistedForm(undefined)
    }

    // ============================================================
    //                      Action Handlers
    // ============================================================

    const handleVerifySelfEmail = async (form: FormValues) => {
        const { message } = await useSelfStore.getState().verifyEmail(form)
        handleActionSuccess(message, '/dashboard')
    }

    const handleUpdateSelfEmail = async (form: FormValues) => {
        const { message } = await useSelfStore.getState().updateEmail(form)
        handleActionSuccess(message, '/users/self/account/edit')
    }

    const handleResetPassword = async (form: FormValues) => {
        navigate('/users/reset-password', { replace: true, state: { form } })
    }

    // ============================================================
    //                  Form Submission Handler
    // ============================================================

    const handler = async () => {
        try {
            const formValues = getValues()

            switch (action) {
                case 'verify-self-email':
                    await handleVerifySelfEmail(formValues)
                    break
                case 'update-self-email':
                    await handleUpdateSelfEmail(formValues)
                    break
                case 'reset-password':
                    await handleResetPassword(formValues)
                    break
                default:
                    navigate(-1)
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log('yes it is axios error', error.response?.data)

                if (isUnprocessableEntity(error)) {
                    Object.entries(error.response!.data.errors).forEach(
                        ([field, messages]) => {
                            const message = Array.isArray(messages)
                                ? messages[0]
                                : messages

                            if (field === 'code') {
                                setError(field, {
                                    type: 'server',
                                    message: message,
                                })
                            } else {
                                toast({ message, type: 'error' })
                            }
                        },
                    )
                }
            }
            throw error
        }
    }

    // ============================================================
    //                      OTP Management
    // ============================================================

    const sendOtp = useCallback(async () => {
        try {
            const { email } = getValues()
            await otpService.send({ email })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                toast({
                    message: 'OTP did not send properly, please try resending',
                    type: 'error',
                })
            }
        }
    }, [getValues])

    const handleResendOtp = async () => {
        try {
            resetCountdown()
            startCountdown()
            toast({ message: 'OTP sent successfully', type: 'success' })
            await sendOtp()
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                toast({ message: error.response.data.message, type: 'error' })
            }
            throw error
        }
    }

    // ============================================================
    //                          Side effects
    // ============================================================

    useEffect(() => {
        try {
            if (!action) {
                navigate(-1)
                return
            }

            const locationEmail = (locationState?.form as OptionalFormValues)
                ?.email
            const persistentEmail = persistedForm?.email

            if (locationEmail) {
                setValue('email', locationEmail)
            } else if (persistentEmail) {
                setValue('email', persistentEmail)
            } else {
                navigate(-1)
                return
            }

            const locationErrors = locationState?.errors as Errors | undefined

            if (locationErrors) {
                const locationErrorKeys = Object.keys(
                    locationErrors,
                ) as (keyof Errors)[]

                locationErrorKeys.forEach((key) => {
                    const error = locationErrors[key]
                    if (!error) return

                    const message = Array.isArray(error) ? error[0] : error

                    setError(key, { message })
                })
            }

            const remainingSeconds = persistedCountdownWillFinishAt
                ? Math.floor(
                      (persistedCountdownWillFinishAt - Date.now()) / 1000,
                  )
                : 0

            if (remainingSeconds > 0) {
                startCountdownFrom(remainingSeconds)
            } else {
                startCountdown()
                sendOtp()
            }
        } catch (e) {
            navigate(-1)
            throw e
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setPersistedForm({
            email: watchedFormEmail,
        })
    }, [watchedFormEmail, setPersistedForm])

    useEffect(() => {
        if (countdownWillFinishAt)
            setPersistedCountdownWillFinishAt(countdownWillFinishAt)
        else setPersistedCountdownWillFinishAt(undefined)
    }, [countdownWillFinishAt, setPersistedCountdownWillFinishAt])

    // Render
    if (!watchedFormEmail || !action) return <div>Error</div>

    return (
        <EntryLayout>
            {/* JSX preserved as per request */}
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <CCard
                    className={classNames(
                        'w-full space-y-4 p-8 md:my-24 md:w-[50%] lg:w-[33%]',
                    )}
                >
                    <header>
                        <h3 className="text-lg font-semibold text-black md:text-2xl">
                            We just sent an Email
                        </h3>
                        <p className="inline-flex flex-col text-sm font-extralight text-black md:text-base">
                            <span>Enter the OTP we sent to</span>
                            <span className="text-primary">
                                {watchedFormEmail}
                            </span>
                        </p>
                    </header>

                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handler)}
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
                                onClick={handleResendOtp}
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
                                { 'opacity-0': !isCountdowning },
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
            </section>
        </EntryLayout>
    )
}

export default OtpVerification
