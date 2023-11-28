import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Markdown from "react-markdown";
import FilePicker from "../../components/FilePicker";
import rehypeHighlight from "rehype-highlight";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

type ProblemData = {
  title: string;
  hardness: number;
  solve_count: number;
  description: string;
};
type ParamsType = {
  id: string;
};

function Problem() {
  const { id } = useParams<ParamsType>();
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
      console.log(data);
      axios
        .post("https://api.ocontest.ir/v1/problems/....", data)
        .then(() => {
          navigate("....");
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
    <div className="m-5 flex flex-col">
      <p className="rounded-t-md border-black bg-white p-5 text-center align-middle text-3xl font-black shadow-md">
        {data?.title ?? "title"}
      </p>
      <div className="mt-2 flex flex-row items-start gap-2">
        <div className=" flex w-9/12 flex-col rounded-b-md bg-white p-5 shadow-md">
          <Markdown rehypePlugins={[rehypeHighlight]}>{data.description}</Markdown>
        </div>
        <div className=" flex w-3/12 flex-col">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 rounded-br-md bg-white p-5 shadow-md">
            <p className="text-xl font-bold text-indigo-800">Submit here</p>
            <FilePicker ref={filePicker} />
            <div className="flex flex-row justify-between">
              <span className="ml-3 text-red-700">{errorMessage}</span>
              <Button
                type="submit"
                size="md">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
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
export default Problem;
