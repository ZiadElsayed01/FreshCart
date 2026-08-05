import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

const Dialog = ({ open, onOpenChange, children, className }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ className, children }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
  >
    {children}
  </div>
);

const DialogTitle = ({ className, children }) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
  >
    {children}
  </h2>
);

const DialogDescription = ({ className, children }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
);

const DialogContent = ({ className, children, onClose }) => (
  <div className={cn("relative", className)}>
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

const DialogFooter = ({ className, children }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
  >
    {children}
  </div>
);

Dialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

DialogHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

DialogTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

DialogDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

DialogContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

DialogFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
};
