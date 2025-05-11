import { useEffect, useRef } from 'react'

/**
 * Custom hook that runs the provided effect only once when the component is mounted.
 *
 * @param effect - A function containing the effect to run on mount. It can return a cleanup function.
 */

export const useEffectMounted = (effect: () => void | (() => void)) => {
    const isMounted = useRef<boolean>(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return effect()
        }
    }, [effect]) // Add `effect` to dependencies array
}
