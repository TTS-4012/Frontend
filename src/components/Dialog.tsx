import { ReactNode } from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "./Button";

type DialogProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: (_: false) => unknown;
};

function Dialog(props: DialogProps) {
  return (
    <HeadlessDialog
      className="fixed inset-0 flex items-center justify-center p-6"
      open={props.open}
      onClose={props.onClose}>
      <div
        className="absolute inset-0 z-10 bg-black/30"
        aria-hidden="true"
      />
      <HeadlessDialog.Panel className="z-20 w-full max-w-xl max-h-full min-h-[50%] rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="flex justify-between border-b border-gray-200 p-4 text-gray-900 sm:px-6">
          <HeadlessDialog.Title className="text-lg font-medium leading-6">{props.title}</HeadlessDialog.Title>
          <Button
            variant="inline"
            size="zero"
            onClick={() => props.onClose(false)}>
            <XMarkIcon className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4">{props.children}</div>
      </HeadlessDialog.Panel>
    </HeadlessDialog>
  );
}

export default Dialog;
