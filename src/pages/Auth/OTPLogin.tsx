import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

type FormDataType = {
  email: string;
};

const validationSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

function OTPLogin() {
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

  const handleLogin = (data: FormDataType) => {
    axios
      .post("/auth/otp", data)
      .then((res) => {
        navigate("/verify", { state: { email: res.data.email } });
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
      <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Login with OTP</p>
      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />
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
export default OTPLogin;
