"use client";

import React, { useState } from "react";
import Image from "next/image";
import FanBadge from "./FanBadge";
import StickerChip from "./StickerChip";

export interface MemeData {
  id: string;
  creator: {
    username: string;
    clan: "rcb" | "csk" | "mi" | "kkr" | "srh" | "neutral";
    level: number;
  };
  imageUrl: string;
  caption: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  reactions: {
    fire: number;
    skull: number;
    clown: number;
    shush: number;
  };
}

interface MemeCardProps {
  meme: MemeData;
}

export default function MemeCard({ meme }: MemeCardProps) {
  const [upvotes, setUpvotes] = useState(meme.upvotes);
  const [downvotes, setDownvotes] = useState(meme.downvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  
  const [reactions, setReactions] = useState(meme.reactions);
  const [lastClickedReaction, setLastClickedReaction] = useState<string | null>(null);

  const handleUpvote = () => {
    if (userVote === "up") {
      setUpvotes(upvotes - 1);
      setUserVote(null);
    } else {
      setUpvotes(upvotes + 1);
      if (userVote === "down") {
        setDownvotes(downvotes - 1);
      }
      setUserVote("up");
    }
  };

  const handleDownvote = () => {
    if (userVote === "down") {
      setDownvotes(downvotes - 1);
      setUserVote(null);
    } else {
      setDownvotes(downvotes + 1);
      if (userVote === "up") {
        setUpvotes(upvotes - 1);
      }
      setUserVote("down");
    }
  };

  const handleReaction = (type: "fire" | "skull" | "clown" | "shush") => {
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    
    setLastClickedReaction(type);
    setTimeout(() => setLastClickedReaction(null), 800);
  };

  return (
    <div className="memphis-border memphis-shadow bg-white flex flex-col relative mb-8 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-sm transition-all duration-150">
      
      {/* Floating Sticker for high score */}
      {upvotes - downvotes > 50 && (
        <div className="absolute -top-3.5 -right-3.5 z-10 animate-float">
          <StickerChip label="🔥 VERY SAVAGE" color="pink" rotation="rotate-[6deg]" glow />
        </div>
      )}

      {/* Card Header (Creator Details) */}
      <div className="memphis-border-2 border-t-0 border-l-0 border-r-0 border-b-4 border-black p-3.5 flex justify-between items-center bg-[#f4eeda]">
        <div className="flex items-center gap-2.5">
          <FanBadge team={meme.creator.clan} initials={meme.creator.username.substring(0, 2).toUpperCase()} size="sm" online />
          <div>
            <div className="font-russo text-sm text-black flex items-center gap-1.5 leading-none">
              <span>{meme.creator.username}</span>
              <span className="text-[10px] font-mono font-bold bg-black text-white px-1.5 py-0.5 rounded-sm">
                LVL {meme.creator.level}
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold text-black/60 uppercase">
              {meme.creator.clan} SUPPORT
            </span>
          </div>
        </div>

        <div className="flex gap-1.5">
          {meme.tags.slice(0, 1).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono font-bold bg-[#ffe400] text-black border border-black px-1.5 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Meme Image Area */}
      <div className="relative w-full aspect-video bg-black overflow-hidden border-b-4 border-black group">
        <Image
          src={meme.imageUrl}
          alt={meme.caption}
          fill
          className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
        />
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* Caption & Description */}
      <div className="p-4 bg-white border-b-4 border-black">
        <p className="font-inter font-bold text-base text-black">{meme.caption}</p>
        {meme.tags.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {meme.tags.slice(1).map((tag) => (
              <span key={tag} className="text-xs font-mono text-[#d200c1] font-bold">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Footer (Upvotes & Reactions) */}
      <div className="p-3 bg-[#fff9ea] grid grid-cols-2 gap-3 items-center">
        {/* Voting */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleUpvote}
            className={`memphis-border-2 px-2.5 py-1.5 font-russo text-sm cursor-pointer select-none active:translate-y-[2px] ${
              userVote === "up" ? "bg-[#ffe400]" : "bg-white"
            }`}
          >
            👍 {upvotes}
          </button>
          <button
            onClick={handleDownvote}
            className={`memphis-border-2 px-2.5 py-1.5 font-russo text-sm cursor-pointer select-none active:translate-y-[2px] ${
              userVote === "down" ? "bg-[#d200c1] text-white" : "bg-white"
            }`}
          >
            👎 {downvotes}
          </button>
        </div>

        {/* Reaction Picker */}
        <div className="flex justify-end gap-1.5 relative">
          {/* Pop-up float emoji indicator when clicked */}
          {lastClickedReaction && (
            <div className="absolute -top-10 right-4 font-russo text-xl animate-bounce text-black font-extrabold bg-[#ffe400] border-2 border-black px-2 py-0.5 rounded-md shadow-md z-30">
              +{lastClickedReaction === "fire" ? "🔥" : lastClickedReaction === "skull" ? "💀" : lastClickedReaction === "clown" ? "🤡" : "🤫"}
            </div>
          )}

          <button
            onClick={() => handleReaction("fire")}
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-sm cursor-pointer hover:bg-red-50 hover:scale-110 transition-transform active:scale-95"
            title="Fire"
          >
            🔥<span className="text-[9px] font-mono font-bold ml-0.5">{reactions.fire}</span>
          </button>

          <button
            onClick={() => handleReaction("skull")}
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-sm cursor-pointer hover:bg-zinc-100 hover:scale-110 transition-transform active:scale-95"
            title="Dead"
          >
            💀<span className="text-[9px] font-mono font-bold ml-0.5">{reactions.skull}</span>
          </button>

          <button
            onClick={() => handleReaction("clown")}
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-sm cursor-pointer hover:bg-yellow-50 hover:scale-110 transition-transform active:scale-95"
            title="Clown"
          >
            🤡<span className="text-[9px] font-mono font-bold ml-0.5">{reactions.clown}</span>
          </button>

          <button
            onClick={() => handleReaction("shush")}
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-sm cursor-pointer hover:bg-blue-50 hover:scale-110 transition-transform active:scale-95"
            title="Savage"
          >
            🤫<span className="text-[9px] font-mono font-bold ml-0.5">{reactions.shush}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
