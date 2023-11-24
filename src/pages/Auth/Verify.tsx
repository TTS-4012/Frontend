import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";

type FormDataType = {
  otp: string;
};

const validationSchema = yup
  .object({
    otp: yup.string().required(),
  })
  .required();

function Verify() {
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const onSubmit = (data: FormDataType) => {
    if (state?.user_id) {
      axios
        .post("https://api.ocontest.ir/v1/auth/verify", {
          user_id: state.user_id,
          otp: data.otp,
        })
        .then(() => {
          navigate("/login");
        })
        .catch((err: AxiosError<any>) => {
          setErrorMessage(err.response?.data.message ?? err.message);
        });
    } else if (state?.email) {
      axios
        .post("https://api.ocontest.ir/v1/auth/verify", {
          email: state.email,
          otp: data.otp,
        })
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err: AxiosError<any>) => {
          setErrorMessage(err.response?.data.message ?? err.message);
        });
    }
  };

  useEffect(() => {
    const subscription = watch(() => setErrorMessage(undefined));
    return () => subscription.unsubscribe();
  }, [watch]);

  if (!state?.user_id && !state?.email) {
    return <Navigate to="/register" />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col">
      <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Verify</p>
      <Input
        label="Enter the code"
        {...register("otp", {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/[^\d]/g, "").slice(0,6);
          },
        })}
        error={errors.otp?.message}
        inputMode="numeric"
      />
      <div className="flex flex-row items-center">
        <span className="ml-3 text-red-700">{errorMessage}</span>
        <Button
          type="submit"
          size="md"
          className="ml-auto font-bold">
          Verify
        </Button>
      </div>
    </form>
  );
}

export default Verify;
