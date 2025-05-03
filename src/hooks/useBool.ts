import { useState } from 'react'

export const useBool = () => {
    const [value, setValue] = useState(false)
    const toggleValue = () => setValue((prev) => !prev)
    return [value, setValue, toggleValue]
}
