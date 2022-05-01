import Hero from "../components/Hero";
import Layout from "../components/Generic/Layout";

export default function Home() {
  return <Hero />;
}

Home.getLayout = (page) => (
  <Layout title="Code Godown" tranparentHeader={true} themeSwitch={false}>
    {page}
  </Layout>
);
