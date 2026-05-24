"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeroCarousel, { CLANS, Clan } from "@/components/HeroCarousel";
import StickerChip from "@/components/StickerChip";
import PixelButton from "@/components/PixelButton";

export default function Home() {
  const [selectedClan, setSelectedClan] = useState<Clan>(CLANS[0]);

  // Glow theme selector based on clan
  const getThemeBg = (clanId: string) => {
    switch (clanId) {
      case "rcb":
        return "from-[#dc2626]/20 via-[#ffe400]/5 to-[#fff9ea]";
      case "csk":
        return "from-[#facc15]/20 via-[#1d4ed8]/5 to-[#fff9ea]";
      case "mi":
        return "from-[#1d4ed8]/20 via-[#d200c1]/5 to-[#fff9ea]";
      case "kkr":
        return "from-[#581c87]/20 via-[#ffe400]/5 to-[#fff9ea]";
      case "srh":
        return "from-[#f97316]/20 via-[#000000]/5 to-[#fff9ea]";
      default:
        return "from-[#d200c1]/10 via-[#ffe400]/5 to-[#fff9ea]";
    }
  };

  const getAccentBorder = (clanId: string) => {
    switch (clanId) {
      case "rcb":
        return "border-[#dc2626]";
      case "csk":
        return "border-[#facc15]";
      case "mi":
        return "border-[#1d4ed8]";
      case "kkr":
        return "border-[#581c87]";
      case "srh":
        return "border-[#f97316]";
      default:
        return "border-black";
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getThemeBg(selectedClan.id)} transition-colors duration-500 flex flex-col justify-between overflow-x-hidden relative pb-12`}>
      
      {/* Background Grid Lines Overlay */}
      <div className="absolute inset-0 bg-grid-line opacity-5 pointer-events-none" />

      {/* Floating Stickers on Landing Corners */}
      <div className="absolute top-24 left-6 hidden lg:block animate-float">
        <StickerChip label="💥 NO COPE ZONE" color="pink" rotation="rotate-[-6deg]" />
      </div>
      <div className="absolute top-36 right-10 hidden lg:block animate-float-reverse">
        <StickerChip label="🤫 TRASH TALK ONLY" color="yellow" rotation="rotate-[8deg]" glow />
      </div>
      <div className="absolute bottom-28 left-16 hidden lg:block animate-float">
        <StickerChip label="IPL 2026 ARENA" color="cyan" rotation="rotate-[4deg]" />
      </div>

      {/* Main Header / Navigation */}
      <header className="w-full px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 z-20">
        <Link href="/">
          <div className="flex flex-col items-center md:items-start select-none cursor-pointer">
            <h1 className="font-russo text-3xl sm:text-4xl text-black tracking-tighter uppercase text-3d-yellow leading-none">
              Gen'Z – Banter Box
            </h1>
            <span className="font-bangers text-sm sm:text-base text-secondary tracking-widest leading-none mt-1">
              ROAST. MEME. RULE THE MATCH.
            </span>
          </div>
        </Link>

        {/* Navigation Tabs (Sticker style) */}
        <nav className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/matches">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-white hover:bg-[#ffe400] transition-colors rotate-[-2deg] hover:rotate-1 shadow-[3px_3px_0px_#000] cursor-pointer select-none active:translate-y-[2px]">
              🥊 MATCHES
            </div>
          </Link>
          <Link href="/studio">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-white hover:bg-[#d200c1] hover:text-white transition-colors rotate-[3deg] hover:rotate-[-1deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none active:translate-y-[2px]">
              🎨 STUDIO
            </div>
          </Link>
          <Link href="/hall-of-fame">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#ffe400] text-black hover:bg-black hover:text-white transition-colors rotate-[-3deg] hover:rotate-[2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none active:translate-y-[2px]">
              🏆 HALL OF FAME
            </div>
          </Link>
          <Link href="/profile">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#b4ebff] text-black hover:bg-[#ffe400] transition-colors rotate-[2deg] hover:rotate-[-2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none active:translate-y-[2px]">
              👤 PROFILE
            </div>
          </Link>
        </nav>
      </header>

      {/* Hero Body Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 flex flex-col items-center justify-center gap-8 py-8 z-10">
        
        {/* Intro Taglines */}
        <div className="text-center flex flex-col items-center max-w-2xl">
          <div className="flex gap-2.5 mb-3.5">
            <span className="bg-black text-[#ffe400] text-xs font-mono font-bold px-2 py-0.5 border border-black uppercase rotate-[-2deg]">
              CRICKET FAN CLASH
            </span>
            <span className="bg-[#d200c1] text-white text-xs font-mono font-bold px-2 py-0.5 border border-black uppercase rotate-[3deg]">
              BETA VERSION
            </span>
          </div>

          <h2 className="font-russo text-5xl sm:text-6xl lg:text-7xl text-black leading-[0.9] uppercase tracking-tight mb-4">
            ROAST.<br />
            MEME.<br />
            <span className="text-3d-pink">RULE THE MATCH.</span>
          </h2>
          
          <p className="font-inter font-bold text-base sm:text-lg text-black/80 max-w-md mt-2 leading-relaxed">
            Choose your IPL banter mascot below, join active match battlegrounds, and draft the most savage memes in our studio to silence the rival fans.
          </p>
        </div>

        {/* Exact Character Carousel */}
        <div className="w-full mt-4">
          <HeroCarousel
            onSelectClan={setSelectedClan}
            onJoinMatch={() => window.location.href = "/matches"}
            onExploreMemes={() => window.location.href = "/hall-of-fame"}
          />
        </div>

        {/* Quick CTA Block */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
          <Link href="/matches" className="flex-1 flex">
            <PixelButton variant="secondary" size="lg" className="w-full flex-1" glow>
              JOIN MATCH ROOM 🥊
            </PixelButton>
          </Link>
          <Link href="/studio" className="flex-1 flex">
            <PixelButton variant="white" size="lg" className="w-full flex-1">
              CREATE MEMES 🎨
            </PixelButton>
          </Link>
        </div>
      </main>

      {/* Marquee Footer */}
      <footer className="w-full mt-8 border-t-4 border-b-4 border-black bg-[#ffe400] py-3.5 z-20 overflow-hidden relative select-none">
        <div className="absolute inset-0 bg-repeat bg-center opacity-5 bg-grid-line" />
        <div className="animate-marquee text-black font-russo text-lg uppercase tracking-wider flex gap-8">
          <span>RCB VS CSK Live arena active now! 🔥</span>
          <span>•</span>
          <span>Dhoni whistles in the nets 🤫</span>
          <span>•</span>
          <span>Kohli roasting bowler configs 💀</span>
          <span>•</span>
          <span>Choose your clan and deploy memes now! 🥊</span>
          <span>•</span>
          <span>Warning: extreme burn levels predicted! 🔥</span>
          <span>•</span>
          <span>Savage roasters climbing the leaderboard XP! ⚡</span>
          <span>•</span>
          <span>RCB VS CSK Live arena active now! 🔥</span>
          <span>•</span>
          <span>Dhoni whistles in the nets 🤫</span>
          <span>•</span>
          <span>Kohli roasting bowler configs 💀</span>
          <span>•</span>
          <span>Choose your clan and deploy memes now! 🥊</span>
          <span>•</span>
          <span>Warning: extreme burn levels predicted! 🔥</span>
        </div>
      </footer>
    </div>
  );
}
