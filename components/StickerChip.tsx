import React from "react";

interface StickerChipProps {
  label: string;
  color?: "pink" | "yellow" | "cyan" | "red" | "purple" | "green" | "orange";
  rotation?: string;
  glow?: boolean;
  className?: string;
}

export default function StickerChip({
  label,
  color = "pink",
  rotation = "rotate-[-3deg]",
  glow = false,
  className = "",
}: StickerChipProps) {
  const colorStyles = {
    pink: "bg-[#d200c1] text-white",
    yellow: "bg-[#ffe400] text-black",
    cyan: "bg-[#b4ebff] text-black",
    red: "bg-[#dc2626] text-white",
    purple: "bg-[#581c87] text-white",
    green: "bg-[#22c55e] text-white",
    orange: "bg-[#f97316] text-white",
  };

  const glowStyles = glow ? "neon-glow-pink animate-pulse" : "";

  return (
    <div
      className={`inline-block px-3 py-1 font-bangers uppercase text-base tracking-wider memphis-border-2 ${rotation} ${colorStyles[color]} ${glowStyles} shadow-[2px_2px_0px_0px_#000] select-none ${className}`}
    >
      {label}
    </div>
  );
}
