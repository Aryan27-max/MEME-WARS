"use client";

import React, { useState } from "react";
import Image from "next/image";
import FanBadge from "./FanBadge";
import StickerChip from "./StickerChip";

export interface TrophyData {
  id: string;
  category: "Meme Of Match" | "Most Viral" | "Savage Roast" | "Fan Favourite" | "AI Masterpiece";
  winner: string;
  clan: "rcb" | "csk" | "mi" | "kkr" | "srh" | "neutral";
  caption: string;
  imageUrl: string;
  votes: string;
  commentCount: number;
  trophyEmoji: string;
}

interface TrophyCardProps {
  trophy: TrophyData;
}

export default function TrophyCard({ trophy }: TrophyCardProps) {
  const [celebrated, setCelebrated] = useState(false);
  const [celebrations, setCelebrations] = useState(0);

  const handleCelebrate = () => {
    setCelebrated(true);
    setCelebrations((prev) => prev + 1);
    setTimeout(() => setCelebrated(false), 1500);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Meme Of Match":
        return {
          banner: "bg-[#ffe400] text-black",
          accent: "#ffe400",
          glow: "neon-glow-yellow",
        };
      case "Most Viral":
        return {
          banner: "bg-[#d200c1] text-white",
          accent: "#d200c1",
          glow: "neon-glow-pink",
        };
      case "Savage Roast":
        return {
          banner: "bg-[#dc2626] text-white",
          accent: "#dc2626",
          glow: "neon-glow-pink",
        };
      case "Fan Favourite":
        return {
          banner: "bg-[#b4ebff] text-black",
          accent: "#b4ebff",
          glow: "neon-glow-cyan",
        };
      case "AI Masterpiece":
        default:
          return {
            banner: "bg-[#22c55e] text-white",
            accent: "#22c55e",
            glow: "neon-glow-cyan",
          };
    }
  };

  const styling = getCategoryColor(trophy.category);

  return (
    <div
      onClick={handleCelebrate}
      className={`memphis-border memphis-shadow bg-white flex flex-col relative transition-all duration-300 hover:scale-[1.03] hover:rotate-1 cursor-pointer select-none ${styling.glow}`}
    >
      {/* Confetti Explosion Layer */}
      {celebrated && (
        <div className="absolute inset-0 bg-[#ffe400]/25 z-20 flex flex-col items-center justify-center pointer-events-none animate-pulse">
          <span className="font-bangers text-4xl text-black text-3d-pink tracking-widest animate-bounce">
            🎉 CLAP CLAP 🎉
          </span>
          <span className="font-mono text-xs font-bold text-black bg-white border border-black px-2 mt-1">
            CELEBRATIONS: {celebrations}
          </span>
        </div>
      )}

      {/* Trophy Sticker Badge */}
      <div className="absolute -top-3.5 -left-3.5 z-10 animate-float">
        <StickerChip label={trophy.category} color="yellow" rotation="rotate-[-4deg]" glow />
      </div>

      {/* Category Emoji */}
      <div className="absolute top-4 right-4 z-10 w-11 h-11 bg-white memphis-border-2 rounded-full flex items-center justify-center text-2xl shadow-sm">
        {trophy.trophyEmoji}
      </div>

      {/* Image Panel */}
      <div className="relative w-full aspect-video bg-black overflow-hidden border-b-4 border-black">
        <Image
          src={trophy.imageUrl}
          alt={trophy.caption}
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none z-10" />
        
        {/* Caption Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <p className="font-russo text-base sm:text-lg text-white text-shadow-md line-clamp-2">
            "{trophy.caption}"
          </p>
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-4 bg-[#fff9ea] flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <FanBadge team={trophy.clan} initials={trophy.winner.substring(0, 2).toUpperCase()} size="sm" />
          <div>
            <div className="font-russo text-sm text-black leading-none">{trophy.winner}</div>
            <span className="font-mono text-[9px] font-bold text-black/60 uppercase">
              {trophy.clan} Banter Lord
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 border-t-2 border-black border-dashed pt-3 text-xs font-mono font-bold">
          <div>
            ⚡ VIRAL SCORE:
            <br />
            <span className="text-sm font-russo text-[#d200c1]">{trophy.votes}</span>
          </div>
          <div>
            💬 ROASTS:
            <br />
            <span className="text-sm font-russo text-black">{trophy.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
