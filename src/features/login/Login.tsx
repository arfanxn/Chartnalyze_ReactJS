import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    handleUnprocessableEntity,
    isUnprocessableEntity,
} from '@/shared/helpers/errorHelpers'
import { useSelfStore } from '@/core/stores/useSelfStore'
import { toast } from '@/shared/helpers/toastHelpers'
import CAlert from '@/shared/components/CAlert'
import CButton from '@/shared/components/CButton'
import CCard from '@/shared/components/CCard'
import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'
import CInputPassword from '@/shared/components/CInputPassword'
import CButtonIconned from '@/shared/components/CButtonIconned'
import EntryLayout from '@/core/layouts/EntryLayout'

const schema = object().shape({
    identifier: string().label('Email or username').required().min(2).max(50),
    password: string().label('Password').required().min(8).max(50),
})

function Login() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const login = useSelfStore((state) => state.login)
    const loginGoogleAuthorized = useSelfStore(
        (state) => state.loginGoogleAuthorized,
    )

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

    const handleLoginGoogle = async () => {
        const baseURL = import.meta.env.VITE__API_URL
        window.location.href = `${baseURL}/api/users/login/google`
    }

    const handleLoginGoogleAuthorized = async () => {
        try {
            const { message } = await loginGoogleAuthorized(searchParams)
            toast({ message, type: 'success' })
            navigate('/dashboard', { replace: true })
        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast({ message: e.response!.data.message, type: 'error' })
            }
            throw e
        }
    }

    useEffect(() => {
        if (searchParams.has('state') && searchParams.has('code')) {
            handleLoginGoogleAuthorized()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

                        <div className="flex flex-col gap-y-1">
                            <CButton className="mt-2 w-full py-2! font-semibold md:text-base">
                                Login
                            </CButton>
                            <CButtonIconned
                                className="mt-2 w-full flex-row-reverse justify-center gap-2 bg-white! py-2! font-semibold text-black! md:text-base"
                                type="button"
                                onClick={handleLoginGoogle}
                                label="Login with Google"
                                icon="logos:google-icon"
                            />
                        </div>
                    </form>

                    <div className="flex flex-col items-center space-y-0 gap-y-0">
                        <Link to="/users/forgot-password/flows/first">
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
