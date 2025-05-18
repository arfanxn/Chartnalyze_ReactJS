import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useCountdown = (
    initialDuration: number = 60,
    onFinish?: () => void,
) => {
    const [countdownDuration, setCountdownDuration] = useState(initialDuration)
    const [countdownWillFinishAt, setCountdownWillFinishAt] = useState<
        number | null
    >(null)
    const [countdownFinishedAt, setCountdownFinishedAt] = useState<
        number | null
    >(null)
    const [countdown, setCountdown] = useState(countdownDuration)
    const [isCountdowning, setIsCountdowning] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    const startCountdownFrom = useCallback((from: number) => {
        setIsCountdowning(true)
        setCountdownWillFinishAt(Date.now() + from * 1000)
        setCountdown(from)
    }, [])

    const startCountdown = useCallback(() => {
        setIsCountdowning(true)
        const cd = countdown > 0 ? countdown : countdownDuration
        setCountdownWillFinishAt(Date.now() + cd * 1000)
        setCountdown(cd)
    }, [countdown, countdownDuration])

    const stopCountdown = useCallback(() => {
        setIsCountdowning(false)
        clearTimer()
    }, [])

    const resetCountdown = useCallback(() => {
        setCountdown(countdownDuration)
        setIsCountdowning(false)
    }, [countdownDuration])

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
            setCountdownWillFinishAt(null)
            setCountdownFinishedAt(Date.now())
            onFinish?.()
        }
    }, [countdown, isCountdowning, onFinish, stopCountdown])

    useEffect(() => {
        return () => clearTimer()
    }, [])

    return useMemo(
        () => ({
            countdownDuration,
            countdownWillFinishAt,
            countdownFinishedAt,
            countdown,
            isCountdowning,
            setCountdownDuration,
            startCountdownFrom,
            startCountdown,
            stopCountdown,
            resetCountdown,
        }),
        [
            countdownDuration,
            countdownWillFinishAt,
            countdownFinishedAt,
            countdown,
            isCountdowning,
            setCountdownDuration,
            startCountdownFrom,
            startCountdown,
            stopCountdown,
            resetCountdown,
        ],
    )
}
