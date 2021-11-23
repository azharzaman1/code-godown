import Hero from "../components/Hero";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Code Godown" className="w-full" tranparentHeader={true}>
      <main className="w-full">
        <Hero />
      </main>
    </Layout>
  );
}
