import { forwardRef, HTMLAttributes, useEffect /* useRef */ } from 'react'
import classNames from 'classnames'
import { useSelfStore } from '@/core/stores/useSelfStore'
import CButton from '@/shared/components/CButton'
import CCard from '@/shared/components/CCard'
// import CIcon from '@/shared/components/CIcon'
import CAlert from '@/shared/components/CAlert'
import CInputIconedLabeled from '@/shared/components/CInputIconedLabeled'
import { object, string /*mixed*/ } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import axios from 'axios'
import {
    handleUnprocessableEntity,
    isUnprocessableEntity,
} from '@/shared/helpers/errorHelpers'
import { useNavigate } from 'react-router'
import { toast } from '@/shared/helpers/toastHelpers'
import UserAvatarImage from '@/core/components/users/UserAvatarImage'

const schema = object().shape({
    // avatar: mixed<File>()
    //     .nullable()
    //     .test(
    //         'fileSize',
    //         'File size must be less than 2 megabytes',
    //         (value) => {
    //             return !value || value?.size <= 2000000
    //         },
    //     )
    //     .test(
    //         'fileType',
    //         'File must be .jpeg, .jpg, .png or .webp',
    //         (value) => {
    //             return (
    //                 !value ||
    //                 [
    //                     'image/jpeg',
    //                     'image/jpg',
    //                     'image/png',
    //                     'image/webp',
    //                 ].includes(value?.type)
    //             )
    //         },
    //     ),
    username: string().label('Username').required().min(2).max(16),
    email: string().label('Email').required().email().min(2).max(50),
    name: string().label('Name').nullable().min(2).max(50),
    birthDate: string().label('Birth Date').nullable(),
})

type Props = HTMLAttributes<HTMLDivElement>

const SelfProfileEditCard = forwardRef<HTMLDivElement, Props>(
    ({ className, ...props }, ref) => {
        const navigate = useNavigate()

        const self = useSelfStore((state) => state.self)
        const updateSelf = useSelfStore((state) => state.update)

        // const avatarInputRef = useRef<HTMLInputElement | null>(null)
        // const avatarInputId = 'avatar-upload'

        const {
            register: registerInput,
            handleSubmit,
            getValues,
            setError,
            formState: { errors },
            reset,
        } = useForm({
            resolver: yupResolver(schema),
        })

        const handleUpdate = async () => {
            try {
                if (self === null) return

                const { /*avatar, */ name, birthDate, username, email } =
                    getValues()

                const isNameChanged = self.name !== name
                const isBirthDateChanged = self.birthDate !== birthDate
                const isEmailChanged = self.email !== email
                const isUsernameChanged = self.username !== username

                if (isNameChanged || isBirthDateChanged || isUsernameChanged) {
                    const { message } = await updateSelf({
                        name: name as string | null,
                        birthDate: birthDate as string | null,
                        username,
                    })
                    toast({ message, type: 'success' })
                }

                if (isEmailChanged) {
                    toast({
                        message:
                            'Your new email address will not be updated until you verify it.',
                        type: 'warning',
                    })
                    navigate(`/otps/verify?action=update-self-email`, {
                        replace: true,
                        state: { form: { email } },
                    })
                }
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

        useEffect(() => {
            if (self === null) return
            reset({
                name: self.name ? self.name : null,
                username: self.username,
                birthDate: self.birthDate
                    ? moment(self.birthDate).format('YYYY-MM-DD')
                    : null,
                email: self.email,
            })
        }, [self, reset])

        return (
            <CCard
                ref={ref}
                className={classNames('space-y-4 px-6 py-4', className)}
                {...props}
            >
                <header>
                    <h3 className="text-primary text-2xl font-semibold">
                        Profile
                    </h3>
                </header>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(handleUpdate)}
                >
                    <div className="grid grid-cols-1 items-center gap-x-4 lg:grid-cols-[auto_1fr] lg:items-start">
                        <div className="relative flex flex-col items-center justify-center">
                            <div className="relative">
                                {self && (
                                    <UserAvatarImage
                                        className="size-50! md:size-40!"
                                        user={self}
                                    />
                                )}
                                {/* <label
                                    htmlFor={avatarInputId}
                                    className="absolute right-0 bottom-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-black bg-white p-1 shadow-sm md:-translate-x-1/4 md:-translate-y-1/4"
                                >
                                    <CIcon
                                        icon="lucide:upload"
                                        className="text-2xl text-black md:text-xl"
                                    />
                                </label> */}
                            </div>
                            {/* {errors.avatar && (
                                <CAlert
                                    message={errors.avatar.message!}
                                    type="error"
                                />
                            )}
                            <input
                                id={avatarInputId}
                                hidden
                                className="hidden"
                                type="file"
                                {...registerInput('avatar')}
                                ref={avatarInputRef}
                            /> */}
                        </div>

                        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="space-y-1">
                                <CInputIconedLabeled
                                    label="Username"
                                    inputProps={{
                                        ...registerInput('username'),
                                    }}
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
                                    label="Name"
                                    inputProps={{
                                        ...registerInput('name'),
                                    }}
                                />
                                {errors.name && (
                                    <CAlert
                                        message={errors.name.message!}
                                        type="error"
                                    />
                                )}
                            </div>
                            <div className="space-y-1">
                                <CInputIconedLabeled
                                    label="Email"
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
                            <div className="space-y-1">
                                <CInputIconedLabeled
                                    label="Birth Date"
                                    inputProps={{
                                        type: 'date',
                                        ...registerInput('birthDate'),
                                    }}
                                />
                                {errors.birthDate && (
                                    <CAlert
                                        message={errors.birthDate.message!}
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

SelfProfileEditCard.displayName = 'SelfProfileEditCard'

export default SelfProfileEditCard
