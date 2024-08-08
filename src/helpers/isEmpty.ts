export default function isEmpty(obj: object): boolean {
    let fields = 0

    for (const _ in obj) {
        fields++
    }

    return fields == 0
}
