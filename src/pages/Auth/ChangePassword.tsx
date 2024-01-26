import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Checkbox from "../../components/Checkbox";

type FormDataType = {
  password: string;
  passConfirm: string;
};

const validationSchema = yup
  .object({
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
  const [errorMessage, setErrorMessage] = useState<string>(" ");

  const handleConfirm = (data: FormDataType) => {
    setErrorMessage("waiting for respond");
    axios
      .post("/auth/edit_user", {
        password: data.password,
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      })
      .then(() => {
        if (errorMessage == "waiting for respond") {
          setErrorMessage("");
        }
      });
  };

  useEffect(() => {
    const subscription = watch(() => setErrorMessage(" "));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="m-auto w-full max-w-md rounded-lg bg-white p-3 shadow">
      <form
        onSubmit={handleSubmit(handleConfirm)}
        className="flex flex-col">
        {/* <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Change Password</p> */}
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
          {!errorMessage && <span className="ml-3 text-green-400">Confirmed</span>}
          {errorMessage == "waiting for responde" && (
            <span className={`ml-3 ${errorMessage == "waiting for responde" ? "text-yellow-400" : "text-red-700"}`}>
              {errorMessage}
            </span>
          )}
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
