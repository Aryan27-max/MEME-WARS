"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PixelButton from "./PixelButton";
import StickerChip from "./StickerChip";
import RetroWindow from "./RetroWindow";

export interface Clan {
  id: "rcb" | "csk" | "mi" | "kkr" | "srh";
  name: string;
  mascotName: string;
  tagline: string;
  quote: string;
  color: string;
  accentColor: string;
  textColor: string;
  bgColor: string;
  image: string;
  pattern: string;
  stats: {
    strength: string;
    roastRating: string;
    wins: number;
    fans: string;
  };
}

export const CLANS: Clan[] = [
  {
    id: "rcb",
    name: "RCB Bolters",
    mascotName: "Bold King Lion",
    tagline: "ROAST HARD. LOSE ZERO.",
    quote: "Ee Sala Cup Namde - and this time it's not a meme! We live rent-free in every opponent's feed. 🦁",
    color: "bg-[#dc2626]",
    accentColor: "#ffe400",
    textColor: "text-[#dc2626]",
    bgColor: "bg-red-50",
    image: "/mascots/rcb.png",
    pattern: "/patterns/striped.png",
    stats: {
      strength: "Unmatched Loyalty",
      roastRating: "Savage (9.8/10)",
      wins: 104,
      fans: "2.4M",
    },
  },
  {
    id: "csk",
    name: "CSK Whistlers",
    mascotName: "Super King Lion",
    tagline: "WHISTLE PODU. TALK SILENT.",
    quote: "Dhoni's strike rate is faster than your team's relevance. We don't scream, our trophies do. 🤫",
    color: "bg-[#facc15]",
    accentColor: "#1d4ed8",
    textColor: "text-[#facc15]",
    bgColor: "bg-yellow-50",
    image: "/mascots/csk.png",
    pattern: "/patterns/geometric_seamless.png",
    stats: {
      strength: "Tactical Masterclass",
      roastRating: "Calculated (8.5/10)",
      wins: 142,
      fans: "3.1M",
    },
  },
  {
    id: "mi",
    name: "MI Paltan",
    mascotName: "Cyber Rohit Paltan",
    tagline: "FIVE STARS. ZERO COPE.",
    quote: "We don't count individual runs, we count dynastic championships. 5 Trophies. Bow down. 🤖",
    color: "bg-[#1d4ed8]",
    accentColor: "#d200c1",
    textColor: "text-[#1d4ed8]",
    bgColor: "bg-blue-50",
    image: "/mascots/mi.png",
    pattern: "/patterns/halftone.png",
    stats: {
      strength: "Championship DNA",
      roastRating: "Arrogant (9.0/10)",
      wins: 138,
      fans: "2.8M",
    },
  },
  {
    id: "kkr",
    name: "KKR Knights",
    mascotName: "Gold Sword Knight",
    tagline: "KORBO JITBO. ALWAYS.",
    quote: "Savage roasts are our official strategy. We conquer fields and feeds with Shah Rukh vibes. 👑",
    color: "bg-[#581c87]",
    accentColor: "#facc15",
    textColor: "text-[#581c87]",
    bgColor: "bg-purple-50",
    image: "/mascots/kkr.png",
    pattern: "/patterns/abstract_geometric.png",
    stats: {
      strength: "Extreme Banter",
      roastRating: "Ruthless (9.5/10)",
      wins: 120,
      fans: "1.9M",
    },
  },
  {
    id: "srh",
    name: "SRH Eagles",
    mascotName: "Orange Fire Eagle",
    tagline: "SILENCE IS GOLDEN. ORANGE IS FIRE.",
    quote: "Breaking the highest score record is our casual warm-up. We silence crowds for sport. 🔥",
    color: "bg-[#f97316]",
    accentColor: "#000000",
    textColor: "text-[#f97316]",
    bgColor: "bg-orange-50",
    image: "/mascots/srh.png",
    pattern: "/patterns/confetti.png",
    stats: {
      strength: "Explosive Scorepower",
      roastRating: "Aggressive (8.9/10)",
      wins: 98,
      fans: "1.6M",
    },
  },
];

interface HeroCarouselProps {
  onSelectClan?: (clan: Clan) => void;
  onJoinMatch?: () => void;
  onExploreMemes?: () => void;
}

export default function HeroCarousel({
  onSelectClan,
  onJoinMatch,
  onExploreMemes,
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeClan = CLANS[activeIndex];

  useEffect(() => {
    if (onSelectClan) {
      onSelectClan(activeClan);
    }
  }, [activeIndex, onSelectClan, activeClan]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CLANS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CLANS.length) % CLANS.length);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Dynamic Background Pattern Wrapper */}
      <div className="w-full max-w-6xl memphis-border memphis-shadow bg-white relative overflow-hidden flex flex-col min-h-[580px] lg:min-h-[640px] md:flex-row">
        {/* Pattern Background layer */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-500 bg-repeat"
          style={{
            backgroundImage: `url(${activeClan.pattern})`,
            backgroundSize: "200px",
          }}
        />

        {/* CRT Scanline Overlay */}
        <div className="crt-screen absolute inset-0 pointer-events-none z-10" />
        <div className="animate-scanline" />

        {/* Mascot Large Illustration Panel (Left/Center) */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative min-h-[300px] md:min-h-0 border-b-4 md:border-b-0 md:border-r-4 border-black">
          {/* Neon Glow Circle Behind */}
          <div
            className="absolute w-60 h-60 rounded-full blur-xl opacity-30 animate-pulse"
            style={{ backgroundColor: activeClan.accentColor }}
          />

          {/* Staggered sticker badge */}
          <div className="absolute top-4 left-4 z-20">
            <StickerChip label="ACTIVE FIGHTER" color="pink" rotation="rotate-[-6deg]" />
          </div>

          <div className="absolute top-4 right-4 z-20">
            <StickerChip
              label={`${activeClan.stats.fans} FANS`}
              color="yellow"
              rotation="rotate-[4deg]"
              glow
            />
          </div>

          {/* Mascot Image with Scaling Transition */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 z-10 transition-transform duration-500 hover:scale-105 active:rotate-1 cursor-pointer">
            <Image
              src={activeClan.image}
              alt={activeClan.name}
              fill
              priority
              className="object-contain filter drop-shadow-[8px_8px_0px_#000000]"
            />
          </div>

          {/* Floating Memphis Elements */}
          <div className="absolute bottom-10 left-10 w-8 h-8 bg-[#ffe400] border-2 border-black rounded-full animate-bounce" />
          <div className="absolute top-20 left-1/4 w-6 h-6 bg-[#d200c1] border-2 border-black rotate-45 animate-float" />
          <div className="absolute bottom-16 right-12 w-10 h-4 bg-[#b4ebff] border-2 border-black -rotate-12 animate-float-reverse" />
        </div>

        {/* Mascot Profile details (Right) */}
        <div className="w-full md:w-[45%] bg-[#fff9ea] p-6 sm:p-8 flex flex-col justify-between z-10 relative bg-polka">
          <div className="flex-1 flex flex-col justify-center">
            {/* Top header navigation style tabs */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold bg-black text-white px-2 py-0.5 select-none">
                SYSTEM: MASK_SELECT
              </span>
              <span className="text-xs font-mono font-bold text-black border border-black px-2 py-0.5 bg-white select-none">
                CLAN 0{activeIndex + 1}
              </span>
            </div>

            {/* Team Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-russo text-black uppercase tracking-tight text-3d-yellow leading-none mb-1">
              {activeClan.name}
            </h2>
            <div className="text-xl sm:text-2xl font-bangers text-[#d200c1] tracking-wider mb-4">
              Mascot: {activeClan.mascotName}
            </div>

            {/* Retro Window styled quote */}
            <RetroWindow
              title="BANTER INCOMING..."
              headerBg={activeClan.color}
              showDots={false}
              className="mb-6 font-inter text-sm sm:text-base text-black bg-white"
            >
              <div className="p-4 bg-white">
                <p className="italic font-semibold mb-2">"{activeClan.quote}"</p>
                <div className="h-[2px] bg-black my-3" />
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="font-bold">CLAN STRENGTH:</span>
                    <br />
                    <span className="bg-[#b4ebff] px-1 text-black font-semibold">
                      {activeClan.stats.strength}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">ROAST INDEX:</span>
                    <br />
                    <span className="bg-[#ffe400] px-1 text-black font-semibold">
                      {activeClan.stats.roastRating}
                    </span>
                  </div>
                </div>
              </div>
            </RetroWindow>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-black border-dashed">
            <PixelButton variant={activeClan.id} size="md" className="flex-1" onClick={onJoinMatch}>
              JOIN MATCH ROOM
            </PixelButton>
            <PixelButton variant="white" size="md" className="flex-1" onClick={onExploreMemes}>
              EXPLORE MEMES
            </PixelButton>
          </div>
        </div>
      </div>

      {/* Slider Selectors (Carousel Tabs) */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <PixelButton variant="white" size="sm" onClick={handlePrev} className="px-3.5 py-2">
          {"< PREV"}
        </PixelButton>

        <div className="flex items-center gap-2">
          {CLANS.map((clan, idx) => (
            <button
              key={clan.id}
              onClick={() => setActiveIndex(idx)}
              className={`w-12 h-12 memphis-border-2 transition-all duration-200 select-none overflow-hidden relative cursor-pointer ${
                idx === activeIndex
                  ? "scale-110 -translate-y-1 bg-[#ffe400] border-black shadow-[4px_4px_0px_#000]"
                  : "bg-white border-black/60 opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <Image src={clan.image} alt={clan.name} fill className="object-contain p-1" />
            </button>
          ))}
        </div>

        <PixelButton variant="white" size="sm" onClick={handleNext} className="px-3.5 py-2">
          {"NEXT >"}
        </PixelButton>
      </div>
    </div>
  );
}
