import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { GitHub, Google } from "@mui/icons-material";
import Container from "../../Generic/Layout/Container";
import Heading from "../../Generic/Heading";
import Button from "../../Generic/Button";
import { useSnackbar } from "notistack";
import Text from "../../Generic/Text";

const AuthLayout = ({
  children,
  className,
  title,
  description,
  descriptionName,
  icon,
}) => {
  const router = useRouter();
  const isLoginPage = router.asPath === "/auth/login";

  const handleAuthWithGH = () => {};
  const handleAuthWithGoogle = () => {};

  return (
    <div className={`${className} auth-container min-h-screen`}>
      <Head>
        <title>{title || "Authentication | Code Godown"}</title>
        <meta
          name={descriptionName || "descritpion"}
          content={
            description || "Code management applicatoin created with NextJs"
          }
        />
        <link rel="icon" href={icon || "/favicon.ico"} />
      </Head>
      <main>
        <Container className="flex justify-center pt-4 min-h-screen">
          <div className="flex flex-col justify-center items-center w-[450px] max-w-[100vw] mx-auto">
            <div className="form__header">
              <Heading type="secondary" className="mb-4">
                {isLoginPage ? "Welcome back" : "Register an account"}
              </Heading>
            </div>

            <div className="py-8 px-6 w-full bg-white shadow rounded-lg border select-none">
              {/* <div className="providersAuth-section flex-evenly-center mb-6">
                <Button type="special-icon" onClick={handleAuthWithGH}>
                  <GitHub fontSize="medium" className="icon" />
                </Button>
                <Button type="special-icon" onClick={handleAuthWithGoogle}>
                  <Google fontSize="medium" className="icon" />
                </Button>
              </div>
              <Divider>OR</Divider> */}
              <main>{children}</main>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <Text>
                {isLoginPage
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </Text>
              <span
                className="cursor-pointer font-medium text-primaryText hover:text-primary flex items-center transition-colors duration-150"
                onClick={() => {
                  router.push({
                    pathname: `${
                      isLoginPage ? "/auth/register" : "/auth/login"
                    }`,
                  });
                }}
              >
                {isLoginPage ? "Signup" : "Login"}
              </span>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default AuthLayout;

/*
  const continueWithGoogle = () => {
    setGoogleAuthInProgress(true);
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        let userAlreadyRegistered = false;
        const docRef = doc(db, "users", result?.user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // user already present in db
          userAlreadyRegistered = true;
          enqueueSnackbar(`Login Successful`, {
            variant: "success",
          });
          setGoogleAuthInProgress(false);
        }
        if (result && !userAlreadyRegistered) {
          // potentially new user
          const user = result?.user;
          const token =
            GoogleAuthProvider.credentialFromResult(result).accessToken;
          // Setting to db
          const docRef = doc(db, "users", user.uid);
          await setDoc(docRef, {
            userDetails: {
              userID: user.uid,
              fullName: "",
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              password: "",
              emailVerified: user.emailVerified,
              registeredAt: serverTimestamp(),
              accountType: "google_provider",
              accessToken: token,
              registerPhase2Completed: false,
            },
            snippets: [],
          });

          setGoogleAuthInProgress(false);
          enqueueSnackbar(`Login Successful`, {
            variant: "success",
          });
          router.replace("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setGoogleAuthInProgress(false);
        enqueueSnackbar(`Error Code: ${errorCode}: ${errorMessage}`, {
          variant: "error",
        });
      });
  };

  const continueWithGH = () => {
    setGhAuthInProgress(true);
    signInWithPopup(auth, githubAuthProvider)
      .then(async (result) => {
        let userAlreadyRegistered = false;
        const docRef = doc(db, "users", result?.user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // user already present in db
          setGhAuthInProgress(false);
          userAlreadyRegistered = true;
        }
        if (result && !userAlreadyRegistered) {
          const user = result?.user;
          const token =
            GithubAuthProvider.credentialFromResult(result).accessToken;
          // Setting to db
          const docRef = doc(db, "users", user.uid);

          await setDoc(docRef, {
            userDetails: {
              userID: user.uid,
              fullName: "",
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              password: "",
              emailVerified: user.emailVerified,
              registeredAt: serverTimestamp(),
              accountType: "github_provider",
              accessToken: token,
              registerPhase2Completed: false,
            },
            snippets: [],
          });
        }
        setGhAuthInProgress(false);
        enqueueSnackbar(`Login Successful`, {
          variant: "success",
        });
        router.replace("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setGhAuthInProgress(false);
        enqueueSnackbar(`Error Code: ${errorCode}: ${errorMessage}`, {
          variant: "error",
        });
      });
  };
*/
