import React, { useRef, useState, useCallback } from "react";

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
  glowColor = "rgba(15, 23, 42, 0.04)",
  tiltIntensity = 1.5,
  elevation = "medium",
  interactive = true,
  ...props
}: SpatialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !cardRef.current || window.innerWidth < 768) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Ultra-subtle, executive tilt (max 1.5deg) for clean professional feel
      const rotX = -((y - centerY) / centerY) * Math.min(tiltIntensity, 1.5);
      const rotY = ((x - centerX) / centerX) * Math.min(tiltIntensity, 1.5);

      setRotateX(rotX);
      setRotateY(rotY);
    },
    [interactive, tiltIntensity]
  );

  const handleMouseEnter = () => {
    if (interactive && window.innerWidth >= 768) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const elevationClasses =
    elevation === "high"
      ? "shadow-[0_8px_24px_-4px_rgba(15,23,42,0.07),0_2px_6px_-1px_rgba(15,23,42,0.03)] border-border/80"
      : elevation === "low"
      ? "shadow-[0_1px_3px_rgba(15,23,42,0.03)] border-border/60"
      : "shadow-[0_4px_16px_-3px_rgba(15,23,42,0.05),0_1px_4px_-1px_rgba(15,23,42,0.02)] border-border/70";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out ${elevationClasses} ${
        interactive ? "hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(15,23,42,0.09)]" : ""
      } ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
          : "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

