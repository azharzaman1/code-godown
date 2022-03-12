import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { GitHub, Google, Info } from "@mui/icons-material";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import Divider from "@mui/material/Divider";
import { doc, serverTimestamp, setDoc, getDoc } from "@firebase/firestore";
import { useSnackbar } from "notistack";
import {
  auth,
  db,
  githubAuthProvider,
  googleAuthProvider,
} from "../../firebase";
import { formInputGuide, regexCodes } from "../../files/utils";
import Layout from "../../components/Generic/Layout";
import Container from "../../components/Generic/Layout/Container";
import Button from "../../components/Generic/Button";
import Heading from "../../components/Generic/Heading";
import Tooltip from "../../components/Generic/Tooltip";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "../../axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ shouldUnregister: true });
  const [passwordShow, setPasswordShow] = useState(false);
  const [ghAuthInProgress, setGhAuthInProgress] = useState(false);
  const [googleAuthInProgress, setGoogleAuthInProgress] = useState(false);
  const [registering, setRegistering] = useState(false);

  const { mutate: registerUser } = useMutation(
    async (userData) => {
      return await axios.post("/api/v1/auth/register", userData);
    },
    {
      onSuccess: (res) => {
        enqueueSnackbar(res.statusText, {
          variant: "success",
        });
        setRegistering(false);
        reset();
        if (res.status === 201) {
          router.push("/auth/login");
        }
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        setRegistering(false);
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const onSubmit = (data) => {
    setRegistering(true);
    const { fullName, userName, email, password } = data;

    registerUser({
      firstName: fullName.split(" ")[0],
      fullName,
      username: userName,
      email,
      pswd: password,
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

  return (
    <Container className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center w-[450px] max-w-[100vw] mx-auto">
        <div className="form__header">
          <Heading type="secondary" className="mb-4">
            Register an account
          </Heading>
        </div>

        <div className="py-8 px-6 w-full bg-white shadow rounded-lg border select-none">
          <div className="providersAuth-section flex-evenly-center mb-6">
            <Button
              loading={ghAuthInProgress}
              type="special-icon"
              onClick={continueWithGH}
            >
              <GitHub fontSize="medium" className="icon" />
            </Button>
            <Button
              loading={googleAuthInProgress}
              type="special-icon"
              onClick={continueWithGoogle}
            >
              <Google fontSize="medium" className="icon" />
            </Button>
          </div>
          <Divider>OR</Divider>

          <div className="mt-3 mb-2">
            <Heading type="tertiary" className="text-center">
              Create account with email
            </Heading>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-0 w-full">
              <input
                type="text"
                defaultValue=""
                {...register("fullName", {
                  required: { value: true, message: "Full Name is requiered" },
                  minLength: { value: 5, message: "Full Name is too short!" },
                })}
                aria-invalid={errors?.fullName ? "true" : "false"}
                placeholder="Your name"
                className={`input w-full`}
              />
              {errors?.fullName && (
                <ErrorMessage
                  message={errors?.fullName.message}
                  guide={formInputGuide.fullName}
                />
              )}
            </div>

            <div className="flex flex-col w-full">
              <input
                type="text"
                defaultValue=""
                {...register("userName", {
                  required: { value: true, message: "Username is requiered" },
                  pattern: {
                    value: regexCodes.username,
                    message: "Username is not valid!",
                  },
                })}
                aria-invalid={errors?.userName ? "true" : "false"}
                aria-describedby="user-name-note"
                placeholder="Username"
                className={`input w-full`}
              />
              {errors?.userName && (
                <ErrorMessage
                  message={errors?.userName.message}
                  guide={formInputGuide.userName}
                  areaDescribedBy="user-name-note"
                />
              )}
            </div>

            <div className="flex flex-col w-full">
              <input
                type="email"
                defaultValue=""
                {...register("email", {
                  required: { value: true, message: "Email is requiered" },
                  pattern: {
                    value: regexCodes.email,
                    message: "Email is not valid!",
                  },
                })}
                aria-invalid={errors?.email ? "true" : "false"}
                aria-describedby="email-note"
                placeholder="Valid email address"
                className={`input w-full`}
              />
              {errors?.email && (
                <ErrorMessage
                  message={errors?.email.message}
                  guide={formInputGuide.email}
                  areaDescribedBy="email-note"
                />
              )}
            </div>
            <div className="flex flex-col w-full">
              <div
                className={`relative flex-between-center rounded-md w-full border-2 my-3 space-x-2`}
              >
                <input
                  defaultValue=""
                  {...register("password", {
                    required: { value: true, message: "Password is requiered" },
                    pattern: {
                      value: regexCodes.password,
                      message: "Password is not valid!",
                    },
                  })}
                  aria-invalid={errors?.password ? "true" : "false"}
                  aria-describedby="password-note"
                  type={passwordShow ? "text" : "password"}
                  placeholder="Min. 8 characters, atleast 1 letter & number"
                  className="px-3 py-3 outline-none text-primaryText dark:text-primaryTextDark placeholder:text-infoText dark:placeholder:text-infoTextDark rounded-md flex-1"
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
            </div>
            {errors?.password && (
              <ErrorMessage
                message={errors?.password.message}
                guide={formInputGuide.password}
                areaDescribedBy="password-note"
              />
            )}
            <input type="submit" className="hidden" />
            <div className="flex justify-center mt-8">
              <Button
                loading={registering}
                size="lg"
                className="w-full justify-center"
                onClick={handleSubmit(onSubmit)}
              >
                Create account
              </Button>
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
  );
};

export const ErrorMessage = ({ message, guide, areaDescribedBy }) => {
  return (
    <div className="flex space-x-2">
      <span className="text-xs md:text-sm text-error">{message}</span>
      {guide && (
        <Tooltip content={guide}>
          <Info
            fontSize="small"
            color="primary"
            className="cursor-pointer"
            id={areaDescribedBy}
            aria-hidden="false"
          />
        </Tooltip>
      )}
    </div>
  );
};

Register.getLayout = (page) => (
  <Layout title="Register | Authentication" hideHeader hideFooter>
    {page}
  </Layout>
);

export default Register;
