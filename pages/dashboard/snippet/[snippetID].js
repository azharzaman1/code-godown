import { useRouter } from "next/router";
import DashboardLayout from "../../../components/Dashboard/Layout";

const Snippet = () => {
  const router = useRouter();
  console.log(router);
  return <div>Snippet: {router.query.snippetID}</div>;
};

Snippet.getLayout = (page) => (
  <DashboardLayout
    title="Add Snippet | Dashboard"
    className={`min-w-full bg-slate-900`}
  >
    {page}
  </DashboardLayout>
);

export default Snippet;
