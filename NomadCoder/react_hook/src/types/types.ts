import { AxiosError, AxiosResponse } from "axios"

export type Content = {
    tab: string
    content: string
}

export type OnMouseEvent = (event: MouseEvent) => void

export type AxiosState = {
    loading: boolean,
    error: AxiosError | null,
    data: AxiosResponse | null
}
