import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { AxiosState } from "../types/types"

const useAxios = (opts: AxiosRequestHeaders, axiosClient = axios) => {
    const [state, setState] = useState<AxiosState>({
        loading: true, 
        error: null, 
        data: null
    })
    const [trigger, setTrigger] = useState(0)

    const refetch = () => {
        setState({ ...state, loading: true })
        setTrigger(Date.now())
    }

    const callback = () => {
        if (!opts.url) return
        axiosClient(opts)
            .then((res: AxiosResponse) => {
                setState({
                    ...state,
                    loading: false,
                    data: res
                })
            })
            .catch((err: AxiosError) => {
                setState({
                    ...state,
                    loading: false,
                    error: err
                })
            })
    }
    
    // eslint-disable-next-line
    useEffect(() => { callback() }, [trigger])

    return { ...state, refetch }
}

export default useAxios
