import { HiCheck } from "react-icons/hi";
import { Toast, ToastToggle } from "flowbite-react";

export default function Toasts({message}) {
  return (
    <>
      <Toast style={{width:`30%` ,marginTop:`-1rem`}}>
        <div className="inline-flex  shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <ToastToggle />
      </Toast>
    </>
  );
}
