import { useEffect, useRef } from 'react'

export const useEffectOnce = (effect: () => void | (() => void)) => {
    const hasRun = useRef<boolean>(false)

    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true
            return effect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array ensures it runs once
}
