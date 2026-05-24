import React from "react";
import Image from "next/image";

interface FanBadgeProps {
  team?: "rcb" | "csk" | "mi" | "kkr" | "srh" | "neutral";
  initials?: string;
  avatarUrl?: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function FanBadge({
  team = "neutral",
  initials = "GZ",
  avatarUrl,
  online = false,
  size = "md",
  className = "",
}: FanBadgeProps) {
  const teamBorderColors = {
    rcb: "border-[#dc2626] neon-glow-pink",
    csk: "border-[#facc15] neon-glow-yellow",
    mi: "border-[#1d4ed8] neon-glow-cyan",
    kkr: "border-[#581c87] neon-glow-pink",
    srh: "border-[#f97316] neon-glow-yellow",
    neutral: "border-[#000000]",
  };

  const sizeStyles = {
    sm: "w-8 h-8 text-xs border-2",
    md: "w-11 h-11 text-base border-2",
    lg: "w-16 h-16 text-xl border-4",
  };

  return (
    <div className="relative inline-block select-none">
      <div
        className={`rounded-full overflow-hidden flex items-center justify-center font-russo uppercase bg-white text-black border-black ${sizeStyles[size]} ${teamBorderColors[team]} ${className}`}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={initials}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {online && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full border border-black bg-[#22c55e] ${
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4.5 h-4.5"
          }`}
        />
      )}
    </div>
  );
}
