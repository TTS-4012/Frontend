import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Link from "../../components/Link";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type FormDataType = {
  email: string;
  password: string;
};

const validationSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const handleLogin = (data: FormDataType) => {
    axios
      .post("/auth/login", {
        ...data,
        grant_type: "password",
      })
      .then((res) => {
        localStorage.setItem("auth.access_token", res.data.access_token);
        localStorage.setItem("auth.refresh_token", res.data.refresh_token);
        navigate("/dashboard");
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  };

  useEffect(() => {
    const subscription = watch(() => setErrorMessage(undefined));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col">
      <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Login</p>
      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        {...register("password")}
        type={showPassword ? "text" : "password"}
        error={errors.password?.message}
      />
      <Checkbox
        value={showPassword}
        onToggle={setShowPassword}
        label="Show password"
        className="m-1"
      />
      <p className="m-2 text-sm">
        <Link to="/otp-login">Login with OTP</Link> | <Link to="/register">Register</Link>
      </p>
      <div className="flex flex-row items-center">
        <span className="ml-3 text-red-700">{errorMessage}</span>
        <Button
          type="submit"
          size="md"
          className="flex-end ml-auto mr-2 font-bold">
          Login
        </Button>
      </div>
    </form>
  );
}
export default Login;
