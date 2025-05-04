import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useCountdown = (
    initialTime: number = 60,
    onFinish?: () => void,
) => {
    const [countdown, setCountdown] = useState(initialTime)
    const [isCountdowning, setIsCountdowning] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    const startCountdown = useCallback(() => {
        setIsCountdowning(true)
        setCountdown((current) => (current > 0 ? current : initialTime))
    }, [initialTime])

    const stopCountdown = useCallback(() => {
        setIsCountdowning(false)
        clearTimer()
    }, [])

    const resetCountdown = useCallback(() => {
        setCountdown(initialTime)
        setIsCountdowning(false)
    }, [initialTime])

    useEffect(() => {
        if (isCountdowning && countdown > 0) {
            timerRef.current = setTimeout(() => {
                setCountdown((prev) => prev - 1)
            }, 1000)
        }

        return () => clearTimer()
    }, [isCountdowning, countdown])

    useEffect(() => {
        if (countdown === 0 && isCountdowning) {
            stopCountdown()
            onFinish?.()
        }
    }, [countdown, isCountdowning, onFinish, stopCountdown])

    useEffect(() => {
        return () => clearTimer()
    }, [])

    return useMemo(
        () => ({
            countdown,
            isCountdowning,
            startCountdown,
            stopCountdown,
            resetCountdown,
        }),
        [
            countdown,
            isCountdowning,
            startCountdown,
            stopCountdown,
            resetCountdown,
        ],
    )
}
