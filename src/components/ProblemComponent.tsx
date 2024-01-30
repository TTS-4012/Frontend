import { HTMLAttributes } from "react";
import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "./Markdown";
import FilePicker from "./FilePicker";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { PencilIcon, Square2StackIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import Dialog from "./Dialog";
import CopyToContest from "./CopyToContest";
import Button from "./Button";
import toast from "react-hot-toast";

type ProblemData = {
  title: string;
  hardness: number;
  solve_count: number;
  description: string;
  is_owned: boolean;
};

type PropsType = HTMLAttributes<HTMLDivElement> & {
  id: string;
};

function ProblemComponent({ id, className, ...otherProps }: PropsType) {
  const { contestId } = useParams();
  const [data, setData] = useState<ProblemData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [copyOpen, setCopyOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
    axios
      .get<ProblemData>(`/problems/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err: AxiosError<any>) => {
        setErrorMessage(err.response?.data.message ?? err.message);
      });
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filePicker.current?.files?.length) {
      const data = await filePicker.current?.files[0].text();
      axios
        .post(`/problems/${id}/submit`, data, {
          params: {
            contest_id: contestId,
          },
        })
        .then(() => {
          navigate("submissions");
        });
    } else {
      toast("no file selected");
    }
  };

  const filePicker = useRef<HTMLInputElement>(null);

  return data ? (
    <div
      className={`flex flex-col gap-2 ${className}`}
      {...otherProps}>
      {createPortal(
        <Dialog
          open={copyOpen}
          onClose={setCopyOpen}
          title="Copy problem to contest">
          <CopyToContest onClose={() => setCopyOpen(false)} />
        </Dialog>,
        document.body,
        `Copy`,
      )}
      <div className="relative rounded-t-lg border-black bg-white p-5 text-center align-middle text-3xl font-black shadow-md">
        {!contestId && (
          <div className="absolute left-4 top-4 flex gap-2">
            <Button
              size="xs"
              className="flex gap-1 text-indigo-600"
              variant="inline"
              onClick={() => {
                navigate(`/problems/${id}/submissions`);
              }}>
              <PuzzlePieceIcon className="h-5 w-5" />
              Submissions
            </Button>
          </div>
        )}
        {data?.title ?? "title"}
        <div className="absolute right-4 top-4 flex gap-2">
          {data.is_owned && (
            <Button
              size="xs"
              variant="inline"
              onClick={() => {
                navigate(`/problems/${id}/edit`);
              }}>
              <PencilIcon className="h-5 w-5" />
            </Button>
          )}
          <Button
            size="xs"
            variant="inline"
            onClick={() => {
              setCopyOpen(true);
            }}>
            <Square2StackIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Markdown className=" bg-white p-8 shadow-md">{data.description}</Markdown>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-2 rounded-b-lg bg-white p-5 shadow-md">
        <p className="text-xl font-bold text-indigo-800">Submit here</p>
        <div className="flex flex-row gap-3">
          <FilePicker
            accept=".py"
            ref={filePicker}
          />
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
    <div className="flex h-screen w-full text-indigo-800">
      {errorMessage ? (
        <p className="m-auto text-center text-5xl">{errorMessage}</p>
      ) : (
        <ArrowPathIcon className="m-auto h-20 w-20 animate-spin" />
      )}
    </div>
  );
}
export default ProblemComponent;
