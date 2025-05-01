import React, { ReactNode } from 'react'

export type ClassNameProps = {
    className?: string
}

export type OnClickProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type ChildrenProps = {
    children: ReactNode
}
