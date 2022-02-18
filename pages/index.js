import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_THEME } from "../redux/slices/appSlice";
import { useTheme } from "next-themes";

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
