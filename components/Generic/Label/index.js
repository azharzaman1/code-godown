import { LocalOfferOutlined } from "@mui/icons-material";

const Label = ({ children }) => {
  return (
    <div className="flex items-center space-x-1">
      <span>
        <LocalOfferOutlined fontSize="small" />
      </span>
      <span>{children}</span>
    </div>
  );
};

export default Label;
