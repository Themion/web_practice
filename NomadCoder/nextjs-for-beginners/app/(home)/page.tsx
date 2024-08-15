// import { useState } from "react";

import Link from "next/link";
import { API_URL } from "../../constants";
import { Movie } from "../../types";

export const metadata = {
  title: "Home",
};

const getMovies = async (): Promise<Movie[]> => {
  return fetch(API_URL).then((res) => res.json());
};

const App = async () => {
  const movies = await getMovies();
  return (
    <div>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/movies/${id}`}>{title}</Link>
        </li>
      ))}
    </div>
  );
};

export default App;
