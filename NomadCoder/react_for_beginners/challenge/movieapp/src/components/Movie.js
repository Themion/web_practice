import { PropTypes } from "prop-types"
import { Link } from 'react-router-dom';

function Movie({ id, src, title, summary, genres }) {
    if (genres === undefined) genres = []

    return (
        <div>
            <img src={src} alt={title} />
            <Link to={`/movie/${id}`}><h2>{title}</h2></Link>
            <p>{summary}</p>
            <ul>
                {genres.map(genre => <li key={genre}>{genre}</li>)}
            </ul>
        </div>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string)
}

export default Movie
