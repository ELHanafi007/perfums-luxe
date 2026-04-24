import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  size = "md",
}: SectionProps) {
  const paddings = {
    sm: "py-12 lg:py-16",
    md: "py-20 lg:py-24",
    lg: "py-24 lg:py-32",
    xl: "py-32 lg:py-48",
  };

  return (
    <section id={id} className={cn(paddings[size], className)}>
      <div className={cn("max-w-7xl mx-auto px-6 lg:px-12", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
