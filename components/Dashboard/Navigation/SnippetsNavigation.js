import React from "react";
import Label from "../../Generic/Label";
import Tag from "../../Generic/Tag";
import Text from "../../Generic/Text";

const Tags = ["Code Godown", "MVC", "Node", "mern"];

const SnippetsNavigation = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Text className="underline underline-offset-2">Filter by labels:</Text>
        <div className="navigation-by-labels mt-3 flex flex-col space-y-2">
          <Label clickable>Frontend</Label>
          <Label clickable>Backend</Label>
        </div>
      </div>

      <div className="mt-5">
        <Text className="underline underline-offset-2">
          Recently used tags:
        </Text>
        <div className="navigation-by-tags mt-2 flex items-center flex-wrap">
          {Tags.map((tag) => (
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
