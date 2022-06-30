type Last = <T>(arr: T[]) => T
type Prepend = <T>(arr: T[], item: T) => T[]

const last: Last = (arr) => arr[arr.length - 1]
const prepend: Prepend = (arr, item) => {
    arr = [item, ...arr]
    return arr
}
