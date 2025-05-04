import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import * as userService from '@/services/userService'

const Authenticate: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                await userService.showSelf()
            } catch (error) {
                console.log('authenticating fails')
                console.log(error)
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            navigate('/login')
                        }
                    }
                }
            }
        })()
    }, [navigate])

    return null
}

export default Authenticate
