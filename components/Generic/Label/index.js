import { LocalOfferOutlined } from "@mui/icons-material";

const Label = ({ children, clickable }) => {
  return (
    <div
      className={` ${
        clickable &&
        "cursor-pointer hover:text-primary hover:dark:text-primary transition-colors duration-75"
      }flex items-center space-x-1 text-secondaryText dark:text-secondaryTextDark`}
    >
      <span>
        <LocalOfferOutlined fontSize="small" />
      </span>
      <span>{children}</span>
    </div>
  );
};

export default Label;
