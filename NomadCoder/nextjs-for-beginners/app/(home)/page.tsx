// import { useState } from "react";\

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_langage: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: string;
  vote_count: string;
};

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

export const metadata = {
  title: "Home",
};

const getMovies = async (): Promise<Movie[]> => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return fetch(URL).then((res) => res.json());
};

const App = async () => {
  const movies = await getMovies();
  return <div>{JSON.stringify(movies)}</div>;
};

export default App;
