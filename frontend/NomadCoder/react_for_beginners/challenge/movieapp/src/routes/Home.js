import { useState, useEffect } from "react"
import Movie from "../components/Movie"

const API_URL = "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"

function Home() {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState({})

    useEffect(async () => {
        const json = await (await fetch(API_URL)).json()
        setMovies(json.data.movies)
        setLoading(false)
    }, [])

    return (
        loading ? <h1>LOADING...</h1> : <div>{movies.map(movie =>
            <Movie
                key={movie.id}
                id={movie.id}
                src={movie.medium_cover_image}
                title={movie.title_long}
                summary={movie.summary}
                genres={movie.genres} />
        )}</div>
    )
}

export default Home
