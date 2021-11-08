import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home({ navigation }) {
  return (
    <div className="w-full">
      <Head>
        <title>Code Godown</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Header navigation={navigation} />
        <Hero />
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  // let navigation;
  // let httpProtocol;

  // if (context.req.headers.host.includes("localhost")) {
  //   httpProtocol = "http";
  // } else {
  //   httpProtocol = "https";
  // }

  // try {
  //   const req = await fetch(
  //     `${httpProtocol}://${context.req.headers.host}/api/fetch`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({ type: "FETCH_PRODUCTS" }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   navigation = await req.json();
  // } catch (error) {
  //   navigation = error;
  // }

  const navigation = await (
    await fetch("http://localhost:3000/api/navigation")
  ).json();

  return {
    props: { navigation },
  };
}
