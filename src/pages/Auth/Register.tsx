import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Checkbox from "../../components/Checkbox";
import Link from "../../components/Link";

type FormDataType = {
  username: string;
  email: string;
  password: string;
  passConfirm: string;
};

const validationSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "Password must hava a digit, a letter and lengh at least 8")
      .required(),
    passConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

function Register() {
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

  const handleRegister = (data: FormDataType) => {
    axios
      .post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        navigate("/verify", { state: { user_id: res.data.user_id } });
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
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col">
      <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Register</p>
      <Input
        label="Username"
        {...register("username")}
        error={errors.username?.message}
      />
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
      <Input
        label="Repeat password"
        {...register("passConfirm")}
        type={showPassword ? "text" : "password"}
        error={errors.passConfirm?.message}
      />
      <Checkbox
        value={showPassword}
        onToggle={setShowPassword}
        label="Show password"
        className="m-1"
      />
      <p className="m-2 text-sm">
        Already have an account? <Link to="/login">Login</Link> or <Link to="/otp-login">Login with OTP</Link>
      </p>
      <div className="flex flex-row items-center">
        <span className="ml-3 text-red-700">{errorMessage}</span>
        <Button
          type="submit"
          size="md"
          className="ml-auto font-bold">
          Register
        </Button>
      </div>
    </form>
  );
}

export default Register;
