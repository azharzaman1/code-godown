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
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import {
  auth,
  db,
  githubAuthProvider,
  googleAuthProvider,
} from "../../client/firebase";
import { doc, serverTimestamp, setDoc, getDoc } from "@firebase/firestore";
import { validateEmail } from "../../files/utils";
import { useSnackbar } from "notistack";
import { useTheme } from "next-themes";

const Login = () => {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [forgetPasswordState, setForgetPasswordState] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  useEffect(() => {
    setTheme("light");
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const signinWithEmailAndPassword = (e) => {
    // sigin
    e.preventDefault();
    if (validateEmail(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          enqueueSnackbar(`Login Successful`, {
            variant: "success",
          });
          router.replace("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          enqueueSnackbar(`Error Code: ${errorCode}: ${errorMessage}`, {
            variant: "error",
          });
        });
    } else {
      setEmailError(true);
    }
  };

  const passwordResetRequest = (e) => {
    e.preventDefault();
    // password reset request

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent
        setResetEmailSent(true);
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
        enqueueSnackbar(`Error Code: ${errorCode}: ${errorMessage}`, {
          variant: "error",
        });
      });
  };

  const continueWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        let userAlreadyRegistered = false;
        const docRef = doc(db, "users", result?.user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          userAlreadyRegistered = true;
          enqueueSnackbar(`Login Successful`, {
            variant: "success",
          });
          router.replace("/");
        }
        if (result && !userAlreadyRegistered) {
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

          enqueueSnackbar(`Login Successful`, {
            variant: "success",
          });
          router.replace("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        enqueueSnackbar(`Error Code: ${errorCode}: ${errorMessage}`, {
          variant: "error",
        });
      });
  };

  const continueWithGH = () => {
    signInWithPopup(auth, githubAuthProvider)
      .then(async (result) => {
        let userAlreadyRegistered = false;
        const docRef = doc(db, "users", result?.user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          userAlreadyRegistered = true;
        }
        if (result && !userAlreadyRegistered) {
          const user = result?.user;
          const token =
            GithubAuthProvider.credentialFromResult(result).accessToken;
          // Setting to db
          const docRef = doc(db, "users", user.uid);

          setDoc(docRef, {
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
        enqueueSnackbar(`Login Successful`, {
          variant: "success",
        });
        router.replace("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        enqueueSnackbar(`Error Code: ${errorCode}: ${errorMessage}`, {
          variant: "error",
        });
      });
  };

  console.log(forgetPasswordState, resetEmailSent);

  const formLabel =
    forgetPasswordState && resetEmailSent
      ? "Return to Login"
      : forgetPasswordState
      ? "Send Reset Email"
      : "Login";

  const formAction =
    forgetPasswordState && resetEmailSent
      ? (e) => {
          e.preventDefault();
          setResetEmailSent(false);
          setForgetPasswordState(false);
        }
      : forgetPasswordState
      ? passwordResetRequest
      : signinWithEmailAndPassword;

  return (
    <Layout title="Authentication" hideHeader>
      <Container className="flex-center-center flex-col bg-gray-50 min-h-[100vh]">
        <div className="w-[450px] max-w-[90%] flex-center-center flex-col">
          <div className="form__header">
            <h3 className="secondary-heading mb-4 text-center">Welcome Back</h3>
          </div>

          <div className="bg-white shadow-lg rounded-lg py-8 px-6 w-full h-full select-none border">
            {!forgetPasswordState && (
              <>
                <div className="providersAuth-section flex-evenly-center mb-6">
                  <button
                    onClick={continueWithGH}
                    className="button-base w-1/3 py-3 border"
                  >
                    <GitHub fontSize="medium" className="icon" />
                  </button>
                  <button
                    onClick={continueWithGoogle}
                    className="button-base w-1/3 py-3 border"
                  >
                    <Google fontSize="medium" className="icon" />
                  </button>
                </div>
                <Divider>OR</Divider>
              </>
            )}

            <form noValidate onSubmit={formAction}>
              <div className="flex flex-col space-y-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email address"
                  className={`input`}
                />
              </div>

              {!forgetPasswordState && (
                <>
                  <div
                    className={`relative flex-between-center rounded-md ${
                      passError ? "border-red-400" : "border-[#dadada]"
                    } border-2 my-3 space-x-2`}
                  >
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={passwordShow ? "text" : "password"}
                      placeholder="Your password"
                      className="outline-none border-none text-gray-500 placeholder-gray-300 px-3 py-3 flex-1"
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
                  <div className="flex justify-end mb-3">
                    <span
                      className="link"
                      onClick={() => {
                        setForgetPasswordState(true);
                      }}
                    >
                      Forgot password? Reset
                    </span>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="primary-button w-full small mt-3"
              >
                {formLabel}
              </button>
            </form>
          </div>
          <div className="mt-3">
            <span
              className="link"
              onClick={() => {
                router.push({
                  pathname: "/auth/register",
                });
              }}
            >
              Don't have an account? Signup
            </span>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Login;
