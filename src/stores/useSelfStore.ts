import { User } from '@/types/userTypes'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import * as userService from '@/services/userService'
import {
    LoginForm,
    OtpCodeForm,
    RegisterForm,
    UpdateSelfEmailForm,
    UpdateSelfForm,
} from '@/types/formTypes'
import { useLoadingsStore } from './useLoadingsStore'

/**
 * useSelfStore is a Zustand store that manages the state of the current user.
 * It provides the `self` state and a method `setSelf` to update the user.
 */
export const useSelfStore = create(
    combine({ self: null as User | null }, (set) => {
        /**
         * showSelf is an asynchronous function that retrieves the current user
         * data from the user service and updates the store with the user's
         * information. If an error occurs during the retrieval process, it sets
         * the `self` state to null and rethrows the error.
         */
        const load = async () => {
            try {
                useLoadingsStore.getState().startLoading('self')
                const { user } = await userService.showSelf()
                set({ self: user })
            } catch (e) {
                set({ self: null })
                throw e
            } finally {
                useLoadingsStore.getState().stopLoading('self')
            }
        }

        load()

        return {
            /**
             * login is a method that logs in a user, and then updates the store
             * with the logged in user.
             *
             * @param form - The form data of the user to log in.
             * @returns A promise that resolves with an object containing a message.
             */
            login: async (form: LoginForm): Promise<{ message: string }> => {
                const { message } = await userService.login(form)
                const { user } = await userService.showSelf()
                set({ self: user })
                return { message }
            },
            /**
             * onboard is an asynchronous function that registers and logs in a new user.
             * It first registers the user using the provided form data, then logs in the user
             * with the registered username and password, and finally updates the store with
             * the newly registered user's information.
             *
             * @param form - The registration form data of the new user.
             * @returns A promise that resolves with an object containing a message.
             */
            onboard: async (
                form: RegisterForm,
            ): Promise<{ message: string }> => {
                const { message } = await userService.register(form)
                await userService.login({
                    identifier: form.username,
                    password: form.password,
                })
                const { user } = await userService.showSelf()
                set({ self: user })
                return { message }
            },
            /**
             *  see the `load` function
             */
            load,
            /**
             * logout is an asynchronous function that logs out the current user.
             * It sends a request to the user service to log out the user, and
             * then updates the store by setting the `self` state to null.
             *
             * @returns A promise that resolves with an object containing a message.
             */
            logout: async (): Promise<{ message: string }> => {
                const { message } = await userService.logout()
                set({ self: null })
                return { message }
            },
            /**
             * verifyEmail is an asynchronous function that verifies a user's email
             * with the given OTP code. If the verification is successful, it updates
             * the store with the user's new information.
             *
             * @param form - The OTP verification form data containing the OTP code.
             * @returns A promise that resolves with an object containing a message.
             */
            verifyEmail: async (
                form: OtpCodeForm,
            ): Promise<{ message: string }> => {
                const { message } = await userService.verifySelfEmail(form)
                const { user } = await userService.showSelf()
                set({ self: user })
                return { message }
            },
            /**
             * update is an asynchronous function that updates the current user's
             * profile information with the provided form data. If the update is
             * successful, it updates the store with the user's new information.
             *
             * @param form - The form data containing the user's updated information.
             * @returns A promise that resolves with an object containing a message.
             */

            update: async (form: UpdateSelfForm) => {
                const { message, user } = await userService.updateSelf(form)
                set({ self: user })
                return { message }
            },
            /**
             * updateEmail is an asynchronous function that updates the current user's
             * email address with the provided form data. If the update is successful,
             * it updates the store with the user's new information.
             *
             * @param form - The form data containing the user's new email address.
             * @returns A promise that resolves with an object containing a message.
             */
            updateEmail: async (form: UpdateSelfEmailForm) => {
                const { message, user } =
                    await userService.updateSelfEmail(form)
                set({ self: { ...user, email: user.email } })
                return { message }
            },
        }
    }),
)

export type SelfStore = ReturnType<typeof useSelfStore.getState>
