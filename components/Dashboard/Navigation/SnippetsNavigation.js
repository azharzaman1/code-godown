import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Label from "../../Generic/Label";
import Tag from "../../Generic/Tag";
import Text from "../../Generic/Text";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTags, SET_LABELS } from "../../../redux/slices/userSlice";
import Loader from "../../Generic/Loader";

const SnippetsNavigation = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectAllTags);
  console.log({ tags });
  const axiosPrivate = useAxiosPrivate();

  const {
    data: labels,
    isLoading,
    isError,
    error,
    refetch: fetchLabels,
  } = useQuery(
    "fetch-all-labels",
    async () => {
      return await axiosPrivate.get("/api/v1/labels");
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("Labels fetch response", res);
        dispatch(SET_LABELS(res.data.found));
      },
    }
  );

  useEffect(() => {
    let mounted = true;
    mounted && fetchLabels();
    return () => (mounted = false);
  }, [false]);

  if (isLoading) {
    return <Loader color="light" />;
  }

  if (isError) {
    return <Text>Nothing found!</Text>;
  }

  return (
    <div className="flex flex-col">
      <div>
        <Text className="underline underline-offset-2">Filter by labels:</Text>
        <div className="navigation-by-labels mt-3 flex flex-col space-y-2">
          {labels &&
            labels.data.found.map((label) => (
              <Label clickable key={label._id}>
                {label.name}
              </Label>
            ))}
        </div>
      </div>

      <div className="mt-5">
        <Text className="underline underline-offset-2">
          Recently used tags:
        </Text>
        <div className="navigation-by-tags mt-2 flex items-center flex-wrap">
          {tags.slice(0, 10).map((tag) => (
            <Tag clickable className="mt-1 mr-2">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnippetsNavigation;
