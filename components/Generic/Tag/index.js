import { Tag as TagIcon } from "@mui/icons-material";

const Tag = ({ children }) => {
  return (
    <div className="mt-1 mr-2 flex items-center text-sm md:text-base text-secondaryText dark:text-secondaryTextDark hover:text-primary dark:hover:text-primary hover:underline underline-offset-2">
      <span>
        <TagIcon fontSize="small" />
      </span>
      <span>{children}</span>
    </div>
  );
};

export default Tag;
