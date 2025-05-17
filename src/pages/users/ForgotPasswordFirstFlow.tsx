import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CAlert from '@/components/CAlert'
import CButton from '@/components/CButton'
import CCard from '@/components/CCard'
import classNames from 'classnames'
import CInputIconedLabeled from '@/components/CInputIconedLabeled'
import EntryLayout from '@/layouts/EntryLayout'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { useEffect } from 'react'

const schema = object().shape({
    email: string().label('Email').required().email().min(2).max(16),
})

function ForgotPasswordFirstFlow() {
    const location = useLocation()
    const navigate = useNavigate()

    const email = location.state?.form?.email as string | undefined

    const {
        register: registerInput,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handle = async () => {
        const form = getValues()
        navigate('/users/forgot-password/flows/second', { state: { form } })
    }

    useEffect(() => {
        if (email) {
            setValue('email', email)
        }
    }, [email, setValue])

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
                        <p className="text-primary inline-flex flex-col text-sm font-extralight md:text-base">
                            We will send a code to your email for verification
                        </p>
                    </header>

                    <form className="space-y-4" onSubmit={handleSubmit(handle)}>
                        <div className="space-y-1">
                            <CInputIconedLabeled
                                label="Your email address"
                                inputProps={{
                                    ...registerInput('email'),
                                }}
                            />
                            {errors.email && (
                                <CAlert
                                    message={errors.email.message!}
                                    type="error"
                                />
                            )}
                        </div>

                        <CButton className="w-full py-2! font-semibold md:text-base">
                            Continue
                        </CButton>
                    </form>

                    <p className="text-center text-base font-semibold text-black">
                        Remember your password?{' '}
                        <Link to="/users/login" className="text-primary">
                            Login
                        </Link>
                    </p>
                </CCard>
            </section>
        </EntryLayout>
    )
}

export default ForgotPasswordFirstFlow
