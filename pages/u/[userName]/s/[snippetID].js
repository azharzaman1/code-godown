import { useRouter } from "next/router";

const Snippet = () => {
  const router = useRouter();
  console.log(router);

  return <h1>Snippet: {router.query.snippetID}</h1>;
};

export default Snippet;
