import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className,
  containerClassName,
  id,
  size = "md",
}, ref) => {
  const paddings = {
    sm: "py-12 lg:py-16",
    md: "py-20 lg:py-24",
    lg: "py-24 lg:py-32",
    xl: "py-32 lg:py-48",
  };

  return (
    <section id={id} ref={ref} className={cn(paddings[size], className)}>
      <div className={cn("max-w-7xl mx-auto px-6 lg:px-12", containerClassName)}>
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";
