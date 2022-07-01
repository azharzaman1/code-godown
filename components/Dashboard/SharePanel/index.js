import { LinkIcon, PlusSmIcon } from "@heroicons/react/solid";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import SlideOver from "../../Generic/SlideOver";
import Text from "../../Generic/Text";
import { useRef, useState } from "react";
import { useCopyToClipboard } from "react-use";
import { useSnackbar } from "notistack";
import { RadioGroup } from "@headlessui/react";

const persons = [];

const privacyOptions = [
  {
    name: "Public access",
    desc: "Everyone with the link can see this snippet.",
  },
  {
    name: "Private - Team members only [Coming soon]",
    desc: "Only members of your team would be able to and collaborate.",
  },
  {
    name: "Open-source [Coming soon]",
    desc: `Anyone can see and collborate`,
  },
];

function SharePanel({ open, setOpen, snippet }) {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [selected, setSelected] = useState(privacyOptions[0]);
  const { enqueueSnackbar } = useSnackbar();

  const [shareURL, setShareURL] = useState(
    process.env.NODE_ENV === "production"
      ? `https://code-godown.vercel.app/u/@${snippet?.owner?.username}/s/${snippet?.slug}?_id=${snippet?._id}&feature=open-sharing`
      : `http://localhost:3000/u/@${snippet?.owner?.username}/s/${snippet?.slug}?_id=${snippet?._id}&feature=open-sharing`
  );

  const shareSlugField = useRef(null);

  return (
    <SlideOver open={open} setOpen={setOpen}>
      <div className="flex-1 h-0 overflow-y-auto">
        <div className="py-6 px-4 dark:bg-backgroundContrastDark sm:px-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-white">
              Share {snippet?.snippetName}
            </Dialog.Title>
            <div className="ml-3 h-7 flex items-center">
              <button
                type="button"
                className="dark:bg-backgroundV1Dark rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-1">
            <Text type="info">
              Share this snippet with your team member, your boss, or buddy of
              yours. Choose proper privacy for your code!
            </Text>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="px-4 divide-y divide-gray-200 sm:px-6">
            <div className="space-y-6 pt-6 pb-5">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Team Members [Coming soon]
                </h3>
                <div className="mt-2">
                  <div className="flex space-x-2">
                    {persons.map((person) => (
                      <a
                        key={person.email}
                        href={person.href}
                        className="rounded-full hover:opacity-75"
                      >
                        <img
                          className="inline-block h-8 w-8 rounded-full"
                          src={person.imageUrl}
                          alt={person.name}
                        />
                      </a>
                    ))}
                    <button
                      type="button"
                      className="flex-shrink-0 bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Add team member</span>
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <fieldset>
                <legend className="text-sm font-medium text-gray-900">
                  Privacy
                </legend>
                <div className="w-full py-4">
                  <div className="mx-auto w-full">
                    <RadioGroup value={selected} onChange={() => {}}>
                      <RadioGroup.Label className="sr-only">
                        Privacy options
                      </RadioGroup.Label>
                      <div className="space-y-2">
                        {privacyOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.name}
                            value={option}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary"
                                  : ""
                              }
                  ${
                    checked
                      ? "dark:bg-backgroundContrastDark text-white"
                      : "bg-gray-100"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium ${
                                          checked
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {option.name}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className={`inline ${
                                          checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <span>{option.desc}</span>
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="shrink-0 text-white">
                                      <CheckIcon className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="pt-4 pb-6">
              <div className="flex text-sm cursor-pointer">
                <p
                  onClick={() => {
                    copyToClipboard(shareURL);
                    state.value &&
                      enqueueSnackbar("Copied", { variant: "success" });
                    state.error &&
                      enqueueSnackbar("Unable to copy!", { variant: "error" });
                  }}
                  href="#"
                  className="group inline-flex items-center font-medium text-primary text-opacity-80 hover:text-primary hover:text-opacity-90"
                >
                  <LinkIcon
                    className="h-5 w-5 text-primary text-opacity-70 group-hover:text-primary"
                    aria-hidden="true"
                  />
                  <span className="ml-2">Copy link</span>
                </p>
              </div>
              <div className="mt-2">
                <div className="mt-1">
                  <textarea
                    ref={shareSlugField}
                    name="description"
                    rows={2}
                    className="block w-full shadow-sm text-sm text-primaryText placeholder:text-infoText dark:placeholder:text-infoTextDark border border-gray-300 dark:border-borderColorDark focus:ring-primary ring-opacity-50 focus:border-primary border-opacity-50 rounded-md"
                    defaultValue={shareURL}
                    onFocus={() => console.log(shareSlugField.current.select())}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideOver>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SharePanel;
