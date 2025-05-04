import type { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'
import axios from 'axios'
import decamelizeKeys from 'decamelize-keys'
import camelcaseKeys from 'camelcase-keys'
import { useNavigate } from 'react-router'

const baseURL = import.meta.env.VITE__API_URL

const axiosInstance: AxiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    (config) => {
        config.baseURL = baseURL
        config.headers.setContentType('multipart/form-data')
        config.headers.setAuthorization(`Bearer ${Cookies.get('access_token')}`)

        config.data = decamelizeKeys(config.data, { deep: true })

        return config
    },
    (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
    (response) => {
        response.data = camelcaseKeys(response.data, { deep: true })
        return response
    },
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                error.response.data = camelcaseKeys(error.response.data, {
                    deep: true,
                })

                if (error.response?.status === 401) {
                    const navigate = useNavigate()
                    navigate('/login', { replace: true })
                }
            }
        }
        return Promise.reject(error)
    },
)

export default axiosInstance
