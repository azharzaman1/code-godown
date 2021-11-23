import Hero from "../components/Hero";
import Layout from "../components/Layout";

export default function Home({ navigation }) {
  return (
    <Layout
      title="Code Godown"
      className="w-full"
      navigation={navigation}
      tranparentHeader={true}
    >
      <main className="w-full">
        <Hero />
      </main>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const navigation = await (
    await fetch("http://localhost:3000/api/navigation")
  ).json();

  return {
    props: { navigation },
  };
}
