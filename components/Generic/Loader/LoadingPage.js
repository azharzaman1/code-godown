import Head from "next/head";
import LoaderModal from "./LoaderModal";

const LoadingPage = () => {
  return (
    <div>
      <Head>
        <title>Loading...</title>
      </Head>
      <div>
        <LoaderModal
          type={2}
          loading={true}
          solidBG
          label="loading, please wait..."
        />
      </div>
    </div>
  );
};

export default LoadingPage;
