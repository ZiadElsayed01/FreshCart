import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const CheckboxContext = React.createContext({
  checked: false,
  onCheckedChange: () => {},
})

const Checkbox = ({ checked: controlledChecked, onCheckedChange, defaultChecked = false, className, ...props }) => {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : uncontrolledChecked
  
  const handleCheckedChange = (newChecked) => {
    if (!isControlled) {
      setUncontrolledChecked(newChecked)
    }
    onCheckedChange?.(newChecked)
  }
  
  return (
    <CheckboxContext.Provider value={{ checked, onCheckedChange: handleCheckedChange }}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary text-primary-foreground" : "bg-background",
          className
        )}
        onClick={() => handleCheckedChange(!checked)}
        {...props}
      >
        {checked && (
          <Check className="h-4 w-4" />
        )}
      </button>
    </CheckboxContext.Provider>
  )
}

export { Checkbox }
