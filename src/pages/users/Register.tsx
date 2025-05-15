// External libraries
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// Services
import {
    handleUnprocessableEntity,
    isUnprocessableEntity,
} from '@/helpers/errorHelpers'
import { toast } from '@/helpers/toastHelpers'
// Custom hooks
import { useBool } from '@/hooks/useBool'
// Components
import CAlert from '@/components/CAlert'
import CButton from '@/components/CButton'
import CCard from '@/components/CCard'
import CInputIconedLabeled from '@/components/CInputIconedLabeled'
import EntryLayout from '@/layouts/EntryLayout'
import axios from 'axios'
import { useSelfStore } from '@/stores/useSelfStore'

const schema = object().shape({
    username: string().label('Username').required().min(2).max(16),
    email: string().label('Email').required().email().min(2).max(50),
    password: string().label('Password').required().min(8).max(50),
    confirmPassword: string()
        .label('Confirm Password')
        .required()
        .oneOf([ref('password')], 'Passwords must match'),
})

function Register() {
    const navigate = useNavigate()
    const onboard = useSelfStore((state) => state.onboard)

    const [isPasswordVisible, , togglePasswordVisibility] = useBool()
    const [isConfirmPasswordVisible, , toggleConfirmPasswordVisibility] =
        useBool()

    const {
        register: registerInput,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handleRegister = async () => {
        try {
            const form = getValues()
            await onboard(form)
            toast({
                message:
                    'User registered successfully, please verify your email',
                type: 'success',
            })
            navigate('/users/self/email/verify', { replace: true })
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (isUnprocessableEntity(e)) {
                    handleUnprocessableEntity(e.response!.data.errors, setError)
                }
            }
            throw e
        }
    }

    return (
        <EntryLayout>
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <CCard className="w-full space-y-4 p-8 md:my-24 md:w-[50%] lg:w-[33%]">
                    <h3 className="text-lg font-semibold text-black md:text-2xl">
                        Register
                    </h3>

                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleRegister)}
                    >
                        <div className="space-y-1">
                            <CInputIconedLabeled
                                label="Username"
                                inputProps={{ ...registerInput('username') }}
                            />
                            {errors.username && (
                                <CAlert
                                    message={errors.username.message!}
                                    type="error"
                                />
                            )}
                        </div>
                        <div className="space-y-1">
                            <CInputIconedLabeled
                                label="Email"
                                inputProps={{ ...registerInput('email') }}
                            />
                            {errors.email && (
                                <CAlert
                                    message={errors.email.message!}
                                    type="error"
                                />
                            )}
                        </div>
                        <div className="space-y-1">
                            <CInputIconedLabeled
                                label="Password"
                                inputProps={{
                                    ...registerInput('password'),
                                    autoComplete: 'off',
                                    type: isPasswordVisible
                                        ? 'text'
                                        : 'password',
                                }}
                                icon={`lucide:${isPasswordVisible ? 'eye' : 'eye-closed'}`}
                                iconOnClick={
                                    togglePasswordVisibility as () => void
                                }
                            />
                            {errors.password && (
                                <CAlert
                                    message={errors.password.message!}
                                    type="error"
                                />
                            )}
                        </div>
                        <div className="space-y-1">
                            <CInputIconedLabeled
                                label="Confirm Password"
                                inputProps={{
                                    ...registerInput('confirmPassword'),
                                    autoComplete: 'off',
                                    type: isConfirmPasswordVisible
                                        ? 'text'
                                        : 'password',
                                }}
                                icon={`lucide:${isConfirmPasswordVisible ? 'eye' : 'eye-closed'}`}
                                iconOnClick={
                                    toggleConfirmPasswordVisibility as () => void
                                }
                            />
                            {errors.confirmPassword && (
                                <CAlert
                                    message={errors.confirmPassword.message!}
                                    type="error"
                                />
                            )}
                        </div>

                        <CButton className="mt-2 w-full py-2! font-semibold md:text-base">
                            Register
                        </CButton>
                    </form>

                    <p className="text-center text-base font-semibold text-black">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary">
                            Login
                        </Link>
                    </p>
                </CCard>
            </section>
        </EntryLayout>
    )
}

export default Register
