import { ChildrenProps } from '@/types/componentTypes'
import React, { Suspense } from 'react'

type Props = ChildrenProps & {
    fallback?: React.ReactNode // The fallback content, like a loading spinner
}

const CSuspense: React.FC<Props> = ({
    children,
    fallback = <div>Loading...</div>,
}) => {
    return <Suspense fallback={fallback}>{children}</Suspense>
}

export default CSuspense
