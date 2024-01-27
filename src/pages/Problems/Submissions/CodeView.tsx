import { HTMLAttributes, useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Markdown from "../../../components/Markdown";
import axios from "axios";

type Code = {
  file: File;
};
type PropsType = HTMLAttributes<HTMLDivElement> & {
  id: string;
};

function CodeView({ id, ...otherProps }: PropsType) {
  const [data, setData] = useState<Code>();
  useEffect(() => {
    axios.get<Code>(`/submissions/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [id]);
  return data ? (
    <div
      className="flex flex-col self-center overflow-scroll rounded-md border bg-white p-2 px-2 py-1 shadow"
      {...otherProps}>
      <Markdown>{`\`\`\`python\n${data}\n\`\`\``}</Markdown>
    </div>
  ) : (
    <div className="flex w-full text-indigo-800">
      <ArrowPathIcon className="m-auto h-20 w-20 animate-spin" />
    </div>
  );
}
export default CodeView;
