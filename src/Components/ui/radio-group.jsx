import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext({
  value: "",
  onValueChange: () => {},
})

const RadioGroup = ({ value, onValueChange, className, children, ...props }) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

const RadioGroupItem = ({ value, className, id, ...props }) => {
  const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext)
  const isChecked = selectedValue === value
  
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="radio"
        aria-checked={isChecked}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isChecked ? "bg-primary text-primary-foreground" : "bg-background"
        )}
        onClick={() => onValueChange(value)}
        id={id}
        {...props}
      >
        {isChecked && (
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
          </div>
        )}
      </button>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
