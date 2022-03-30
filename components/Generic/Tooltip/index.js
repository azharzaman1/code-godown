import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const Tooltip = ({ content, children, className, ...rest }) => {
  // dark:border-dividerColorDark dark:text-secondaryTextDark dark:bg-backgroundContrastDark
  return (
    <TooltipPrimitive.Root delayDuration={250}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side="top"
        aria-live="assertive"
        className={`max-w-[90vw] px-3 py-1 text-xs md:text-sm text-secondaryText bg-white rounded-lg border border-dividerColor tooltip-shadow ${className}`}
        {...rest}
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-white" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};

export default Tooltip;
