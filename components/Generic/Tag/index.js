import { Tag as TagIcon } from "@mui/icons-material";

const Tag = ({ children, clickable, className }) => {
  return (
    <div
      className={`${className} flex items-center text-sm md:text-base text-secondaryText dark:text-secondaryTextDark hover:text-primary dark:hover:text-primary hover:underline underline-offset-2  ${
        clickable && "cursor-pointer transition-colors duration-75"
      }`}
    >
      <span>
        <TagIcon fontSize="small" />
      </span>
      <span>{children}</span>
    </div>
  );
};

export default Tag;
