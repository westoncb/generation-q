/**
 * Checks if process NODE_ENV in 'development' mode
 */
export function inDev(): boolean {
    return process.env.NODE_ENV == "development"
}

export const reorder = <T>(
    list: T[],
    startIndex: number,
    endIndex: number
): T[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}
