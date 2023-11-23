import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

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
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must hava a digit, a letter and lengh at least 8")
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

  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const handleRegister = (data: FormDataType) => {
    axios
      .post("https://api.ocontest.ir/v1/auth/register", data)
      .then((res) => {
        navigate("/verify", { state: { user_id: res.data.UserID } });
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
      <p className="mb-3 p-3 text-left text-3xl font-extrabold text-gray-900">Register</p>
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
        type="password"
        error={errors.password?.message}
      />
      <Input
        label="Repeat password"
        {...register("passConfirm")}
        type="password"
        error={errors.passConfirm?.message}
      />
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
