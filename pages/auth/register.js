import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { GitHub, Google } from "@mui/icons-material";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "@firebase/firestore";
import { useSnackbar } from "notistack";
import {
  auth,
  db,
  githubAuthProvider,
  googleAuthProvider,
} from "../../client/firebase";
import { validateEmail, validatePassword } from "../../files/utils";
import Layout from "../../components/Generic/Layout";
import Container from "../../components/Generic/Layout/Container";
import ThemeButton from "../../components/Generic/Button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

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

  return (
    <Layout title="Authentication" hideHeader>
      <Container className="flex-center-center flex-col bg-gray-50 min-h-[100vh]">
        <div className="w-[450px] max-w-[90%] flex-center-center flex-col">
          <div className="form__header">
            <h3 className="secondary-heading mb-4 text-center">
              Create Account
            </h3>
          </div>

          <div className="bg-white shadow-lg rounded-lg py-8 px-6 w-full h-full select-none border">
            <div className="providersAuth-section flex-evenly-center mb-6">
              <ThemeButton
                type="special-icon"
                onClick={continueWithGH}
                // className="w-1/3"
              >
                <GitHub fontSize="medium" className="icon" />
              </ThemeButton>
              <ThemeButton
                type="special-icon"
                onClick={continueWithGoogle}
                // className="w-1/3"
              >
                <Google fontSize="medium" className="icon" />
              </ThemeButton>
            </div>
            <Divider>OR</Divider>

            <form noValidate onSubmit={signupWithEmailAndPassword}>
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

              <div className="flex flex-col space-y-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={
                    emailError ? "e.g. azhar@gmail.com" : "Valid email address"
                  }
                  className={`input ${
                    emailError ? "border-red-400" : "border-[#dadada]"
                  }`}
                />
              </div>

              <div
                className={`relative flex-between-center rounded-md ${
                  passError ? "border-red-400" : "border-[#dadada]"
                } border-2 my-3 space-x-2`}
              >
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordShow ? "text" : "password"}
                  placeholder="Min. 8 characters, atleast 1 letter & number"
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
              <div className="flex justify-center mt-8">
                <ThemeButton fluid size="lg">
                  Signup
                </ThemeButton>
              </div>
            </form>
          </div>

          <div className="mt-3">
            <span
              className="link"
              onClick={() => {
                router.push({
                  pathname: "/auth/login",
                });
              }}
            >
              Already have an account? Login
            </span>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Register;
