import { toast as _toast } from 'react-toastify'
import CToast from '@/shared/components/CToast'

export const toast = ({
    message,
    type,
}: {
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
}) => {
    _toast(<CToast message={message} type={type} />)
}
