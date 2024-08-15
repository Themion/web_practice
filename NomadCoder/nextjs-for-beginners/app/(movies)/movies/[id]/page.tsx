import { API_URL } from "../../../../constants";
import { Movie, Video } from "../../../../types";

type Props = {
  params: { id: string };
  searchParams: Record<string, string>;
};

const getMovie = async (id: string): Promise<Movie> => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

const getVideos = async (id: string): Promise<Video[]> => {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
};

const MovieDetail = async ({ params }: Props) => {
  // const movie = await getMovie(params.id);
  // const videos = await getVideos(params.id);

  const [movie, videos] = await Promise.all([
    getMovie(params.id),
    getVideos(params.id),
  ]);

  console.log(videos);

  const trailer = videos
    .filter(({ site, official }) => site === "YouTube" && official)
    .map(({ key }) => (
      <iframe
        key={key}
        width="951"
        height="535"
        src={`https://www.youtube.com/embed/${key}`}
        title="2 4 Parallel Requests"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    ));

  return (
    <>
      <h1>{movie.title}</h1>
      {trailer}
    </>
  );
};

export default MovieDetail;
