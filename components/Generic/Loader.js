const Loader = ({ type, sm, className, label, color = "primary" }) => {
  if (!type || type == 1) {
    return (
      <div className="flex flex-col items-center">
        <div class={`square-loader ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {label && <div className="text mt-3">{label}</div>}
      </div>
    );
  }

  if (type == 2) {
    return (
      <div
        class={`dot-spinner-${color} ${
          sm ? "w-8 h-8" : "w-12 h-12"
        } rounded-full p-[3px] ${className}`}
      />
    );
  }
};

export default Loader;
