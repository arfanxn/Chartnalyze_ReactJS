import { useState } from 'react'

type UseBoolReturns = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    () => void,
]

export const useBool = (): UseBoolReturns => {
    const [value, setValue] = useState(false)
    const toggleValue = () => setValue((prev) => !prev)
    return [value, setValue, toggleValue]
}
