import React from "react";
import Image from "next/image";
import Link from "next/link";
import PixelButton from "./PixelButton";
import StickerChip from "./StickerChip";

export interface MatchData {
  id: string;
  teamA: {
    id: "rcb" | "csk" | "mi" | "kkr" | "srh" | "gt" | "rr" | "dc" | "lsg" | "pbks";
    name: string;
    logo: string;
    color: string;
  };
  teamB: {
    id: "rcb" | "csk" | "mi" | "kkr" | "srh" | "gt" | "rr" | "dc" | "lsg" | "pbks";
    name: string;
    logo: string;
    color: string;
  };
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  time?: string;
  score?: string;
  fanCount: string;
  memeCount: string;
  hotTopic: string;
}

interface MatchCardProps {
  match: MatchData;
}

export default function MatchCard({ match }: MatchCardProps) {
  const isLive = match.status === "LIVE";

  // Visual accents based on team pairings
  const borderShadowClass = isLive ? "memphis-shadow-pink hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-sm" : "memphis-shadow-sm";

  return (
    <div className={`memphis-border bg-white flex flex-col justify-between transition-all duration-150 relative ${borderShadowClass}`}>
      {/* Live Sticker */}
      <div className="absolute -top-3.5 -left-3.5 z-10">
        {isLive ? (
          <StickerChip label="LIVE NOW" color="red" rotation="rotate-[-4deg]" glow />
        ) : match.status === "UPCOMING" ? (
          <StickerChip label="UPCOMING" color="cyan" rotation="rotate-[3deg]" />
        ) : (
          <StickerChip label="FINISHED" color="yellow" rotation="rotate-[2deg]" />
        )}
      </div>

      {/* Card Header (Rivalry Banner) */}
      <div className="memphis-border-2 border-t-0 border-l-0 border-r-0 border-b-4 border-black p-4 flex justify-between items-center bg-polka relative overflow-hidden h-28">
        {/* Team A Color Block Overlay */}
        <div className={`absolute top-0 left-0 bottom-0 w-[48%] -skew-x-12 origin-top-left opacity-30 ${match.teamA.color}`} />
        {/* Team B Color Block Overlay */}
        <div className={`absolute top-0 right-0 bottom-0 w-[48%] -skew-x-12 origin-bottom-right opacity-30 ${match.teamB.color}`} />

        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Team A */}
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-12 filter drop-shadow-[2px_2px_0px_#000]">
              <Image src={match.teamA.logo} alt={match.teamA.name} fill className="object-contain" />
            </div>
            <span className="font-russo text-lg text-black mt-1 uppercase">{match.teamA.id}</span>
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center">
            <span className="font-bangers text-4xl text-[#d200c1] rotate-[-6deg] tracking-wide select-none drop-shadow-[2px_2px_0px_#000]">
              VS
            </span>
            {match.score && (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 mt-1">
                {match.score}
              </span>
            )}
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-12 filter drop-shadow-[2px_2px_0px_#000]">
              <Image src={match.teamB.logo} alt={match.teamB.name} fill className="object-contain" />
            </div>
            <span className="font-russo text-lg text-black mt-1 uppercase">{match.teamB.id}</span>
          </div>
        </div>
      </div>

      {/* Match Stats */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-russo text-xl text-black mb-1.5 line-clamp-1">
            {match.teamA.name} VS {match.teamB.name}
          </h3>
          
          {match.time && (
            <p className="font-mono text-xs text-black/80 font-bold mb-3">
              ⏰ SCHEDULE: {match.time}
            </p>
          )}

          {/* Meme and Fan metrics */}
          <div className="grid grid-cols-2 gap-2 bg-[#f4eeda] border-2 border-black p-2 font-mono text-xs font-bold mb-4">
            <div>
              🔥 FANS ONLINE:
              <br />
              <span className="text-sm font-russo text-[#d200c1]">{match.fanCount}</span>
            </div>
            <div>
              🖼️ MEMES POSTED:
              <br />
              <span className="text-sm font-russo text-[#6b5f00]">{match.memeCount}</span>
            </div>
          </div>

          <div className="text-xs font-semibold text-black bg-[#fff9ea] border border-black p-2 italic mb-4 flex items-start gap-1">
            <span>🗣️</span>
            <span className="line-clamp-2">"{match.hotTopic}"</span>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/match/${match.id}`} className="w-full">
          <PixelButton variant={isLive ? "secondary" : "white"} size="sm" className="w-full">
            {isLive ? "ENTER ARENA 🥊" : "VIEW DETAILS 🔍"}
          </PixelButton>
        </Link>
      </div>
    </div>
  );
}
