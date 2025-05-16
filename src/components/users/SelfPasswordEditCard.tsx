import { forwardRef, HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { object, ref as yupRef, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import classNames from 'classnames'
import { toast } from '@/helpers/toastHelpers'
import {
    handleUnprocessableEntity,
    isUnprocessableEntity,
} from '@/helpers/errorHelpers'
import * as userService from '@/services/userService'
import CAlert from '@/components/CAlert'
import CButton from '@/components/CButton'
import CCard from '@/components/CCard'
import CInputPassword from '@/components/CInputPassword'
import { useNavigate } from 'react-router'

const schema = object().shape({
    currentPassword: string()
        .label('Current Password')
        .required()
        .min(8)
        .max(50),
    password: string().label('Password').required().min(8).max(50),
    confirmPassword: string()
        .label('Confirm Password')
        .required()
        .oneOf([yupRef('password')], 'Passwords must match'),
})
type Props = HTMLAttributes<HTMLDivElement>

const SelfPasswordEditCard = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const navigate = useNavigate()

        const {
            register: registerInput,
            handleSubmit,
            getValues,
            setError,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
        })

        const handleUpdate = async () => {
            try {
                if (self === null) return

                const form = getValues()
                const { message } = await userService.updateSelfPassword(form)
                toast({ message, type: 'success' })
                navigate('/dashboard', { replace: true })
            } catch (e) {
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

        return (
            <CCard
                ref={ref}
                className={classNames('space-y-4 px-6 py-4', className)}
                {...props}
            >
                <header>
                    <h3 className="text-primary text-2xl font-semibold">
                        Password
                    </h3>
                </header>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(handleUpdate)}
                >
                    <div className="grid grid-cols-1 items-center gap-x-4 lg:grid-cols-1 lg:items-start">
                        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr_1fr]">
                            <div className="space-y-1">
                                <CInputPassword
                                    label="Current Password"
                                    inputProps={{
                                        ...registerInput('currentPassword'),
                                    }}
                                />
                                {errors.currentPassword && (
                                    <CAlert
                                        message={
                                            errors.currentPassword.message!
                                        }
                                        type="error"
                                    />
                                )}
                            </div>
                            <div className="space-y-1">
                                <CInputPassword
                                    label="Password"
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
                                    label="Confirm Password"
                                    inputProps={{
                                        ...registerInput('confirmPassword'),
                                    }}
                                />
                                {errors.confirmPassword && (
                                    <CAlert
                                        message={
                                            errors.confirmPassword.message!
                                        }
                                        type="error"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <CButton type="submit">Update</CButton>
                    </div>
                </form>
            </CCard>
        )
    },
)

SelfPasswordEditCard.displayName = 'SelfPasswordEditCard'

export default SelfPasswordEditCard
