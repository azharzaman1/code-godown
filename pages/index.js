import { useEffect } from "react";
import { useTheme } from "next-themes";
import Hero from "../components/Hero";
import Layout from "../components/Generic/Layout";

export default function Home() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <Layout
      title="Code Godown"
      className="w-full"
      tranparentHeader={true}
      themeSwitch={false}
    >
      <Hero />
    </Layout>
  );
}
