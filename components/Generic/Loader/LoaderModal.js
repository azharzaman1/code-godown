import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loader from ".";

const LoaderModal = ({
  loading = false,
  type = 2,
  label,
  setLoading = () => {},
}) => {
  return (
    <Transition.Root show={loading} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setLoading}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-100 dark:bg-gray-600 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This span element is to trick the browser into centering the modal contents. */}
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
            <div className="relative inline-block align-middle bg-white dark:bg-backgroundContrastDark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8">
              <div className="bg-white dark:bg-backgroundContrastDark p-6">
                <Loader size="large" type={type} label={label} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoaderModal;
