// Badge component for displaying status and labels
// React core library
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// Utility function for class name management
import { cn } from "@/lib/utils"

// Define badge style variants
const badgeVariants = cva(

  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover-elevate ",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",

        outline: " border [border-color:var(--badge-outline)] shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// Props interface for Badge
// Extend HTML attributes and variant props
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

// Main Badge component
// Functional component implementation
function Badge({ className, variant, ...props }: BadgeProps) {
  // Render the badge element
  return (
    <div className={cn(badgeVariants({ variant }), className /* Merge custom classes */)} {...props /* Spread rest props */} />
  );
}

// Export component and variants
// Exporting for use in other components
export { Badge, badgeVariants }
