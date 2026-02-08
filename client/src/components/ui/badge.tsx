import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(

  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover-elevate ",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        // Destructive variant style
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",

        // Outline variant style
        outline: " border [border-color:var(--badge-outline)] shadow-xs",
      },
    },
    // Default variants configuration
    defaultVariants: {
      // Default to "default" variant
      variant: "default",
    },
  },
)

// Props interface for Badge
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

// Main Badge component
function Badge({ className, variant, ...props }: BadgeProps) {
  // Render the badge element
  return (
    <div className={cn(badgeVariants({ variant }), className /* Merge custom classes */)} {...props /* Spread rest props */} />
  );
}

// Export component and variants
export { Badge, badgeVariants }
