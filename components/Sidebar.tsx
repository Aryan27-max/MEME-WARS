"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FanBadge from "./FanBadge";
import PixelButton from "./PixelButton";
import RetroWindow from "./RetroWindow";

interface SidebarProps {
  type: "left" | "right";
  matchId?: string;
  teamA?: { id: string; name: string; logo: string; color: string };
  teamB?: { id: string; name: string; logo: string; color: string };
  score?: string;
  cheerStats?: { teamA: number; teamB: number };
  onCheer?: (team: "A" | "B") => void;
}

const TEMPLATES = [
  { id: "template_1", name: "Kohli Aggression", image: "/patterns/abstract_geometric.png", tagline: "Aggressive shouting face" },
  { id: "template_2", name: "Dhoni Shush", image: "/patterns/geometric_seamless.png", tagline: "Finger on lips quiet style" },
  { id: "template_3", name: "Rohit Flex", image: "/patterns/halftone.png", tagline: "5 trophies flex pose" },
  { id: "template_4", name: "Orange Army Silent", image: "/patterns/confetti.png", tagline: "Silence crowd finger gesture" },
];

const ROASTS = [
  "CSK fans when Dhoni takes a single in the 20th over: 👑 MASTERCLASS, THALA FOR A REASON!",
  "RCB's bowling line-up is like a screen door on a submarine. 😭",
  "MI spent their whole budget on coaching staff just to finish 10th. 💸",
  "SRH scorecard looks like a phone number until they actually have to chase. 🤐",
  "KKR stands for: K-an't K-ope R-eally. Back to the drawing board! 🤡",
];

const ONLINE_FANS = [
  { username: "KohliFan_18", clan: "rcb", active: true },
  { username: "ThalaWhistler", clan: "csk", active: true },
  { username: "RohitPaltan_45", clan: "mi", active: true },
  { username: "OrangeArmy_1", clan: "srh", active: true },
  { username: "SRKKnight", clan: "kkr", active: true },
];

export default function Sidebar({
  type,
  matchId = "rcb-csk",
  teamA = { id: "rcb", name: "RCB Bolters", logo: "/mascots/rcb.png", color: "bg-[#dc2626]" },
  teamB = { id: "csk", name: "CSK Whistlers", logo: "/mascots/csk.png", color: "bg-[#facc15]" },
  score = "RCB 188/4 (19.2) VS CSK",
  cheerStats = { teamA: 54, teamB: 46 },
  onCheer,
}: SidebarProps) {
  const [cheers, setCheers] = useState(cheerStats);
  const [currentRoast, setCurrentRoast] = useState(ROASTS[0]);
  const [roasting, setRoasting] = useState(false);

  const handleVoteCheer = (team: "A" | "B") => {
    if (team === "A") {
      setCheers((prev) => {
        const nextA = prev.teamA + 1;
        return { teamA: nextA, teamB: prev.teamB };
      });
    } else {
      setCheers((prev) => {
        const nextB = prev.teamB + 1;
        return { teamA: prev.teamA, teamB: nextB };
      });
    }
    if (onCheer) onCheer(team);
  };

  const handleGenerateRoast = () => {
    setRoasting(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * ROASTS.length);
      setCurrentRoast(ROASTS[idx]);
      setRoasting(false);
    }, 600);
  };

  const totalCheers = cheers.teamA + cheers.teamB;
  const pctA = Math.round((cheers.teamA / (totalCheers || 1)) * 100);
  const pctB = 100 - pctA;

  if (type === "left") {
    return (
      <div className="flex flex-col gap-6 w-full">
        {/* Match window */}
        <RetroWindow title="MATCH STATS" headerBg="bg-primary-container" showDots={false}>
          <div className="p-4 bg-white flex flex-col items-center">
            {/* Logos */}
            <div className="flex items-center justify-around w-full mb-4">
              <div className="flex flex-col items-center">
                <Image src={teamA.logo} alt={teamA.name} width={56} height={56} className="object-contain" />
                <span className="font-russo text-sm mt-1">{teamA.id.toUpperCase()}</span>
              </div>
              <span className="font-bangers text-3xl text-secondary rotate-[-6deg]">VS</span>
              <div className="flex flex-col items-center">
                <Image src={teamB.logo} alt={teamB.name} width={56} height={56} className="object-contain" />
                <span className="font-russo text-sm mt-1">{teamB.id.toUpperCase()}</span>
              </div>
            </div>

            {/* Score */}
            <div className="bg-black text-[#ffe400] font-mono text-center py-2.5 px-4 memphis-border w-full font-bold text-sm sm:text-base mb-4 tracking-wider">
              SCORE: {score}
            </div>

            {/* Cheering Meter */}
            <div className="w-full">
              <div className="flex justify-between font-russo text-xs mb-1">
                <span>{teamA.id.toUpperCase()}: {pctA}%</span>
                <span>{pctB}%: {teamB.id.toUpperCase()}</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full h-6 memphis-border bg-white flex overflow-hidden">
                <div
                  className="h-full bg-live-red transition-all duration-300"
                  style={{ width: `${pctA}%` }}
                />
                <div
                  className="h-full bg-csk-yellow transition-all duration-300"
                  style={{ width: `${pctB}%` }}
                />
              </div>

              {/* Cheer Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-3.5">
                <PixelButton
                  variant="rcb"
                  size="sm"
                  onClick={() => handleVoteCheer("A")}
                  className="py-1 text-base!"
                >
                  CHEER {teamA.id.toUpperCase()}
                </PixelButton>
                <PixelButton
                  variant="csk"
                  size="sm"
                  onClick={() => handleVoteCheer("B")}
                  className="py-1 text-base!"
                >
                  CHEER {teamB.id.toUpperCase()}
                </PixelButton>
              </div>
            </div>
          </div>
        </RetroWindow>

        {/* Online Fan list window */}
        <RetroWindow title="FANS IN ARENA" headerBg="bg-secondary" className="memphis-shadow-pink">
          <div className="bg-white p-3 divide-y-2 divide-black/10 max-h-60 overflow-y-auto scrollbar-thin">
            {ONLINE_FANS.map((fan) => (
              <div key={fan.username} className="flex items-center gap-3 py-2">
                <FanBadge team={fan.clan as any} initials={fan.username.substring(0, 2).toUpperCase()} size="sm" online />
                <div>
                  <div className="font-bold text-sm text-black flex items-center gap-1.5 leading-none">
                    {fan.username}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-black/50 uppercase">
                    {fan.clan} CLAN
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RetroWindow>
      </div>
    );
  }

  // Right Sidebar Layout
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* AI Roaster */}
      <RetroWindow title="AI ROAST ENGINE" headerBg="bg-secondary" className="memphis-shadow-pink">
        <div className="p-4 bg-white bg-polka">
          <p className="font-mono text-xs font-bold text-black/60 uppercase mb-2">🔥 SUGGESTED HIT:</p>
          <div className="memphis-border bg-[#fff9ea] p-3 text-sm font-semibold italic min-h-[70px] mb-4 flex items-center justify-center text-center">
            {roasting ? "ROLLING SAUCE..." : `"${currentRoast}"`}
          </div>

          <PixelButton variant="secondary" size="sm" className="w-full text-base!" onClick={handleGenerateRoast}>
            GENERATE NEW ROAST ⚡
          </PixelButton>
        </div>
      </RetroWindow>

      {/* Meme Templates and Studio Link */}
      <RetroWindow title="MEME TEMPLATES" headerBg="bg-primary-container">
        <div className="p-4 bg-white">
          <p className="font-mono text-xs font-bold text-black/60 uppercase mb-3">CHOOSE A DESIGN START:</p>
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {TEMPLATES.map((tmpl) => (
              <Link
                key={tmpl.id}
                href={`/studio?template=${tmpl.id}`}
                className="memphis-border-2 bg-[#f4eeda] p-1.5 hover:bg-[#ffe400] transition-colors flex flex-col items-center justify-between text-center select-none"
              >
                <div
                  className="w-full h-12 relative border border-black mb-1 opacity-85 bg-cover bg-center"
                  style={{ backgroundImage: `url(${tmpl.image})` }}
                />
                <span className="font-russo text-[10px] uppercase text-black line-clamp-1">
                  {tmpl.name}
                </span>
              </Link>
            ))}
          </div>

          <Link href="/studio">
            <PixelButton variant="primary" size="sm" className="w-full text-base!">
              OPEN MEME STUDIO 🎨
            </PixelButton>
          </Link>
        </div>
      </RetroWindow>
    </div>
  );
}
