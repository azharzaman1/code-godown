import { useRouter } from "next/router";

const Snippet = () => {
  const router = useRouter();
  return <div>Snippet: {router.query.snippetID}</div>;
};

export default Snippet;
