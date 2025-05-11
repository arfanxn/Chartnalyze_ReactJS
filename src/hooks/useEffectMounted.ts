import { useEffect, useRef } from 'react'

export const useEffectMounted = (effect: () => void | (() => void)) => {
    const isMounted = useRef<boolean>(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return effect()
        }
    }, [effect]) // Add `effect` to dependencies array
}
