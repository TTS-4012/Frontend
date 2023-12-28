import { HTMLAttributes, useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Markdown from "../../../components/Markdown";
import axios, { AxiosError } from "axios";

type Code = {
  file: File;
};
type PropsType = HTMLAttributes<HTMLDivElement> & {
  id: string;
};

function CodeView({ id , ...otherProps }: PropsType) {
  const [data, setdata] = useState<Code>();
  const [errorMessage, setErrorMessage] = useState<string>();
  useEffect(() => {
    axios
      .get<Code>(`/submissions/${id}`, {
        headers: { Authorization: localStorage.getItem("auth.access_token") },
      })
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [id]);
  return data ? (
    <div
      className="flex max-h-full w-5/12 flex-col self-center rounded-md bg-white p-2 shadow"
      {...otherProps}>
      <div className="self-start rounded-t-md border px-2 py-1 ">{data?.file.name}</div>
      <div className="overflow-scroll rounded-b-md rounded-tr-md border px-2  py-1">
           <Markdown>{` ${data?.file.text().toString()} `}</Markdown>
      </div>
    </div>
  ) : (
    <div className="flex h-screen w-full text-indigo-800">
      {errorMessage ? (
        <p className="m-auto text-center text-5xl">{errorMessage}</p>
      ) : (
        <ArrowPathIcon className="m-auto h-20 w-20 animate-spin" />
      )}
    </div>);
}
export default CodeView;
