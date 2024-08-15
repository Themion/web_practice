"use client";

type ErrorProps = {
  error: Error;
  reset: Function;
};

const ErrorComponent = (props: ErrorProps) => {
  console.log(props);
  return <h1>Something Broke!</h1>;
};

export default ErrorComponent;
