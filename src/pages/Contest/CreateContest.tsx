import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Duration from "../../components/Duration";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  name: string;
  start: Date;
  duration: number;
};

const validationSchema = yup
  .object({
    name: yup.string().required(),
    start: yup.date().required().min(new Date(), "Date cannot be in the past"),
    duration: yup.number().min(1).required(),
  })
  .required();

function CreateContest() {
  const {
    control,
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

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

  useEffect(() => {
    const subscription = watch(() => setErrorMessage(undefined));
    return () => subscription.unsubscribe();
  }, [watch]);

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
          error={
            errors.start?.message ==
            "start must be a `date` type, but the final value was: `Invalid Date` (cast from the value `Invalid Date`)."
              ? "Start time is a required field "
              : errors.start?.message
          }
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
