import Head from "next/head";
import Loader from ".";

const LoadingPage = () => {
  return (
    <div>
      <Head>
        <title>Loading...</title>
      </Head>
      <div>
        <Loader />
      </div>
    </div>
  );
};

export default LoadingPage;
