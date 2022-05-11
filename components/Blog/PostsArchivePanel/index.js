import { DeleteSweep } from "@mui/icons-material";
import Button from "../../Generic/Button";
import Heading from "../../Generic/Heading";
import Text from "../../Generic/Text";

const PostsArchivePanel = () => {
  const handleAddNewPost = () => {};

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-5 my-7">
        {/* <DeleteSweep
          sx={{
            fontSize: 100,
            color: "lightgray",
          }}
        /> */}
        <Heading type="secondary">Blog Coming Soon</Heading>
        {/* <Text>Blog Coming Soon</Text> */}
        {/* <Button type="text" onClick={handleAddNewPost}>
          Publish Something Cool
        </Button> */}
      </div>
    </div>
  );
};

export default PostsArchivePanel;
