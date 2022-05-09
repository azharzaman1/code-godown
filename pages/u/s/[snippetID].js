import { useRouter } from "next/router";

const Snippet = () => {
  const router = useRouter();
  return <h1>Snippet: {router.query.snippetID}</h1>;
};

export default Snippet;
