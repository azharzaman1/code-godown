import { useEffect } from "react";
import Hero from "../components/Hero";
import Layout from "../components/Generic/Layout";

export default function Home() {
  // making lil request to server, to awake its before actually needed [heroku free tier limitation]
  useEffect(() => {
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://codegodown-server.herokuapp.com/"
        : "http://localhost:3500/"
    );
  }, []);

  return (
    <div className="page home-page">
      <Hero />
    </div>
  );
}

Home.getLayout = (page) => (
  <Layout title="Code Godown" tranparentHeader={true} themeSwitch={false}>
    {page}
  </Layout>
);
