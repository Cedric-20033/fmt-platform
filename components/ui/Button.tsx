import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/Cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#2b8a8a] text-white hover:bg-[#1a5c5c] focus-visible:ring-[#2b8a8a]",
        accent:
          "bg-[#f39237] text-white hover:bg-[#d97706] focus-visible:ring-[#f39237]",
        outline:
          "border-2 border-[#2b8a8a] text-[#2b8a8a] bg-transparent hover:bg-[#e6f4f4] focus-visible:ring-[#2b8a8a]",
        ghost:
          "text-[#2b8a8a] hover:bg-[#e6f4f4] focus-visible:ring-[#2b8a8a]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, type = "button", ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(classes, children.props.className),
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
