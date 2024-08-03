type Props = {
  params: { id: string };
  searchParams: Record<string, string>;
};

const MovieDetail = ({ params, searchParams }: Props) => {
  console.log({ ...params, ...searchParams });
  return <h1>Movie</h1>;
};

export default MovieDetail;
