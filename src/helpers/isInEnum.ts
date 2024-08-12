function isInEnum(enumObject: any, value: string): boolean {
    for (const val of enumObject) {
        if (val === value) {
            return true
        }
    }

    return false
}

export { isInEnum }
