import React from "react";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "rcb" | "csk" | "mi" | "kkr" | "srh" | "white";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export default function PixelButton({
  children,
  variant = "primary",
  size = "md",
  glow = false,
  className = "",
  ...props
}: PixelButtonProps) {
  const baseStyles =
    "font-bangers uppercase tracking-wider memphis-border memphis-shadow-sm select-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-75 inline-flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-lg",
    md: "px-6 py-2.5 text-2xl",
    lg: "px-8 py-4 text-3xl",
  };

  const variantStyles = {
    primary: "bg-[#ffe400] text-black hover:bg-[#ffe830]",
    secondary: "bg-[#d200c1] text-white hover:bg-[#e038d2]",
    tertiary: "bg-[#b4ebff] text-black hover:bg-[#cbf1ff]",
    rcb: "bg-[#dc2626] text-white hover:bg-[#ef4444]",
    csk: "bg-[#facc15] text-black hover:bg-[#fde047]",
    mi: "bg-[#1d4ed8] text-white hover:bg-[#2563eb]",
    kkr: "bg-[#581c87] text-white hover:bg-[#7e22ce]",
    srh: "bg-[#f97316] text-white hover:bg-[#fb923c]",
    white: "bg-white text-black hover:bg-zinc-100",
  };

  const glowStyles = glow ? "neon-glow-pink animate-pulse" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
