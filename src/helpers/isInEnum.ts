function isInEnum(enumObject: any, value: any): boolean {
    for (const val of Object.values(enumObject)) {
        if (val == value) {
            return true
        }
    }

    return false
}

export { isInEnum }
