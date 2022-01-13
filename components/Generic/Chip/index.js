const Chip = ({ children, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`border text-xs py-1 px-2 rounded-sm ${
        onClick && "cursor-pointer select-none"
      }`}
    >
      {children}
    </span>
  );
};

export default Chip;
