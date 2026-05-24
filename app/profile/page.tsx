"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MemeCard, { MemeData } from "@/components/MemeCard";
import FanBadge from "@/components/FanBadge";
import StickerChip from "@/components/StickerChip";
import RetroWindow from "@/components/RetroWindow";
import PixelButton from "@/components/PixelButton";

const USER_BADGES = [
  { label: "🔥 SAVAGE ROASTER", color: "pink" as const, desc: "Posted a meme with 100+ net score." },
  { label: "🤫 SILENCER", color: "yellow" as const, desc: "Successfully cheer-boosted an active battle." },
  { label: "🎨 MEME MACHINE", color: "cyan" as const, desc: "Created and deployed 3+ canvas models." },
  { label: "👑 ELITE LORD", color: "purple" as const, desc: "Earned 5000+ total battle XP." },
];

export default function ProfilePage() {
  const [createdMemes, setCreatedMemes] = useState<MemeData[]>([]);

  useEffect(() => {
    // Load studio created memes from localStorage
    try {
      const storedMemeStr = localStorage.getItem("genz_studio_memes");
      if (storedMemeStr) {
        const stored = JSON.parse(storedMemeStr) as MemeData[];
        setCreatedMemes(stored);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fff9ea] flex flex-col justify-between overflow-x-hidden relative pb-16 bg-polka">
      
      {/* Background shapes */}
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
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-white hover:bg-black hover:text-white transition-colors rotate-[-3deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              🏆 HALL OF FAME
            </div>
          </Link>
          <Link href="/profile">
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#ffe400] text-black rotate-[2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              👤 PROFILE
            </div>
          </Link>
        </nav>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: User Card & Progress (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* User Profile Info */}
          <RetroWindow title="USER STATUS" headerBg="bg-primary-container">
            <div className="p-6 bg-white flex flex-col items-center text-center bg-polka">
              
              {/* Large Avatar */}
              <FanBadge team="rcb" initials="ML" size="lg" online className="mb-4" />

              <h2 className="font-russo text-2xl text-black leading-none mb-1">
                MEMELORD_GZ
              </h2>
              <span className="font-mono text-xs font-bold text-black/50 uppercase mb-4">
                👑 RCB CLAN CAPTAIN
              </span>

              {/* Progress Level bar */}
              <div className="w-full text-left font-mono text-xs mb-4">
                <div className="flex justify-between font-bold mb-1.5">
                  <span>LEVEL 14: SPECIALIST</span>
                  <span>780 / 1000 XP</span>
                </div>
                <div className="w-full h-5 border-2 border-black bg-white overflow-hidden p-0.5">
                  <div className="h-full bg-[#d200c1] neon-glow-pink transition-all" style={{ width: "78%" }} />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 w-full border-t-2 border-black border-dashed pt-4 font-mono text-[10px] font-bold">
                <div className="bg-[#f4eeda] border border-black p-2 rounded-none">
                  ⚔️ BATTLES
                  <br />
                  <span className="font-russo text-sm text-[#d200c1]">42</span>
                </div>
                <div className="bg-[#f4eeda] border border-black p-2 rounded-none">
                  🏆 WINS
                  <br />
                  <span className="font-russo text-sm text-black">28</span>
                </div>
                <div className="bg-[#f4eeda] border border-black p-2 rounded-none">
                  🖼️ MEMES
                  <br />
                  <span className="font-russo text-sm text-[#6b5f00]">{createdMemes.length}</span>
                </div>
              </div>

            </div>
          </RetroWindow>

          {/* Badges and Unlock achievements */}
          <RetroWindow title="ACHIEVED BADGES" headerBg="bg-secondary" className="memphis-shadow-pink">
            <div className="bg-white p-4 flex flex-col gap-3">
              {USER_BADGES.map((badge) => (
                <div key={badge.label} className="flex items-start gap-3 border-b border-black/10 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-xl">🎖️</span>
                  <div>
                    <StickerChip label={badge.label} color={badge.color} rotation="rotate-[0deg]" className="py-0.5 text-xs!" />
                    <p className="font-inter text-xs text-black/75 mt-1 font-semibold">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RetroWindow>
        </div>

        {/* RIGHT COLUMN: Personal Meme Studio History (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="memphis-border bg-white p-4 flex items-center justify-between memphis-shadow-sm">
            <h2 className="font-russo text-2xl text-black uppercase leading-none">
              MY MEME GALLERY ({createdMemes.length})
            </h2>
            <Link href="/studio">
              <PixelButton variant="primary" size="sm">
                ➕ DESIGN NEW MEME
              </PixelButton>
            </Link>
          </div>

          {/* Meme list grid */}
          {createdMemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {createdMemes.map((meme) => (
                <MemeCard key={meme.id} meme={meme} />
              ))}
            </div>
          ) : (
            <div className="memphis-border bg-white p-12 text-center memphis-shadow bg-polka">
              <span className="text-5xl block mb-4">🎨</span>
              <h3 className="font-russo text-xl text-black uppercase mb-1">NO MEMES IN GALLERY</h3>
              <p className="font-mono text-xs font-bold text-black/60 mb-6 uppercase">
                YOU HAVEN'T DEPLOYED ANY MEMES FROM THE CANVAS YET.
              </p>
              <Link href="/studio">
                <PixelButton variant="secondary" size="sm">
                  LAUNCH STUDIO NOW 🚀
                </PixelButton>
              </Link>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
