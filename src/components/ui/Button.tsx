import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg" | "full";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-black text-white hover:bg-gold hover:text-white shadow-lg",
      outline: "border border-black bg-transparent hover:bg-black hover:text-white",
      ghost: "bg-transparent hover:bg-gray-100",
      gold: "bg-gold text-white hover:bg-black hover:text-white shadow-[0_10px_30px_rgba(212,175,55,0.3)]",
    };

    const sizes = {
      sm: "px-6 py-3 text-[10px]",
      md: "px-10 py-4 text-[11px]",
      lg: "px-12 py-5 text-[12px]",
      full: "w-full py-4 text-[11px]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "uppercase tracking-[0.2em] font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
