import { useEffect } from "react";
import Hero from "../components/Hero";
import Layout from "../components/Generic/Layout";

export default function Home() {
  // making lil request to server, to awake it before actually needed [heroku free tier limitation]
  useEffect(() => {
    fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3500/"
        : "https://codegodown-server.herokuapp.com/"
    );
  }, [false]); // passing false to limit to just first render call

  return <Hero />;
}

Home.getLayout = (page) => (
  <Layout title="Code Godown" tranparentHeader={true} themeSwitch={false}>
    {page}
  </Layout>
);
