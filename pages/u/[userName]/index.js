import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import Layout from "../../../components/Generic/Layout";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";

const User = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // react-query user fetch by username
  const {
    data: user,
    isLoading: loadingUser,
    isError: errorLoadingUser,
    error,
    refetch: fetchUser,
  } = useQuery(
    ["fetch-user-by-id", router.query.userName],
    async () => {
      return await axiosPrivate.get(`/api/v1/users/u/${router.query.userName}`);
    },
    {
      // enabled: false,
      onSuccess: (res) => {
        console.log("User fetch response by @userName", res);
      },
      onError: (err) => {
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  if (loadingUser) {
    return <div>Loading ...</div>;
  }

  if (errorLoadingUser) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Head>
        <title>{router.query.userName} | Code Godown</title>
      </Head>
      <div>
        <h1>{user.data.foundUser[0].fullName}</h1>
        <h1>
          <i>@{user.data.foundUser[0].username}</i>
        </h1>
        <h3>{user.data.foundUser[0].email}</h3>
      </div>
    </div>
  );
};

User.getLayout = (page) => <Layout themeSwitch={false}>{page}</Layout>;

export default User;
