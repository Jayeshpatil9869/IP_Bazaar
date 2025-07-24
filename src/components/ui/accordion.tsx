import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type AccordionContextValue = {
  value?: string
  onValueChange?: (value: string) => void
  type: "single" | "multiple"
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  collapsible?: boolean
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type, value, defaultValue, onValueChange, collapsible, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      type === "single" ? (defaultValue as string) || "" : ""
    )

    const currentValue = value !== undefined ? (value as string) : internalValue

    const handleValueChange = React.useCallback((newValue: string) => {
      if (type === "single") {
        const nextValue = currentValue === newValue && collapsible ? "" : newValue
        setInternalValue(nextValue)
        onValueChange?.(nextValue as any)
      }
    }, [currentValue, collapsible, onValueChange, type])

    return (
      <AccordionContext.Provider
        value={{
          value: currentValue,
          onValueChange: handleValueChange,
          type,
          collapsible,
        }}
      >
        <div ref={ref} className={className} {...props} />
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
  <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)

  return (
    <button
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={() => context?.onValueChange?.(item?.value || "")}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionItemContext = React.createContext<{ value: string } | null>(null)

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  
  const isOpen = context?.value === item?.value

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up",
        className
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", isOpen ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

// Update AccordionItem to provide context
const AccordionItemWithContext = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ value, children, ...props }, ref) => (
  <AccordionItemContext.Provider value={{ value }}>
    <AccordionItem ref={ref} value={value} {...props}>
      {children}
    </AccordionItem>
  </AccordionItemContext.Provider>
))

export { Accordion, AccordionItemWithContext as AccordionItem, AccordionTrigger, AccordionContent }
