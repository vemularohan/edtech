import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-[0.5px] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#0F766E] text-white shadow-[0_1px_2px_rgba(11,31,42,0.08),0_2px_4px_rgba(15,118,110,0.2)] hover:bg-[#0d655e] hover:shadow-[0_4px_12px_rgba(15,118,110,0.25)]",
        destructive: "bg-[#DC2626] text-white shadow-sm hover:bg-[#b91c1c]",
        outline:
          "border border-[#DCE7E5] bg-white text-[#102A33] shadow-[0_1px_2px_rgba(11,31,42,0.03)] hover:bg-[#F0F5F4] hover:border-[#0F766E]/40 hover:text-[#0F766E]",
        secondary: "bg-[#F0F5F4] text-[#0B1F2A] border border-[#DCE7E5] hover:bg-[#e4edea]",
        ghost: "text-[#102A33] hover:bg-[#F0F5F4] hover:text-[#0F766E]",
        link: "text-[#0F766E] underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-4 py-2 sm:h-9 sm:min-h-0",
        sm: "min-h-11 rounded-md px-3 text-xs sm:h-8 sm:min-h-0",
        lg: "min-h-11 rounded-md px-8 sm:h-10 sm:min-h-0",
        icon: "size-11 sm:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
