import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    handleUnprocessableEntity,
    isUnprocessableEntity,
} from '@/helpers/errorHelpers'
import { useSelfStore } from '@/stores/useSelfStore'
import { toast } from '@/helpers/toastHelpers'
import { useBool } from '@/hooks/useBool'
import CAlert from '@/components/CAlert'
import CButton from '@/components/CButton'
import CCard from '@/components/CCard'
import CInputIconedLabeled from '@/components/CInputIconedLabeled'
import EntryLayout from '@/layouts/EntryLayout'
import axios from 'axios'

const schema = object().shape({
    identifier: string().label('Email or username').required().min(2).max(16),
    password: string().label('Password').required().min(8).max(50),
})

function Login() {
    const navigate = useNavigate()
    const login = useSelfStore((state) => state.login)

    const [isPasswordVisible, , togglePasswordVisibility] = useBool()
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

    const handleLogin = async () => {
        try {
            const form = getValues()
            const { message } = await login(form)
            // TODO: update toast implementation
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

    return (
        <EntryLayout>
            <section className="flex min-h-[100vh] flex-row items-center justify-center">
                <CCard className="w-full space-y-4 p-8 md:my-24 md:w-[50%] lg:w-[33%]">
                    <h3 className="text-lg font-semibold text-black md:text-2xl">
                        Login
                    </h3>

                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        <div className="space-y-1">
                            <CInputIconedLabeled
                                label="Your email or username"
                                inputProps={{ ...registerInput('identifier') }}
                            />
                            {errors.identifier && (
                                <CAlert
                                    message={errors.identifier.message!}
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

                        <CButton className="mt-2 w-full py-2! font-semibold md:text-base">
                            Login
                        </CButton>
                    </form>

                    <div className="flex flex-col items-center space-y-0 gap-y-0">
                        <Link to="/forgot-password">
                            <p className="text-base font-semibold text-black">
                                Forgot password?
                            </p>
                        </Link>

                        <span className="text-base font-semibold text-black">
                            or
                        </span>

                        <Link to="/users/register">
                            <p className="text-primary text-base font-semibold">
                                Don't have an account yet?
                            </p>
                        </Link>
                    </div>
                </CCard>
            </section>
        </EntryLayout>
    )
}

export default Login
