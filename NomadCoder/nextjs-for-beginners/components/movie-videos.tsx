import { API_URL } from "../constants";
import { Video } from "../types";

type Props = {
  id: string;
};

const getVideos = async (id: string): Promise<Video[]> => {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
};

const MovieVideos = async ({ id }: Props) => {
  const videos = await getVideos(id);
  return <h6>{JSON.stringify(videos)}</h6>;
};

export default MovieVideos;
