import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import MovieDetail from "../components/MovieDetail"

const API_URL = "https://yts.mx/api/v2/movie_details.json?movie_id="

function Detail() {
    const params = useParams()

    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        const setContent = async () => {
            const json = await (await fetch(API_URL + params.id)).json()
            setMovie(json.data.movie)
            setLoading(false)
        }
        setContent()
    }, [])

    return (
        loading ? <h1>LOADING...</h1> : <MovieDetail {...movie}/>
    )
}

export default Detail
