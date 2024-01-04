import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Duration from "../../components/Duration";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "../../components/Link";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

type FormData = {
  title: string;
  start_time: string;
  duration: number;
};

type ParamsType = {
  contestId: string;
};

type ContestProblemDataType = {
  ID: number;
  Title: string;
};

type ContestDataType = {
  contest_Id: number;
  title: string;
  start_time: number;
  problems: ContestProblemDataType[];
  duration: number;
};

const validationSchema = yup
  .object({
    title: yup.string().required(),
    start_time: yup.string().required(),
    duration: yup.number().min(1).required(),
  })
  .required();

function EditContest() {
  const { contestId } = useParams<ParamsType>();

  const navigate = useNavigate();

  const {
    control,
    watch,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [contestData, setContestData] = useState<ContestDataType>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const subscription = watch(() => setErrorMessage(undefined));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    axios.get<ContestDataType>(`contests/${contestId}`).then((res) => {
      setContestData(res.data);
      reset({
        title: res.data.title,
        start_time: new Date((res.data.start_time + 210 * 60) * 1000).toISOString().slice(0, -5),
        duration: res.data.duration,
      });
    });
  }, [contestId, reset]);

  const handleApply = (data: FormData) => {
    axios
      .put(`contests/${contestId}`, {
        title: data.title,
        start_time: new Date(data.start_time).getTime() / 1000,
        Duration: data.duration,
      })
      .then(() => {
        navigate("..");
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  };

  const handleRemoveProblem = (problemId: number) => {
    axios
      .delete(`/contests/${contestId}/problems/${problemId}`)
      .then(() => {
        navigate("");
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/contests/${contestId}`)
      .then(() => {
        navigate("/contests");
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  };

  return (
    contestData && (
      <div className="m-auto grid grid-cols-12 gap-5">
        <div className="col-span-5 col-start-2 rounded-md bg-white p-5">
          <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Edit Contest</p>
          <form
            onSubmit={handleSubmit(handleApply)}
            className="Flex">
            <Input
              label="Name"
              {...register("title")}
              error={errors.title?.message}
            />
            <Input
              label="start_time"
              type="datetime-local"
              {...register("start_time")}
              error={
                errors.start_time?.message ==
                "start_time must be a `date` type, but the final value was: `Invalid Date` (cast from the value `Invalid Date`)."
                  ? "Start time is a required field "
                  : errors.start_time?.message
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
              <span className="ml-3 grow text-red-700">{errorMessage}</span>
              <Button
                onClick={() => {
                  axios.delete(`/contests/${contestId}`, {
                    headers: {
                      Authorization: localStorage.getItem("auth.access_token"),
                    },
                  });
                  navigate("/contests");
                }}
                variant="error"
                size="md"
                className="flex-end ml-auto mr-2 font-bold">
                Delete Contest
              </Button>
              <Button
                type="submit"
                size="md"
                className="flex-end ml-auto mr-2 font-bold">
                Apply
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-5 rounded-md bg-white p-5">
          <p className="mb-3 p-3 text-left text-3xl font-extrabold text-indigo-700">Edit Problems</p>
          {contestData.problems?.map((problem, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Link
                to={`/contests/${contestId}/problems/${problem.ID}`}
                className="mr-auto">
                {problem.Title.slice(0, 15)} {problem.Title.length > 15 && "..."}
              </Link>
              <Button
                size="zero"
                variant="inline"
                onClick={() => {
                  navigate(`problems/${problem.ID}/edit`);
                }}>
                <PencilIcon className="-m-1 h-5 w-5" />
              </Button>
              <Button
                size="zero"
                variant="inline"
                onClick={() => handleRemoveProblem(problem.ID)}>
                <TrashIcon className="-m-1 h-5 w-5" />
              </Button>
            </div>
          ))}
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            to={`/contests/${contestId}/problems/new`}>
            <PlusCircleIcon className="h-5 w-5" />
            Add Problem
          </Link>
        </div>
      </div>
    )
  );
}

export default EditContest;
