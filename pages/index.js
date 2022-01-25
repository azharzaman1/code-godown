import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_THEME } from "../redux/slices/appSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SET_THEME("light"));
  }, []);

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
