import * as React from "react"
import PropTypes from "prop-types"
import { cn } from "../../lib/utils"

const Toast = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border bg-background p-4 shadow-lg transition-all",
      className
    )}
    {...props}
  />
))
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

Toast.propTypes = {
  className: PropTypes.string,
}

ToastTitle.propTypes = {
  className: PropTypes.string,
}

ToastDescription.propTypes = {
  className: PropTypes.string,
}

export { Toast, ToastTitle, ToastDescription }
