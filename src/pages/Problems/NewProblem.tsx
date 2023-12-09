import { Fragment, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import Markdown from "../../components/Markdown";
import { Tab } from "@headlessui/react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

type FormDataType = {
  name: string;
};

const validationSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

function NewProblem() {
  const editorContainer = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

  const { register, handleSubmit } = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
  });

  const [content, setContent] = useState<string>();
  useEffect(() => {
    if (editorContainer.current) {
      editor.current = monaco.editor.create(editorContainer.current, {
        language: "markdown",
        automaticLayout: true,
      });

      editor.current.onDidChangeModelContent(() => {
        setContent(editor.current?.getValue());
      });
    }

    return () => {
      editor.current?.dispose();
      editor.current = undefined;
    };
  }, []);

  const onSave = (data: FormDataType) => {
    console.log(data);
    axios
      .post(
        "/problems",
        {
          title: data.name,
          description: content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("auth.access_token"),
          },
        },
      )
      .then(console.log);
  };

  return (
    <div className="flex h-full w-full p-1">
      <div className="flex grow flex-col overflow-hidden p-1">
        <Tab.Group>
          <Tab.List className="flex gap-0.5 self-start">
            {["Edit", "Preview"].map((item) => (
              <Tab
                as={Fragment}
                key={item}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? "bg-white text-indigo-700" : "text-gray-500 hover:text-gray-700"
                    } "z-10 rounded-t-lg px-3 py-1 text-sm font-medium outline-none`}>
                    {item}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="grow overflow-hidden rounded-lg rounded-tl-none shadow-sm">
            <Tab.Panel
              unmount={false}
              className="h-full overflow-hidden rounded-lg rounded-tl-none"
              ref={editorContainer}
            />
            <Tab.Panel
              unmount={false}
              className="shelakhte h-full overflow-auto rounded-lg rounded-tl-none bg-white p-2">
              <Markdown>{content ?? ""}</Markdown>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <form
        className="w-96 px-1 pt-8"
        onSubmit={handleSubmit(onSave)}>
        <Input
          label="Problem Name"
          {...register("name")}
        />
        <div className="flex flex-row items-center">
          <span className="ml-3 text-red-700">{}</span>
          <Button
            type="submit"
            size="md"
            className="flex-end ml-auto font-bold">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewProblem;
