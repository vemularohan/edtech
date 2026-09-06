import React from "react";

interface SpatialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
  tiltIntensity?: number;
  elevation?: "low" | "medium" | "high";
  interactive?: boolean;
}

export function SpatialCard({
  children,
  className = "",
  depth = 4,
  glowColor,
  tiltIntensity,
  elevation = "medium",
  interactive = true,
  ...props
}: SpatialCardProps) {
  const elevationClasses =
    elevation === "high"
      ? "shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] border-border/80"
      : elevation === "low"
      ? "shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-border/60"
      : "shadow-[0_4px_16px_-3px_rgba(15,23,42,0.05),0_1px_4px_-1px_rgba(15,23,42,0.02)] border-border/70";

  return (
    <div
      className={`relative transition-all duration-200 ease-out ${elevationClasses} ${
        interactive
          ? "hover:border-border/90 hover:shadow-[0_6px_20px_-4px_rgba(15,23,42,0.08)]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}


