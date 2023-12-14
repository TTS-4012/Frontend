import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Duration from "../../components/Duration";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  start: Date;
  duration: number;
};

function CreateContest() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const navigate = useNavigate();
  const handleCreate = (data: FormData) => {
    console.log(data.start);
    axios
      .post("contest/create", { ...data })
      .then(() => {
        //later add push notification
        navigate("/home");
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  };

  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <div className="rounded-md bg-white p-5">
      <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">New Contest</p>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className="Flex">
        <Input
          label="Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Start"
          type="datetime-local"
          {...register("start", {
            valueAsDate: true,
          })}
        />
        <Controller
          control={control}
          name="duration"
          render={({ field: { value, onChange, onBlur } }) => (
            <Duration
              value={value ?? 0}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
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
    </div>
  );
}

export default CreateContest;
