import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const Tooltip = ({ content, children, className, ...rest }) => {
  return (
    <TooltipPrimitive.Root delayDuration={250} className={`${className}`}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        aria-live="assertive"
        className="w-[250px] max-w-[90vw] p-3 text-xs md:text-sm text-secondaryText dark:text-secondaryTextDark bg-white dark:bg-backgroundContrastDark shadow-xl rounded-lg border border-dividerColor dark:border-dividerColorDark"
        {...rest}
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-white" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};

export default Tooltip;
