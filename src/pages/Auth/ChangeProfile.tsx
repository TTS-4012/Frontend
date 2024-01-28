import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "../../components/Link";
import toast, { Toaster } from "react-hot-toast";

type FormDataType = {
  username: string;
  email: string;
};
const validationSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

function UpdateProfile() {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string>(" ");

  const handleConfirm = (data: FormDataType) => {
    toast.promise(
      axios.post("/auth/edit_user", {
        username: data.username,
        email: data.email,
        password: "",
      }),
      {
        loading: "Loading...",
        success: "Updated",
        error: (err) => err?.response?.data?.msg ?? "Something went wrong, please try again",
      },
    );
  };

  useEffect(() => {
    const subscription = watch(() => setErrorMessage(" "));
    return () => subscription.unsubscribe();
  }, [watch]);
  useEffect(() => {
    toast.promise(
      axios.get<FormDataType>("/auth", {}).then((res) => {
        reset({
          username: res.data?.username,
          email: res.data?.email,
        });
      }),
      {
        loading: "Loading Profile...",
        success: "",
        error: (err) => err?.response?.data?.msg ?? "Something went wrong, please try again",
      },
    );
  }, [reset]);

  return (
    <div className="m-auto w-full max-w-md rounded-lg bg-white p-3 shadow">
      <Toaster />
      <form
        onSubmit={handleSubmit(handleConfirm)}
        className="flex flex-col">
        <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Profile</p>
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
        <p className="m-2 text-sm">
          <Link to="/profile/change-password">Change Your Password</Link>
        </p>
        <div className="flex flex-row items-center">
          {/* {!errorMessage && <span className="ml-3 text-green-400">Confirmed</span>}
          {errorMessage == "waiting for respond" && (
            <span className={`ml-3 ${errorMessage == "waiting for respond" ? "text-yellow-400" : "text-red-700"}`}>
              {errorMessage}
            </span>
          )} */}
          {errorMessage && <p className=" text-red-600"> {errorMessage} </p>}
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

export default UpdateProfile;
