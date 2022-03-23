import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Combobox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { Add, Label } from "@mui/icons-material";
import Button from "../../Generic/Button";
import { selectUser } from "../../../redux/slices/userSlice";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import useAuth from "../../../hooks/auth/useAuth";
import { useSnackbar } from "notistack";

const LabelSelect = () => {
  const labels = useSelector(selectUser)?.labels || [];
  const [labelsData, setLabelsData] = useState([
    { name: "None", id: 0 },
    ...labels,
  ]);
  const [selectedLabel, setSelectedLabel] = useState();
  const [query, setQuery] = useState("");
  const [labelFound, setLabelFound] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const currentUser = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const filteredLabels =
    query === ""
      ? labelsData
      : labelsData.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    if (labelsData.find((label) => label.name === e.target.value)) {
      setLabelFound(true);
    } else {
      setLabelFound(false);
    }
  };

  const { mutate: updateUser } = useMutation(
    async (labelsData) => {
      return await axiosPrivate.put(
        `/api/v1/users/${currentUser?._id}`,
        labelsData
      );
    },
    {
      onSuccess: (res) => {
        console.log("User update[Label Addition] response", res);
      },
      onError: (err) => {
        const statusCode = err.response.status;
        const statusText = err.response.statusText;
        enqueueSnackbar(statusText, {
          variant: "error",
        });
      },
    }
  );

  const handleLabelAddition = () => {};

  return (
    <div className="">
      <Combobox value={selectedLabel} onChange={setSelectedLabel}>
        <div className="relative mt-1">
          <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
            <Combobox.Input
              className="w-full dark:bg-backgroundContrastDark text-primaryTextDark border border-borderColor dark:border-borderColorDark focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5"
              displayValue={(person) => person.name}
              placeholder="Search or add new label"
              onChange={handleQueryChange}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-backgroundContrast dark:bg-backgroundContrastDark rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredLabels.length === 0 && query !== "" ? (
                <div className="cursor-default select-none relative py-2 px-4 text-primaryText dark:text-primaryTextDark">
                  Nothing found.
                </div>
              ) : (
                filteredLabels.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active
                          ? "text-primaryTextDark bg-primary"
                          : "text-primaryText dark:text-primaryTextDark"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary"
                            }`}
                          >
                            <Label fontSize="small" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
              {!labelFound && query ? (
                <div className="py-1 px-2">
                  <Button
                    type="text-icon"
                    startIcon={<Add fontSize="small" />}
                    className="w-full flex justify-center"
                    onClick={handleLabelAddition}
                  >
                    Add {query ? query : "Label"}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default LabelSelect;
