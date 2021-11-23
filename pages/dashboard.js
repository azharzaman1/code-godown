import { PlusIcon, SaveIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Loader from "../components/Generic/Loader";
import Layout from "../components/Layout";
import Container from "../files/Container";
import { selectUserFromDB } from "../redux/slices/userSlice";
import Navigation from "../components/Dahsboard/Navigation";
import DashboardContentPanel from "../components/Dahsboard/DashboardContentPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDashboardState,
  selectFileName,
  selectSnippetName,
} from "../redux/slices/appSlice";
import { Save, Send } from "@mui/icons-material";
import AddNewSnippetPanel from "../components/Dahsboard/AddNewSnippetPanel";
import { useRouter } from "next/dist/client/router";

const dashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const userInDB = useSelector(selectUserFromDB);
  const snippetName = useSelector(selectSnippetName);
  const fileName = useSelector(selectFileName);

  const router = useRouter();
  const { display, file, snippet } = router.query;

  const fileN = file || fileName || "file";
  const snippetN = snippet || snippetName || "New Snippet";

  const appTheme = "dark";

  useEffect(() => {
    setTimeout(() => {
      setDashboardLoading(false);
    }, 1000);
  }, []);

  const handleAddSnippet = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "add-new-snippet-info",
      },
    });
  };

  const handleContinueToPhase2 = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "finalize-new-snippet",
        snippet: snippetName,
        file: fileName,
      },
    });
  };

  const handleSnippetSave = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "snippets",
      },
    });
  };

  const handleDiscard = () => {
    router.push({
      pathname: "/dashboard",
      query: {
        display: "snippets",
      },
    });
  };

  return (
    <Layout
      hideHeader={dashboardLoading}
      className={`min-w-full ${appTheme === "dark" && "dark-bg"}`}
      headerVariant={appTheme === "dark" ? "dark" : "light"}
    >
      {dashboardLoading ? (
        <div className="loader-container w-full min-h-[90vh] flex-center-center">
          <Loader label="hang on, while we prepare a dashboard for you" />
        </div>
      ) : (
        <Container>
          <div className="dashboard mt-1 flex md:space-x-3">
            <div
              className={`hidden ${
                display === "snippets" && "md:inline-flex"
              } dashboard-left flex-[0.20]`}
            >
              <div className="dahsboardLeft__navigation flex flex-col w-full">
                <div className="h-16 rounded shadow w-full flex items-center pl-4 border-b">
                  <h3
                    className={
                      appTheme === "dark"
                        ? "tertiary-heading-dark"
                        : "tertiary-heading"
                    }
                  >
                    Navigation
                  </h3>
                </div>
                <div className="w-full">
                  <Navigation />
                </div>
              </div>
            </div>
            <div
              className={`dashboard-right ${
                display === "snippets" ? "flex-[0.80]" : "w-full"
              } flex flex-col`}
            >
              <div className="dashboard__contentHeader flex-between-center w-full px-4 h-16 rounded shadow border-b">
                <div>
                  {display === "snippets" && (
                    <h3
                      className={
                        appTheme === "dark"
                          ? "tertiary-heading-dark"
                          : "tertiary-heading"
                      }
                    >
                      {userInDB?.userDetails?.displayName
                        ? `${userInDB?.userDetails?.displayName}'s Snippets`
                        : "Your Snippets"}
                    </h3>
                  )}

                  {display === "add-new-snippet-info" && (
                    <h3
                      className={
                        appTheme === "dark"
                          ? "tertiary-heading-dark"
                          : "tertiary-heading"
                      }
                    >
                      Adding new snippet
                    </h3>
                  )}

                  {display === "finalize-new-snippet" && (
                    <>
                      <h3
                        className={
                          appTheme === "dark"
                            ? "tertiary-heading-dark"
                            : "tertiary-heading"
                        }
                      >
                        Adding new snippet
                      </h3>
                      <p
                        className={
                          appTheme === "dark"
                            ? "info-text-dark mt-1"
                            : "info-text mt-1"
                        }
                      >
                        {`${snippetN}`} /{" "}
                        <span
                          className={`info-text font-medium underline ${
                            appTheme === "dark" && "text-gray-300"
                          }`}
                        >{`${fileN}`}</span>
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <form>
                    <div className="flex-between-center border-2 rounded-md pl-3 flex-[0.5]">
                      <input
                        type="text"
                        placeholder="Search snippet"
                        className={`outline-none flex-1 ${
                          appTheme === "dark" && "bg-transparent text-gray-300"
                        }`}
                      />
                      <div className="bg-red-400 rounded-r-md p-2 cursor-pointer">
                        <SearchIcon className="h-5 text-white" />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex space-x-2">
                  {/* Header Dynamic Buttons */}
                  {display !== "snippets" && (
                    <button className="icon-button" onClick={handleDiscard}>
                      <XIcon className="h-4 pr-2" /> Discard
                    </button>
                  )}
                  {display === "snippets" && (
                    <button className="icon-button" onClick={handleAddSnippet}>
                      <PlusIcon className="h-4 pr-2" /> Add New
                    </button>
                  )}
                  {display === "add-new-snippet-info" ||
                  display === "finalize-new-snippet" ? (
                    <button
                      className="icon-button"
                      onClick={
                        display === "add-new-snippet-info"
                          ? handleContinueToPhase2
                          : handleSnippetSave
                      }
                    >
                      {display === "finalize-new-snippet" && (
                        <Save fontSize="medium" className="pr-2" />
                      )}
                      {display === "add-new-snippet-info"
                        ? "Continue"
                        : "Save Snippet"}
                      {display === "add-new-snippet-info" && (
                        <Send fontSize="medium" className="pl-2" />
                      )}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="dashboard__content mt-1 shadow min-h-[700px]">
                {display === "snippets" && <DashboardContentPanel />}
                {display === "add-new-snippet-info" ||
                display === "finalize-new-snippet" ? (
                  <AddNewSnippetPanel />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Container>
      )}
    </Layout>
  );
};

export default dashboard;
