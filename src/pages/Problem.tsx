import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Markdown from "react-markdown";
import FilePicker from "../components/FilePicker";
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
  const handleSubmit = () => {
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
  return (
    <div className="flex flex-col">
      {data ? (
        <div className="flex flex-row">
          <div className="flex w-9/12 flex-col">
            <p className="mu-5 ml-5 mr-5 rounded-md border-black bg-slate-500 text-center text-3xl">{data?.title ?? "title"}</p>
            <p className="m-5 rounded-md">
              <Markdown rehypePlugins={[rehypeHighlight]}>{data.description}</Markdown>
            </p>
            <div>
              <ArrowPathIcon className="h-10 w-10 animate-spin" />
            </div>
          </div>
          <div className="m-2 flex w-3/12 flex-col">
            <Form onSubmit={handleSubmit}>
              <FilePicker ref={filePicker} />
              <div
                className="
              flex flex-col
              ">
                <span className="ml-3 text-red-700">{errorMessage}</span>
                <Button
                  type="submit"
                  size="md"
                  className="m-4 self-end">
                  Send
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full bg-indigo-100">{errorMessage ? <div className="m-auto bg-indigo-100 text-9xl text-indigo-800">question not found :*(</div> : <ArrowPathIcon className="m-auto  h-36 w-36 animate-spin text-indigo-800" />}</div>
      )}
    </div>
  );
}
export default Problem;
