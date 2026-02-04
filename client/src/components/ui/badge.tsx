// Shadcn Badge Component
import * as React from "react"
// Import cva for variant management
import { cva, type VariantProps } from "class-variance-authority"

// Utility for class merging
import { cn } from "@/lib/utils"

// Badge variants configuration
const badgeVariants = cva(

  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover-elevate ",
  {
    variants: {
      // Style definitions for different badge variants
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        // Secondary variant style
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
      variant: "default",
    },
  },
)

// Props interface for Badge
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  // Render the badge element
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Export component and variants
export { Badge, badgeVariants }
