export const uppercaseFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const snakeCaseToTitleCase = (str: string): string => {
    return str
        .split('_')
        .map((word) => uppercaseFirst(word))
        .join(' ')
}
