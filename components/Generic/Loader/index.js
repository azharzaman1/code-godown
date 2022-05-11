import Text from "../Text";

const Loader = ({
  type = 2,
  size = "medium",
  className,
  label,
  color = "primary",
}) => {
  const sizes = {
    small: "w-6 h-6 small",
    medium: "w-9 h-9 medium",
    large: "w-12 h-12 large",
  };

  if (!type || type == 1) {
    return (
      <div className="flex flex-col items-center">
        <div
          class={`square-loader inline-block relative w-20 h-20 ${className}`}
        >
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
          <div className="bg-primary w-4 h-4 rounded-tr-md rounded-bl-md absolute"></div>
        </div>
        {label && <Text className="mt-3">{label}</Text>}
      </div>
    );
  }

  if (type == 2) {
    return (
      <div className="flex flex-col items-center">
        <div
          class={`dot-spinner-${color} ${sizes[size]} rounded-full p-[3px] ${className}`}
        />
        {label && <Text className="mt-3">{label}</Text>}
      </div>
    );
  }
};

export default Loader;
