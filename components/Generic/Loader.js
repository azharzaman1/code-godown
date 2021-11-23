const Loader = ({ className, label }) => {
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
};

export default Loader;
