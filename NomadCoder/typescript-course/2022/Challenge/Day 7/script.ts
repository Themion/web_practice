interface SStorage<T> {
    [key: string]: T
}

interface LocalStorageAPI<T> {
    stroage: SStorage<T>
    set: (key: string, value: T)=> void
    get: (key: string) => T
    clearKey: (key: string) => void
    clear: () => void
}



type SuccessFn = PositionCallback
type ErrorFn = PositionErrorCallback | null | undefined
type OptionsObj = PositionOptions | undefined

interface GeolocationAPI {
    geolocation: Geolocation
    getCurrentPosition: (successFn: SuccessFn, errorFn?: ErrorFn, optionsObj?: OptionsObj) => void
    watchPosition: (success: SuccessFn, error?: ErrorFn, options?: OptionsObj) => void
    clearWatch: (id: number) => void
}
