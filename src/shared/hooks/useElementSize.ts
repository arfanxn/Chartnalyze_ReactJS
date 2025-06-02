// hooks/useElementSize.ts
import { RefObject, useEffect, useState } from 'react'

type ElementSize = {
    width: number
    height: number
}

const useElementSize = <T extends HTMLElement>(
    elementRef: RefObject<T | null>, // Allow null in generic type
): ElementSize => {
    const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

    useEffect(() => {
        if (!elementRef.current) return

        const updateSize = () => {
            if (elementRef.current) {
                setSize({
                    width: elementRef.current.offsetWidth,
                    height: elementRef.current.offsetHeight,
                })
            }
        }

        updateSize()
        const resizeObserver = new ResizeObserver(updateSize)
        resizeObserver.observe(elementRef.current)

        return () => resizeObserver.disconnect()
    }, [elementRef])

    return size
}

export default useElementSize
