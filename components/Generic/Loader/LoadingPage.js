import Head from "next/head";
import Loader from ".";

const LoadingPage = () => {
  return (
    <div>
      <Head>
        <title>Loading...</title>
      </Head>
      <div>
        <Loader type={2} />
      </div>
    </div>
  );
};

export default LoadingPage;
