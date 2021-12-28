import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import Layout from "../components/Layout";
import Container from "../files/Container";
import Divider from "@mui/material/Divider";
import { GitHub, Google } from "@mui/icons-material";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import {
  createUserWithEmailAndPassword,
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
} from "../client/firebase";
import { validateEmail, validatePassword } from "../files/utils";
import { doc, serverTimestamp, setDoc, getDoc } from "@firebase/firestore";
import { useSnackbar } from "notistack";

const authentication = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { mode } = router.query;

  const formHeading =
    mode === "register"
      ? "Register"
      : mode === "login"
      ? "Welcome Back"
      : "Reset password";

  const formAction =
    mode === "register"
      ? "Create account"
      : mode === "login"
      ? "Login"
      : "Send reset email";

  const signupWithEmailAndPassword = (e) => {
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setPassError(false);
    if (validateEmail(email) && validatePassword(password) && fullName !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential.user) {
            const user = userCredential?.user;
            const docRef = doc(db, "users", user.uid);

            setDoc(docRef, {
              userDetails: {
                userID: user.uid,
                fullName: fullName,
                displayName: fullName,
                email: user.email,
                password: password,
                emailVerified: user.emailVerified,
                registeredAt: serverTimestamp(),
                accountType: "email_password",
              },
              snippets: [],
            });

            enqueueSnackbar(`Signup Successful`, {
              variant: "success",
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
    } else {
      if (fullName === "") {
        setNameError(true);
      }

      if (!validateEmail(email)) {
        setEmailError(true);
        setEmail("");
      }

      if (!validatePassword(password)) {
        setPassError(true);
        setPassword("");
      }

      enqueueSnackbar(`Please recheck inputs, and try again`, {
        variant: "warning",
      });
    }
  };

  const signinWithEmailAndPassword = (e) => {
    e.preventDefault();
    // sigin
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
  };

  const passwordResetRequest = (e) => {
    e.preventDefault();
    // password reset request

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent
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
        }
        if (result && !userAlreadyRegistered) {
          const user = result?.user;
          const token =
            GoogleAuthProvider.credentialFromResult(result).accessToken;
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
              accountType: "google_provider",
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

  return (
    <Layout title="Authentication" hideHeader>
      <Container className="flex-center-center flex-col bg-gray-50 min-h-[100vh]">
        <div className="w-[450px] max-w-[90%] flex-center-center flex-col">
          <div className="form__header">
            <h3 className="secondary-heading mb-4 text-center">
              {formHeading}
            </h3>
          </div>

          <div className="bg-white shadow-lg rounded-lg py-8 px-6 w-full h-full select-none border">
            <form
              noValidate
              onSubmit={
                mode === "register"
                  ? signupWithEmailAndPassword
                  : mode === "login"
                  ? signinWithEmailAndPassword
                  : passwordResetRequest
              }
            >
              {mode !== "reset-password" && (
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

              {mode === "register" && (
                <>
                  <div className="flex flex-col space-y-2 w-full">
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      type="text"
                      placeholder={nameError ? "e.g. Azhar Zaman" : "Your name"}
                      className={`input ${
                        nameError ? "border-red-400" : "border-[#dadada]"
                      }`}
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col space-y-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={
                    emailError && mode !== "login"
                      ? "e.g. azhar@gmail.com"
                      : "Valid email address"
                  }
                  className={`input ${
                    emailError && mode !== "login"
                      ? "border-red-400"
                      : "border-[#dadada]"
                  }`}
                />
              </div>
              {mode !== "reset-password" && (
                <div
                  className={`relative flex-between-center rounded-md ${
                    passError && mode !== "login"
                      ? "border-red-400"
                      : "border-[#dadada]"
                  } border-2 my-3 space-x-2`}
                >
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordShow ? "text" : "password"}
                    placeholder={
                      emailError && mode !== "login"
                        ? "Min. 8 characters, atleast 1 letter & number"
                        : "Your password"
                    }
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
              )}
              {mode === "login" && (
                <div className="flex justify-end mb-3">
                  <span
                    className="link"
                    onClick={() => {
                      router.push({
                        pathname: "/authentication",
                        query: {
                          mode: "reset-password",
                        },
                      });
                    }}
                  >
                    Forgot password? Reset
                  </span>
                </div>
              )}
              <button
                type="submit"
                className="primary-button-small mt-3 w-full"
              >
                {formAction}
              </button>
            </form>
          </div>
          <div className="mt-3">
            <span
              className="link"
              onClick={() => {
                if (mode === "register") {
                  router.push({
                    pathname: "/authentication",
                    query: {
                      mode: "login",
                    },
                  });
                } else {
                  router.push({
                    pathname: "/authentication",
                    query: {
                      mode: "register",
                    },
                  });
                }
              }}
            >
              {mode === "login"
                ? "Don't have an account? Signup"
                : mode === "register"
                ? "Already have an account? Login"
                : "I know my password? Login"}
            </span>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default authentication;
