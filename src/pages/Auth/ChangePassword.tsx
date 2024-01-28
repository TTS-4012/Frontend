import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Checkbox from "../../components/Checkbox";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type FormDataType = {
  password: string;
  passConfirm: string;
};

const validationSchema = yup
  .object({
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "Password must have a digit, a letter and length at least 8")
      .required(),
    passConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

function ChangePassword() {
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

  const handleConfirm = (data: FormDataType) => {
    toast
      .promise(
        axios.post("/auth/edit_user", {
          password: data.password,
        }),
        {
          loading: "Loading...",
          success: "Updated",
          error: (err) => err?.response?.data?.msg ?? "Something went wrong, please try again",
        },
      )
      .then(() => navigate("/profile"));
  };

  useEffect(() => {
    const subscription = watch(() => setErrorMessage("s"));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="m-auto w-full max-w-md rounded-lg bg-white p-3 shadow">
      <Toaster />
      <form
        onSubmit={handleSubmit(handleConfirm)}
        className="flex flex-col">
        <Input
          label="New password"
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
        <div className="flex flex-row items-center">
          {/* {errorMessage && <span className="ml-3 text-red-600">{errorMessage}</span>} */}
          <Button
            type="submit"
            size="md"
            className="ml-auto font-bold">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
