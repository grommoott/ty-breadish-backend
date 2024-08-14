function pgFormat(value: any) {
    if (typeof value !== "string") {
        return value?.toString()
    }

    return value.replaceAll("'", "''")
}

export { pgFormat }
