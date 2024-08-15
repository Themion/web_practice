import { API_URL } from "../constants";
import { Movie } from "../types";

type Props = {
  id: string;
};

const getInfo = async (id: string): Promise<Movie> => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

const MovieInfo = async ({ id }: Props) => {
  const movie = await getInfo(id);
  return <h1>{movie.title}</h1>;
};

export default MovieInfo;
