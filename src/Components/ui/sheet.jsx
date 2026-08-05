import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

const Sheet = ({ open, onOpenChange, children, className, side = "right" }) => {
  if (!open) return null;

  const sideClasses = {
    right: "right-0 h-full w-[300px] sm:w-[400px]",
    left: "left-0 h-full w-[300px] sm:w-[400px]",
    top: "top-0 h-[300px] w-full",
    bottom: "bottom-0 h-[300px] w-full",
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "fixed z-50 border bg-background p-6 shadow-lg transition-all",
          sideClasses[side],
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const SheetHeader = ({ className, children }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
  >
    {children}
  </div>
);

const SheetTitle = ({ className, children }) => (
  <h2 className={cn("text-lg font-semibold text-foreground", className)}>
    {children}
  </h2>
);

const SheetDescription = ({ className, children }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
);

const SheetContent = ({ className, children, onClose }) => (
  <div className={cn("relative h-full flex flex-col", className)}>
    {onClose && (
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    )}
    {children}
  </div>
);

Sheet.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  side: PropTypes.oneOf(["right", "left", "top", "bottom"]),
};

SheetHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

SheetTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

SheetDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

SheetContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetContent };
