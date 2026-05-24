"use client";

import React, { useState } from "react";
import FanBadge from "./FanBadge";

export interface FeedPost {
  id: string;
  username: string;
  clan: "rcb" | "csk" | "mi" | "kkr" | "srh" | "neutral";
  level: number;
  time: string;
  content: string;
  likes: number;
  roasts: number;
}

interface FeedCardProps {
  post: FeedPost;
}

export default function FeedCard({ post }: FeedCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [roasts, setRoasts] = useState(post.roasts);
  const [liked, setLiked] = useState(false);
  const [roasted, setRoasted] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleRoast = () => {
    if (roasted) {
      setRoasts(roasts - 1);
    } else {
      setRoasts(roasts + 1);
    }
    setRoasted(!roasted);
  };

  return (
    <div className="memphis-border memphis-shadow-sm bg-white p-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-700 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black border-dashed pb-2.5">
        <div className="flex items-center gap-2.5">
          <FanBadge team={post.clan} initials={post.username.substring(0, 2).toUpperCase()} size="sm" />
          <div>
            <div className="font-russo text-xs text-black flex items-center gap-1.5 leading-none">
              <span>{post.username}</span>
              <span className="text-[9px] font-mono font-bold bg-[#ffe400] text-black border border-black px-1.5 py-0.5 rounded-sm">
                LVL {post.level}
              </span>
            </div>
            <span className="font-mono text-[9px] font-bold text-black/50 uppercase leading-none mt-0.5 block">
              {post.clan} CLAN
            </span>
          </div>
        </div>

        <span className="font-mono text-[10px] font-bold text-black/60 bg-[#f4eeda] border border-black px-1.5 py-0.5">
          ⏰ {post.time}
        </span>
      </div>

      {/* Content */}
      <p className="font-inter font-semibold text-sm sm:text-base text-black bg-[#fff9ea] border border-black p-3 leading-relaxed">
        {post.content}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 font-mono text-xs font-bold">
        <button
          onClick={handleLike}
          className={`memphis-border-2 px-3 py-1 flex items-center gap-1.5 cursor-pointer active:translate-y-[1px] select-none ${
            liked ? "bg-[#ffe400]" : "bg-white hover:bg-zinc-50"
          }`}
        >
          🔥 <span className="font-russo text-[11px]">{likes}</span>
        </button>
        <button
          onClick={handleRoast}
          className={`memphis-border-2 px-3 py-1 flex items-center gap-1.5 cursor-pointer active:translate-y-[1px] select-none ${
            roasted ? "bg-[#d200c1] text-white" : "bg-white hover:bg-zinc-50"
          }`}
        >
          💀 <span className="font-russo text-[11px]">{roasts}</span>
        </button>
      </div>
    </div>
  );
}
