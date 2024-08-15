import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

type Props = {
  params: { id: string };
  searchParams: Record<string, string>;
};

const MovieDetail = ({ params }: Props) => {
  return (
    <>
      <Suspense fallback={<h1>Loading movie info...</h1>}>
        <MovieInfo id={params.id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos...</h1>}>
        <MovieVideos id={params.id} />
      </Suspense>
    </>
  );
};

export default MovieDetail;
