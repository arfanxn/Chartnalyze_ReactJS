// External libraries
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { string, object } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useRef } from 'react'
import classNames from 'classnames'
// Services
import * as userService from '@/services/userService'
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
import Header from '@/components/landing/Header'
import Layout from '@/layouts/Layout'
import axios from 'axios'
import { useSelfStore } from '@/stores/useSelfStore'

const schema = object().shape({
    code: string().label('Code').required().length(6),
})

function Verify() {
    const navigate = useNavigate()
    const self = useSelfStore((state) => state.self)
    const hasSent = useRef(false)

    const { countdown, isCountdowning, startCountdown, resetCountdown } =
        useCountdown(90)

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const verifyAction = async () => {
        try {
            const form = getValues()
            const { message } = await userService.verify(form)
            toast({ message, type: 'success' })
            navigate('/dashboard', { replace: true })
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (isUnprocessableEntity(e)) {
                    handleUnprocessableEntity(e.response!.data.errors, setError)
                }
            }
            throw e
        }
    }

    const sendAction = useCallback(async () => {
        if (self === null) return

        await otpService.send({ email: self!.email }).catch((e) => {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 429) {
                    toast({
                        message:
                            'OTP did not send properly, please try resending',
                        type: 'error',
                    })
                }
            }
        })
    }, [self])

    const resendAction = async () => {
        if (self === null) return

        try {
            resetCountdown()
            startCountdown()
            toast({ message: 'Otp sent successfully', type: 'success' })
            const form = { email: self!.email }
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
            sendAction()
        }
    }, [sendAction, startCountdown])

    return (
        <Layout>
            <Header />
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <CCard className="w-full space-y-4 p-8 md:my-24 md:w-[50%] lg:w-[33%]">
                    <header>
                        <h3 className="text-lg font-semibold text-black md:text-2xl">
                            We just sent an Email
                        </h3>
                        <p className="inline-flex flex-col text-sm font-extralight text-black md:text-base">
                            <span>Enter the otp we sent to</span>
                            <span className="text-primary">{self?.email}</span>
                        </p>
                    </header>

                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(verifyAction)}
                    >
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
                                onClick={resendAction}
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
                                className="text-black/25"
                                icon="lucide:clock"
                            />
                            <span className="font-semibold text-black">
                                {countdown}s
                            </span>
                        </div>
                    </div>
                </CCard>
            </section>
        </Layout>
    )
}

Verify.displayName = 'Verify'

export default Verify
