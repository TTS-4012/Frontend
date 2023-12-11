import { HTMLAttributes } from "react";
import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Markdown from "../../components/Markdown";
import FilePicker from "../../components/FilePicker";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

type ProblemData = {
  title: string;
  hardness: number;
  solve_count: number;
  description: string;
};
type PropsType = HTMLAttributes<HTMLDivElement> & {
  id: string;
};
function ProblemComponent({ id, ...otherProps }: PropsType) {
  const [data, setdata] = useState<ProblemData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ProblemData>(`https://api.ocontest.ir/v1/problems/${id}`, {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
      })
      .then((res) => {
        setdata(res.data);
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [id]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filePicker.current?.files?.length) {
      axios
        .post(
          "https://api.ocontest.ir/v1/submissions",
          {
            problem_id: id,
            file: e,
          },
          {
            headers: {
              Authorization: localStorage.getItem("auth.access_token"),
            },
          },
        )
        .then(() => {
          navigate("...");
        })
        .catch((err: AxiosError<any>) => {
          setErrorMessage(err.response?.data.message ?? err.message);
        });
    } else {
      setErrorMessage("no file seleced");
    }
  };
  const filePicker = useRef<HTMLInputElement>(null);
  return data ? (
    <div
      className="m-5 flex flex-col gap-2"
      {...otherProps}>
      <p className="rounded-t-lg border-black bg-white p-5 text-center align-middle text-3xl font-black shadow-md">
        {data?.title ?? "title"}
      </p>
      <Markdown className=" bg-white p-8 shadow-md">{data.description}</Markdown>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-2 rounded-b-lg bg-white p-5 shadow-md">
        <p className="text-xl font-bold text-indigo-800">Submit here</p>
        <div className="flex flex-row gap-3">
          <FilePicker ref={filePicker} />
          <div className="flex flex-row justify-between">
            <Button
              type="submit"
              size="xs">
              Submit
            </Button>
          </div>
        </div>
        <span className="ml-3 text-red-700">{errorMessage}</span>
      </form>
    </div>
  ) : (
    <div className="flex h-screen w-full bg-indigo-100">
      {errorMessage ? (
        <div className="m-auto bg-indigo-100 text-9xl text-indigo-800">{errorMessage}</div>
      ) : (
        <ArrowPathIcon className="m-auto  h-36 w-36 animate-spin text-indigo-800" />
      )}
    </div>
  );
}
export default ProblemComponent;
