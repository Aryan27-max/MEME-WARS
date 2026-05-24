"use client";

import React, { useState } from "react";
import Link from "next/link";
import TrophyCard, { TrophyData } from "@/components/TrophyCard";
import StickerChip from "@/components/StickerChip";
import PixelButton from "@/components/PixelButton";

const TROPHIES: TrophyData[] = [
  {
    id: "trophy-1",
    category: "Meme Of Match",
    winner: "ThalaWhistler_7",
    clan: "csk",
    caption: "Dhoni whistling while your wickets fall. Peak cricket cinema.",
    imageUrl: "/patterns/geometric_seamless.png",
    votes: "89.2k LIKES",
    commentCount: 412,
    trophyEmoji: "🏆",
  },
  {
    id: "trophy-2",
    category: "Most Viral",
    winner: "KohliCalculator",
    clan: "rcb",
    caption: "RCB mathematical qualification engine running out of RAM in the 19th over.",
    imageUrl: "/patterns/striped.png",
    votes: "124.5k SHARES",
    commentCount: 890,
    trophyEmoji: "📈",
  },
  {
    id: "trophy-3",
    category: "Savage Roast",
    winner: "MI_Paltan_Boss",
    clan: "mi",
    caption: "Hardik walking out to bat in blue, booed in high-fidelity stereo sound.",
    imageUrl: "/patterns/halftone.png",
    votes: "52.8k BURNS",
    commentCount: 1450,
    trophyEmoji: "💀",
  },
  {
    id: "trophy-4",
    category: "Fan Favourite",
    winner: "PreitySmileFC",
    clan: "neutral",
    caption: "Smiling through the absolute pain of another super-over defeat.",
    imageUrl: "/patterns/confetti.png",
    votes: "74.1k VIBES",
    commentCount: 232,
    trophyEmoji: "❤️",
  },
  {
    id: "trophy-5",
    category: "AI Masterpiece",
    winner: "CyborgRohit",
    clan: "mi",
    caption: "Cybernetic Rohit Sharma flexing 5 golden stars inside the metaverse.",
    imageUrl: "/patterns/abstract_geometric.png",
    votes: "41.6k CYBORGS",
    commentCount: 180,
    trophyEmoji: "🤖",
  },
];

export default function HallOfFamePage() {
  const [filter, setFilter] = useState<string>("ALL");

  const filteredTrophies = filter === "ALL" 
    ? TROPHIES 
    : TROPHIES.filter(t => t.clan === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#fff9ea] flex flex-col justify-between overflow-x-hidden relative pb-16 bg-polka">
      
      {/* Floating decorations */}
      <div className="absolute top-36 left-4 w-12 h-12 border-4 border-black bg-[#ffe400] rounded-full animate-float pointer-events-none" />
      <div className="absolute top-48 right-6 w-8 h-8 border-4 border-black bg-[#d200c1] rotate-45 animate-float-reverse pointer-events-none" />

      {/* Header */}
      <header className="w-full px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 z-20">
        <Link href="/">
          <div className="flex flex-col select-none cursor-pointer">
            <h1 className="font-russo text-2xl sm:text-3xl text-black tracking-tighter uppercase text-3d-yellow leading-none">
              Gen'Z – Banter Box
            </h1>
            <span className="font-bangers text-xs sm:text-sm text-secondary tracking-widest leading-none mt-1">
              ROAST. MEME. RULE THE MATCH.
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/matches">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-white hover:bg-[#ffe400] transition-colors rotate-[-2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              🥊 MATCHES
            </div>
          </Link>
          <Link href="/studio">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-white hover:bg-[#d200c1] hover:text-white transition-colors rotate-[3deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              🎨 STUDIO
            </div>
          </Link>
          <Link href="/hall-of-fame">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#ffe400] text-black rotate-[-3deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              🏆 HALL OF FAME
            </div>
          </Link>
          <Link href="/profile">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#b4ebff] text-black hover:bg-[#ffe400] transition-colors rotate-[2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              👤 PROFILE
            </div>
          </Link>
        </nav>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 z-10">
        
        {/* Title area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StickerChip label="🏆 ROAST CHAMPS OF 2026" color="pink" rotation="rotate-[-2deg]" />
            </div>
            <h2 className="font-russo text-4xl sm:text-5xl text-black uppercase leading-none">
              BANTER HALL OF FAME
            </h2>
            <p className="font-inter font-bold text-sm text-black/60 mt-1.5">
              Highlighting the most legendary burns, viral creations, and community favorites. Click a trophy to celebrate!
            </p>
          </div>

          <div className="memphis-border bg-white px-4 py-2 font-mono text-xs font-bold shadow-[4px_4px_0px_#000] rotate-[3deg]">
            🌟 XP MULTIPLIER: <span className="text-[#ffe400]">3.0x ACTIVE</span>
          </div>
        </div>

        {/* Filter Clan row */}
        <div className="flex flex-wrap gap-2 mb-10 border-b-4 border-black pb-4">
          {["ALL", "RCB", "CSK", "MI", "NEUTRAL"].map((clan) => (
            <PixelButton
              key={clan}
              variant={filter === clan ? "secondary" : "white"}
              size="sm"
              onClick={() => setFilter(clan)}
              className="text-lg!"
            >
              {clan} CLAN
            </PixelButton>
          ))}
        </div>

        {/* Trophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTrophies.map((trophy) => (
            <TrophyCard key={trophy.id} trophy={trophy} />
          ))}
        </div>

      </main>
    </div>
  );
}
