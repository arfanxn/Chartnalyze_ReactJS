import { Suspense, ReactNode } from 'react'

type Props = {
    children: ReactNode
    fallback?: ReactNode
}

const CSuspense = ({
    children,
    fallback = <div>Loading...</div>,
}: Props) => <Suspense fallback={fallback}>{children}</Suspense>

export default CSuspense
