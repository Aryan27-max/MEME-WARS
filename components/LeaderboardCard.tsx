import React from "react";
import FanBadge from "./FanBadge";

export interface LeaderboardUser {
  rank: number;
  username: string;
  clan: "rcb" | "csk" | "mi" | "kkr" | "srh" | "neutral";
  points: number;
  badgeName: string;
}

interface LeaderboardCardProps {
  users: LeaderboardUser[];
}

export default function LeaderboardCard({ users }: LeaderboardCardProps) {
  return (
    <div className="memphis-border memphis-shadow bg-white flex flex-col w-full">
      {/* Header */}
      <div className="memphis-border-2 border-t-0 border-l-0 border-r-0 border-b-4 border-black p-3.5 bg-[#d200c1] text-white font-russo uppercase tracking-wider text-base">
        ⚡ BANTER LEADERBOARD
      </div>

      {/* List */}
      <div className="divide-y-4 divide-black bg-[#fff9ea]">
        {users.map((user) => {
          // Rank color offsets
          const rankBg =
            user.rank === 1
              ? "bg-[#ffe400]"
              : user.rank === 2
              ? "bg-[#b4ebff]"
              : user.rank === 3
              ? "bg-[#e0dac7]"
              : "bg-white";

          return (
            <div
              key={user.username}
              className="p-3.5 flex items-center justify-between hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-3.5">
                {/* Position Sticker */}
                <div
                  className={`w-8 h-8 rounded-none memphis-border-2 flex items-center justify-center font-russo text-sm text-black select-none ${rankBg}`}
                >
                  #{user.rank}
                </div>

                <FanBadge team={user.clan} initials={user.username.substring(0, 2).toUpperCase()} size="sm" />
                
                <div>
                  <div className="font-bold text-sm text-black leading-tight flex items-center gap-1.5">
                    <span>{user.username}</span>
                    <span className="text-[9px] font-mono font-bold bg-[#b4ebff] text-black border border-black px-1">
                      {user.badgeName}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-black/60 uppercase">
                    {user.clan} SUPPORT
                  </span>
                </div>
              </div>

              {/* Meme Power Score */}
              <div className="text-right">
                <span className="font-russo text-sm text-black">{user.points} XP</span>
                <p className="font-mono text-[9px] font-bold text-black/60 uppercase">POWER LEVEL</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
