import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../firebase";
import { regexCodes } from "../../files/utils";
import { useSnackbar } from "notistack";
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
import AuthLayout from "../../components/Auth/Layout";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [resetingPassword, setResetingPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [sendingPasswordResetEmail, setSendingPasswordResetEmail] =
    useState(false);
  const [remember, setRemember, remove] = useLocalStorage(
    "cg-remember-device",
    false
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

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
    <div>
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
          {errors?.email && <ErrorMessage message={errors?.email.message} />}
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
  );
};

Login.getLayout = (page) => (
  <AuthLayout title="Login | Authentication">{page}</AuthLayout>
);

export default Login;
