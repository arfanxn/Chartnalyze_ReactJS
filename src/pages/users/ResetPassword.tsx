import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { object, ref as yupRef, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    handleUnprocessableEntity,
    isUnprocessableEntity,
} from '@/helpers/errorHelpers'
import CAlert from '@/components/CAlert'
import CButton from '@/components/CButton'
import CCard from '@/components/CCard'
import CInputPassword from '@/components/CInputPassword'
import EntryLayout from '@/layouts/EntryLayout'
import axios from 'axios'
import classNames from 'classnames'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import * as userService from '@/services/userService'
import { toast } from '@/helpers/toastHelpers'

const schema = object().shape({
    password: string().label('New Password').required().min(8).max(50),
    confirmPassword: string()
        .label('New Confirm Password')
        .required()
        .oneOf([yupRef('password')], 'Passwords must match'),
})

function ResetPasssword() {
    const { state: locationState } = useLocation()
    const navigate = useNavigate()

    const { email, code } =
        locationState?.form ||
        ({} as {
            email: string | undefined
            code: number | undefined
        })

    const {
        register: registerInput,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handle = async () => {
        if (email === null) return

        const { password, confirmPassword } = getValues()
        const form = { code, email, password, confirmPassword }

        try {
            const { message } = await userService.resetPassword(form)
            toast({ message, type: 'success' })
            navigate('/users/login', { replace: true })
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (isUnprocessableEntity(e)) {
                    if (e.response?.data.errors?.code) {
                        const action = 'reset-password'
                        navigate(`/otps/verify?action=${action}`, {
                            replace: true,
                            state: {
                                form: { code, email },
                                errors: e.response?.data.errors,
                            },
                        })
                        return
                    } else {
                        handleUnprocessableEntity(
                            e.response!.data.errors,
                            setError,
                        )
                    }
                }
            }
            throw e
        }
    }

    useEffect(() => {
        if (!email || !code) navigate('/users/forgot-password')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <EntryLayout>
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <CCard
                    className={classNames(
                        'w-full space-y-4 p-8 md:my-24 md:w-[50%] lg:w-[33%]',
                    )}
                >
                    <header>
                        <h3 className="text-lg font-semibold text-black md:text-2xl">
                            Reset your password
                        </h3>
                        <p className="inline-flex flex-col text-sm font-extralight text-black md:text-base">
                            <span>Enter the new password for</span>
                            <span className="text-primary">{email}</span>
                        </p>
                    </header>

                    <form className="space-y-4" onSubmit={handleSubmit(handle)}>
                        <div className="space-y-1">
                            <CInputPassword
                                label="New Password"
                                inputProps={{
                                    ...registerInput('password'),
                                }}
                            />
                            {errors.password && (
                                <CAlert
                                    message={errors.password.message!}
                                    type="error"
                                />
                            )}
                        </div>

                        <div className="space-y-1">
                            <CInputPassword
                                label="New Confirm Password"
                                inputProps={{
                                    ...registerInput('confirmPassword'),
                                }}
                            />
                            {errors.confirmPassword && (
                                <CAlert
                                    message={errors.confirmPassword.message!}
                                    type="error"
                                />
                            )}
                        </div>

                        <CButton className="w-full py-2! font-semibold md:text-base">
                            Update
                        </CButton>
                    </form>

                    <p className="text-center text-base font-semibold text-black">
                        Incorrect email?{' '}
                        <Link
                            to="/users/forgot-password/flows/first"
                            state={{ form: { email } }}
                            className="text-primary"
                        >
                            Back
                        </Link>
                    </p>
                </CCard>
            </section>
        </EntryLayout>
    )
}

export default ResetPasssword
