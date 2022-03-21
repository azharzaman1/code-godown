import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Generic/Layout";
import Container from "../../components/Generic/Layout/Container";
import Divider from "@mui/material/Divider";
import { GitHub, Google } from "@mui/icons-material";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "@firebase/auth";
import {
  auth,
  db,
  githubAuthProvider,
  googleAuthProvider,
} from "../../firebase";
import { doc, serverTimestamp, setDoc, getDoc } from "@firebase/firestore";
import { regexCodes } from "../../files/utils";
import { useSnackbar } from "notistack";
import { useTheme } from "next-themes";
import Button from "../../components/Generic/Button";
import Heading from "../../components/Generic/Heading";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./register";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/slices/userSlice";
import { axiosPrivate } from "../../api/axios";
import Text from "../../components/Generic/Text";
import { useLocalStorage } from "react-use";

const Login = () => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [passwordShow, setPasswordShow] = useState(false);
  const [resetingPassword, setResetingPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [sendingPasswordResetEmail, setSendingPasswordResetEmail] =
    useState(false);
  const [ghAuthInProgress, setGhAuthInProgress] = useState(false);
  const [googleAuthInProgress, setGoogleAuthInProgress] = useState(false);
  const [remember, setRemember, remove] = useLocalStorage(
    "cg-remember-device",
    false
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUnregister: true });

  const { mutate: login } = useMutation(
    async (loginData) => {
      return await axiosPrivate.post("/auth/login", loginData, {
        withCredentials: true,
      });
    },
    {
      onSuccess: (res) => {
        console.log("User Login Response", res);
        // stop loading
        setSigningIn(false);
        // push to redux store
        dispatch(SET_USER(res.data.user));
        // reset form
        reset();
        // notify
        enqueueSnackbar(res.statusText, {
          variant: "success",
        });
        // push to home
        if (res.status === 200 || res.status === 201 || res.status === 202)
          router.replace("/");
      },
      onError: (err) => {
        setSigningIn(false);
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const onSubmit = async (data) => {
    setSigningIn(true);
    const { email, password } = data;

    login({ email: email, pswd: password });
  };

  const rememberChoiceHandler = (e) => {
    setRemember(e.target.checked);
  };

  const passwordResetRequest = (e) => {
    e.preventDefault();
    setSendingPasswordResetEmail(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent
        setResetEmailSent(true);
        setSendingPasswordResetEmail(false);
        enqueueSnackbar(
          `Password reset email sent! Please follow instructions in the email`,
          {
            variant: "info",
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSendingPasswordResetEmail(false);
        enqueueSnackbar(`Error Code: ${errorCode}: ${errorMessage}`, {
          variant: "error",
        });
      });
  };

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

  const formLabel =
    resetingPassword && resetEmailSent
      ? "Return to Login"
      : resetingPassword
      ? "Send Reset Email"
      : "Login";

  const formAction =
    resetingPassword && resetEmailSent
      ? (e) => {
          e.preventDefault();
          setResetEmailSent(false);
          setResetingPassword(false);
        }
      : resetingPassword
      ? passwordResetRequest
      : handleSubmit(onSubmit);

  return (
    <Container className="flex justify-center items-center min-h-screen pt-10">
      <div className="flex flex-col justify-center items-center w-[450px] max-w-[100vw] mx-auto">
        <div className="form__header">
          <Heading type="secondary" className="mb-4">
            Welcome back
          </Heading>
        </div>

        <div className="py-8 px-6 w-full bg-white shadow rounded-lg border select-none">
          {!resetingPassword && (
            <>
              <div className="providersAuth-section flex-evenly-center mb-6">
                <Button
                  type="special-icon"
                  loading={ghAuthInProgress}
                  onClick={continueWithGH}
                >
                  <GitHub fontSize="medium" className="icon" />
                </Button>
                <Button
                  type="special-icon"
                  loading={googleAuthInProgress}
                  onClick={continueWithGoogle}
                >
                  <Google fontSize="medium" className="icon" />
                </Button>
              </div>
              <Divider>OR</Divider>
            </>
          )}

          <div className="mt-3 mb-2">
            <Heading type="tertiary" className="text-center">
              Login with email
            </Heading>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <input
                type="email"
                defaultValue=""
                placeholder="Email address"
                className={`input`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required for login",
                  },
                  pattern: {
                    value: regexCodes.email,
                    message: "Email is not valid!",
                  },
                })}
              />
              {errors?.email && (
                <ErrorMessage message={errors?.email.message} />
              )}
            </div>

            {!resetingPassword && (
              <>
                <div className="flex flex-col">
                  <div
                    className={`relative flex items-between items-center rounded-md border-2 my-3 space-x-2`}
                  >
                    <input
                      type={passwordShow ? "text" : "password"}
                      placeholder="Your password"
                      className="outline-none border-none text-gray-500 placeholder-gray-300 px-3 py-3 flex-1"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required for login",
                        },
                        // pattern: {
                        //   value: regexCodes.password,
                        //   message: "Password is not valid!",
                        // },
                      })}
                    />

                    <span
                      onClick={() => setPasswordShow((prevState) => !prevState)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer pr-2"
                    >
                      {passwordShow ? (
                        <EyeOffIcon className="h-6 icon" />
                      ) : (
                        <EyeIcon className="h-6 icon" />
                      )}
                    </span>
                  </div>
                  {errors?.password && (
                    <ErrorMessage message={errors?.password.message} />
                  )}
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember-device-checkbox"
                      type="checkbox"
                      value={remember}
                      onChange={rememberChoiceHandler}
                    />
                    <Text component="label" htmlFor="remember-device-checkbox">
                      Remember me
                    </Text>
                  </div>
                </div>

                <div className="flex justify-end mb-3">
                  <span
                    className="link"
                    onClick={() => {
                      setResetingPassword(true);
                    }}
                  >
                    Forgot password? Reset
                  </span>
                </div>
              </>
            )}
            <input type="submit" className="hidden" />
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                className="w-full justify-center"
                loading={signingIn || sendingPasswordResetEmail}
                onClick={formAction}
              >
                {formLabel}
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <span>Don't have an account?</span>
          <span
            className="cursor-pointer font-medium text-primaryText hover:text-primary flex items-center transition-colors duration-150"
            onClick={() => {
              router.push({
                pathname: "/auth/register",
              });
            }}
          >
            Signup
          </span>
        </div>
      </div>
    </Container>
  );
};

Login.getLayout = (page) => (
  <Layout
    title="Login | Authentication"
    hideHeader
    hideFooter
    className={`min-w-full`}
  >
    {page}
  </Layout>
);

export default Login;
