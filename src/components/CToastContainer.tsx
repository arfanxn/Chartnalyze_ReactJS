import { ToastContainer, ToastContainerProps } from 'react-toastify'

type Props = ToastContainerProps

const CToastContainer = (props: Props) => (
    <ToastContainer
        {...props}
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        className="md:right-6!"
    />
)

export default CToastContainer
