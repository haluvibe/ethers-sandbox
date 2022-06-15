import { NextPageContext } from "next";
import { ErrorMessage } from "../presentational/modules/ErrorMessage";

const Error = ({ statusCode }) => {
  return (
    <ErrorMessage errorMessage={statusCode
      ? `An error ${statusCode} occurred on server`
      : "An error occurred on client"}/>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
