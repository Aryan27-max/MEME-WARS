"use client";

import React, { useState } from "react";
import Link from "next/link";
import MatchCard, { MatchData } from "@/components/MatchCard";
import PixelButton from "@/components/PixelButton";
import StickerChip from "@/components/StickerChip";

const SAMPLE_MATCHES: MatchData[] = [
  {
    id: "rcb-csk",
    teamA: { id: "rcb", name: "RCB Bolters", logo: "/mascots/rcb.png", color: "bg-[#dc2626]" },
    teamB: { id: "csk", name: "CSK Whistlers", logo: "/mascots/csk.png", color: "bg-[#facc15]" },
    status: "LIVE",
    score: "RCB 188/4 (19.2) VS CSK",
    fanCount: "24.6k",
    memeCount: "1.2k",
    hotTopic: "Kohli's single in the 19th over sparks furious meme debates.",
  },
  {
    id: "kkr-srh",
    teamA: { id: "kkr", name: "KKR Knights", logo: "/mascots/kkr.png", color: "bg-[#581c87]" },
    teamB: { id: "srh", name: "SRH Eagles", logo: "/mascots/srh.png", color: "bg-[#f97316]" },
    status: "LIVE",
    score: "KKR 210/5 (20) VS SRH 195/6 (18.4)",
    fanCount: "22.1k",
    memeCount: "1.1k",
    hotTopic: "Cummins silenced by Narine's unbelievable helicopter roasts.",
  },
  {
    id: "mi-gt",
    teamA: { id: "mi", name: "MI Paltan", logo: "/mascots/mi.png", color: "bg-[#1d4ed8]" },
    teamB: { id: "gt", name: "GT Titans", logo: "/mascots/rcb.png", color: "bg-[#0f766e]" }, // GT using teal
    status: "LIVE",
    score: "MI 145/2 (16) VS GT",
    fanCount: "18.4k",
    memeCount: "820",
    hotTopic: "Hardik booed? Let's check the latest cyber roasts.",
  },
  {
    id: "rr-lsg",
    teamA: { id: "rr", name: "RR Royals", logo: "/mascots/csk.png", color: "bg-[#d200c1]" }, // RR pink
    teamB: { id: "lsg", name: "LSG Giants", logo: "/mascots/mi.png", color: "bg-[#1d4ed8]" },
    status: "UPCOMING",
    time: "MAY 25, 19:30 IST",
    fanCount: "1.5k",
    memeCount: "0",
    hotTopic: "Buttler vs Rahul: Who will run-machine the first powerplay?",
  },
  {
    id: "dc-pbks",
    teamA: { id: "dc", name: "DC Capitals", logo: "/mascots/rcb.png", color: "bg-[#1d4ed8]" },
    teamB: { id: "pbks", name: "Punjab Kings", logo: "/mascots/srh.png", color: "bg-[#dc2626]" },
    status: "UPCOMING",
    time: "MAY 26, 19:30 IST",
    fanCount: "920",
    memeCount: "0",
    hotTopic: "Pant's reverse sweep predictions spark stadium sticker battles.",
  },
];

export default function MatchesPage() {
  const [filter, setFilter] = useState<"ALL" | "LIVE" | "UPCOMING">("ALL");
  const [search, setSearch] = useState("");

  const filteredMatches = SAMPLE_MATCHES.filter((match) => {
    // Search filter
    const matchesSearch =
      match.teamA.name.toLowerCase().includes(search.toLowerCase()) ||
      match.teamB.name.toLowerCase().includes(search.toLowerCase()) ||
      match.teamA.id.toLowerCase().includes(search.toLowerCase()) ||
      match.teamB.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter
    if (filter === "ALL") return true;
    return match.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#fff9ea] flex flex-col justify-between overflow-x-hidden relative pb-16 bg-polka">
      {/* Background elements */}
      <div className="absolute top-28 left-4 w-12 h-12 border-4 border-black bg-[#ffe400] rounded-full animate-float pointer-events-none" />
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
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#ffe400] text-black rotate-[-2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
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
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#b4ebff] text-black hover:bg-[#ffe400] transition-colors rotate-[2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              👤 PROFILE
            </div>
          </Link>
        </nav>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 z-10">
        
        {/* Title & Stats sticker */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StickerChip label="BATTLEGROUND DISCOVERY" color="pink" rotation="rotate-[-2deg]" />
            </div>
            <h2 className="font-russo text-4xl sm:text-5xl text-black uppercase leading-none">
              ACTIVE BATTLE ROOMS
            </h2>
            <p className="font-inter font-bold text-sm text-black/60 mt-1.5">
              Select a match, cheering team colors, and deploy custom roasts.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="memphis-border bg-white px-4 py-2 font-mono text-xs font-bold shadow-[4px_4px_0px_#000] rotate-[2deg]">
            🏟️ TOTAL LIVEROOMS: <span className="text-[#d200c1]">3 ACTIVE</span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 border-4 border-black bg-white p-4 memphis-shadow-sm">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <PixelButton
              variant={filter === "ALL" ? "primary" : "white"}
              size="sm"
              onClick={() => setFilter("ALL")}
              className="text-lg!"
            >
              ALL MATCHES
            </PixelButton>
            <PixelButton
              variant={filter === "LIVE" ? "secondary" : "white"}
              size="sm"
              onClick={() => setFilter("LIVE")}
              className="text-lg!"
            >
              🔥 LIVE NOW
            </PixelButton>
            <PixelButton
              variant={filter === "UPCOMING" ? "tertiary" : "white"}
              size="sm"
              onClick={() => setFilter("UPCOMING")}
              className="text-lg!"
            >
              ⏰ UPCOMING
            </PixelButton>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="SEARCH TEAM NAME OR ABBREVIATION..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full memphis-border bg-[#fff9ea] text-black px-4 py-2.5 font-mono text-xs font-bold uppercase focus:bg-white focus:outline-none placeholder-black/50"
            />
            <span className="absolute right-3.5 top-3 text-sm">🔍</span>
          </div>
        </div>

        {/* Matches Grid */}
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="memphis-border bg-white p-12 text-center max-w-xl mx-auto memphis-shadow bg-polka">
            <span className="text-5xl block mb-4">😭</span>
            <h3 className="font-russo text-2xl text-black uppercase mb-2">NO MATCHES FOUND</h3>
            <p className="font-mono text-xs font-bold text-black/60 mb-6">
              COULDN'T FIND ANY FIGHTING ARENA FOR "{search.toUpperCase()}"
            </p>
            <PixelButton variant="primary" size="sm" onClick={() => { setSearch(""); setFilter("ALL"); }}>
              RESET FILTERS
            </PixelButton>
          </div>
        )}
      </main>
    </div>
  );
}
