import { PropTypes } from "prop-types"
import { Link } from 'react-router-dom';

function MovieDetail({ id, medium_cover_image, title, description_full, genres }) {
    if (genres === undefined) genres = []

    return (
        <div>
            <img src={medium_cover_image} alt={title} />
            <Link to={`/web_practice/movie/${id}`}><h2>{title}</h2></Link>
            <p>{description_full}</p>
            <ul>
                {genres.map(genre => <li key={genre}>{genre}</li>)}
            </ul>
        </div>
    )
}

MovieDetail.propTypes = {
    id: PropTypes.number.isRequired,
    medium_cover_image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description_full: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string)
}

export default MovieDetail
