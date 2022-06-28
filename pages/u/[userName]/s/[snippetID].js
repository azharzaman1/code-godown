import Layout from "../../../../components/Generic/Layout";
import SnippetDisplay from "../../../../components/Dashboard/SnippetDisplay/SnippetDisplay";

const Snippet = () => {
  return <SnippetDisplay />;
};

Snippet.getLayout = (page) => (
  <Layout title="Code Godown" tranparentHeader={false} themeSwitch={true}>
    {page}
  </Layout>
);

export default Snippet;
