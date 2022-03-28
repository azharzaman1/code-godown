import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import Button from "../Button";
import Heading from "../Heading";
import Text from "../Text";
import { DoneAll } from "@mui/icons-material";

const Modal = ({
  title,
  desc,
  modalContent,
  warning,
  success,
  error,
  loading,
  cancelLabel,
  confirmLabel,
  cancelAction,
  confirmAction,
  open = true,
  setOpen,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 dark:bg-gray-600 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white dark:bg-backgroundContrastDark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-backgroundContrastDark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {!modalContent ? (
                  // default node
                  <div className="sm:flex sm:items-start">
                    {warning || error ? (
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-error bg-opacity-10 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon
                          className="h-6 w-6 text-error"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    {success && (
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-success bg-opacity-10 sm:mx-0 sm:h-10 sm:w-10">
                        <DoneAll
                          className="h-6 w-6 text-success"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="">
                        <Heading type="tertiary">{title}</Heading>
                      </Dialog.Title>
                      <div className="mt-2">
                        <Text colorVariant="dim">{desc}</Text>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>{modalContent}</>
                )}
              </div>
              <div className="py-2 px-4 flex flex-col sm:flex-row-reverse space-y-3 sm:space-y-0 sm:px-6 bg-gray-50 dark:bg-backgroundContrastDark border-t border-dividerColorDark">
                <Button
                  loading={loading}
                  onClick={confirmAction}
                  className="justify-center text-center min-w-[100px]"
                >
                  {confirmLabel || "Confirm"}
                </Button>
                <Button
                  type="text"
                  onClick={() => setOpen(false)}
                  className="sm:mr-3 mt-10 sm:mt-0 text-center"
                >
                  {cancelLabel || "Cancel"}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
