"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MemeCard, { MemeData } from "@/components/MemeCard";
import FeedCard, { FeedPost } from "@/components/FeedCard";
import PixelButton from "@/components/PixelButton";
import StickerChip from "@/components/StickerChip";

const PRELOADED_MEMES: Record<string, MemeData[]> = {
  "rcb-csk": [
    {
      id: "rcb-meme-1",
      creator: { username: "KohliFan_18", clan: "rcb", level: 14 },
      imageUrl: "/patterns/striped.png",
      caption: "Kohli in the nets after the bowling machine gets a software failure. 🦁 Ee sala cup namde, no jokes!",
      tags: ["EeSalaCupNamde", "KohliAggression", "RCB"],
      upvotes: 142,
      downvotes: 8,
      reactions: { fire: 24, skull: 12, clown: 2, shush: 8 },
    },
    {
      id: "csk-meme-1",
      creator: { username: "ThalaWhistler", clan: "csk", level: 22 },
      imageUrl: "/patterns/geometric_seamless.png",
      caption: "CSK bowlers when Dhoni moves a fielder 2 inches to the left: 🧠 UNPARALLELED TACTICAL MASTERY.",
      tags: ["ThalaForAReason", "Dhoni", "CSK"],
      upvotes: 210,
      downvotes: 4,
      reactions: { fire: 45, skull: 6, clown: 1, shush: 32 },
    },
    {
      id: "mi-meme-1",
      creator: { username: "RohitPaltan_45", clan: "mi", level: 9 },
      imageUrl: "/patterns/halftone.png",
      caption: "Me watching RCB and CSK fans argue about who is the actual king when MI has 5 trophies in the back. 🤫",
      tags: ["MI", "PaltanFlex", "Cope"],
      upvotes: 98,
      downvotes: 42,
      reactions: { fire: 18, skull: 15, clown: 8, shush: 12 },
    },
  ],
  "kkr-srh": [
    {
      id: "kkr-meme-1",
      creator: { username: "SRKKnight", clan: "kkr", level: 15 },
      imageUrl: "/patterns/abstract_geometric.png",
      caption: "Narine opening the batting like he has a flight to catch in 15 minutes. 👑 Korbo Lorbo Jitbo!",
      tags: ["KorboLorboJitbo", "NarineFlex", "KKR"],
      upvotes: 185,
      downvotes: 3,
      reactions: { fire: 38, skull: 8, clown: 0, shush: 22 },
    },
    {
      id: "srh-meme-1",
      creator: { username: "OrangeArmy_1", clan: "srh", level: 12 },
      imageUrl: "/patterns/confetti.png",
      caption: "Pat Cummins telling the crowd to shush after silencing another stadium. 🔥 Orange Army is firing!",
      tags: ["SilenceTheCrowd", "PatCummins", "SRH"],
      upvotes: 198,
      downvotes: 15,
      reactions: { fire: 50, skull: 11, clown: 3, shush: 40 },
    },
  ],
};

const PRELOADED_POSTS: Record<string, FeedPost[]> = {
  "rcb-csk": [
    {
      id: "post-1",
      username: "CricketSage_99",
      clan: "neutral",
      level: 8,
      time: "2m ago",
      content: "Kohli's cover drive is officially art, but can we talk about Siraj's economy rate? 😭 RCB bowlers are doing RCB things again.",
      likes: 34,
      roasts: 5,
    },
    {
      id: "post-2",
      username: "WhistlePoduOfficial",
      clan: "csk",
      level: 19,
      time: "5m ago",
      content: "Pathirana's yorkers are absolutely lethal tonight. RCB middle order is shaking. Whistle Podu, boys! 🤫🏆",
      likes: 56,
      roasts: 1,
    },
  ],
  "kkr-srh": [
    {
      id: "post-3",
      username: "GautamGambhirFC",
      clan: "kkr",
      level: 20,
      time: "1m ago",
      content: "No smiles, only straight wins. KKR management is cooking. SRH batters are struggling against spin. 🤫",
      likes: 82,
      roasts: 2,
    },
  ],
};

export default function MatchRoomPage() {
  const params = useParams();
  const id = (params.id as string) || "rcb-csk";

  const [memes, setMemes] = useState<MemeData[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);

  const [composerText, setComposerText] = useState("");
  const [activeTab, setActiveTab] = useState<"MEMES" | "CHAT">("MEMES");
  
  // Mobile tab selectors
  const [mobileViewTab, setMobileViewTab] = useState<"feed" | "stats" | "tools">("feed");

  // Custom cheered notice
  const [floatingNotification, setFloatingNotification] = useState<string | null>(null);

  // Load memes and handle localStorage integration
  useEffect(() => {
    const preloaded = PRELOADED_MEMES[id] || PRELOADED_MEMES["rcb-csk"];
    const posts = PRELOADED_POSTS[id] || PRELOADED_POSTS["rcb-csk"];
    
    try {
      const storedMemeStr = localStorage.getItem("genz_studio_memes");
      if (storedMemeStr) {
        const storedMemes = JSON.parse(storedMemeStr) as MemeData[];
        const matchMemes = storedMemes.filter((m: any) => m.matchId === id || (!m.matchId && id === "rcb-csk"));
        setMemes([...matchMemes, ...preloaded]);
      } else {
        setMemes(preloaded);
      }
    } catch (e) {
      setMemes(preloaded);
    }
    
    setFeedPosts(posts);
  }, [id]);

  const handlePostBanter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    if (activeTab === "CHAT") {
      const newPost: FeedPost = {
        id: `custom-post-${Date.now()}`,
        username: "MemeLord_GZ",
        clan: "neutral",
        level: 1,
        time: "Just now",
        content: composerText,
        likes: 0,
        roasts: 0,
      };
      setFeedPosts([newPost, ...feedPosts]);
    } else {
      const newMeme: MemeData = {
        id: `custom-meme-${Date.now()}`,
        creator: { username: "MemeLord_GZ", clan: "neutral", level: 1 },
        imageUrl: "/patterns/black_white.png",
        caption: composerText,
        tags: ["CustomBanter", "BanterBox"],
        upvotes: 1,
        downvotes: 0,
        reactions: { fire: 0, skull: 0, clown: 0, shush: 0 },
      };
      setMemes([newMeme, ...memes]);
    }

    setComposerText("");
  };

  const handleCheerEvent = (team: "A" | "B") => {
    const teamName = team === "A" ? "RCB" : "CSK";
    setFloatingNotification(`🚨 ${teamName} FAN BOOST ACTIVATED! 🚨`);
    setTimeout(() => setFloatingNotification(null), 1500);
  };

  const getMatchTitle = () => {
    if (id === "kkr-srh") return "KKR VS SRH | EAGLES VS KNIGHTS";
    if (id === "mi-gt") return "MI VS GT | PALTAN VS TITANS";
    return "RCB VS CSK | EL CLASICO ARENA";
  };

  return (
    <div className="min-h-screen bg-[#fff9ea] flex flex-col justify-between overflow-x-hidden relative pb-12 bg-polka">
      
      {/* Floating cheer feedback notification */}
      {floatingNotification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-bounce bg-[#ffe400] text-black font-bangers text-2xl px-6 py-2.5 memphis-border shadow-[4px_4px_0px_#000] tracking-wider select-none">
          {floatingNotification}
        </div>
      )}

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
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#b4ebff] text-black hover:bg-[#ffe400] transition-colors rotate-[2deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
              👤 PROFILE
            </div>
          </Link>
        </nav>
      </header>

      {/* Mobile viewport navigation tab-bar (Visible below lg) */}
      <div className="lg:hidden flex border-b-4 border-black bg-white select-none sticky top-0 z-30 mb-4 mx-6 memphis-border">
        {["FEED", "STATS", "TOOLS"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileViewTab(tab.toLowerCase() as any)}
            className={`flex-1 py-3 text-center font-bangers text-lg tracking-wider border-r border-black last:border-r-0 active:bg-zinc-50 ${
              mobileViewTab === tab.toLowerCase() ? "bg-[#ffe400] text-black" : "bg-white"
            }`}
          >
            {tab === "FEED" ? "🥊 FEED" : tab === "STATS" ? "📊 STATS" : "⚡ TOOLS"}
          </button>
        ))}
      </div>

      {/* Main Grid: 3 Column Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-4 grid grid-cols-1 lg:grid-cols-4 gap-8 z-10">
        
        {/* Left Column (Match stats & Online) - 1 Col span, hidden on mobile unless in stats tab */}
        <div className={`lg:col-span-1 flex flex-col gap-6 ${
          mobileViewTab === "stats" ? "flex" : "hidden lg:flex"
        }`}>
          <Sidebar type="left" matchId={id} onCheer={handleCheerEvent} />
        </div>

        {/* Center Column (Meme & Chat feeds) - 2 Col span, hidden on mobile unless in feed tab */}
        <div className={`lg:col-span-2 flex flex-col gap-6 ${
          mobileViewTab === "feed" ? "flex" : "hidden lg:flex"
        }`}>
          
          {/* Feed Header and Tabs */}
          <div className="memphis-border bg-white p-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3.5 memphis-shadow-sm">
            <div>
              <span className="bg-black text-[#ffe400] text-[10px] font-mono font-bold px-2 py-0.5 border border-black uppercase rotate-[-1deg] inline-block mb-1.5">
                BATTLE ARENA ACTIVE
              </span>
              <h2 className="font-russo text-2xl text-black uppercase leading-none truncate max-w-xs sm:max-w-md">
                {getMatchTitle()}
              </h2>
            </div>

            {/* Tab Toggles */}
            <div className="flex gap-2.5 font-mono text-xs font-bold mt-2 sm:mt-0">
              <button
                onClick={() => setActiveTab("MEMES")}
                className={`flex-1 sm:flex-initial memphis-border-2 px-4.5 py-2 cursor-pointer select-none active:translate-y-[1px] ${
                  activeTab === "MEMES" ? "bg-[#ffe400] text-black" : "bg-white"
                }`}
              >
                🖼️ MEMES
              </button>
              <button
                onClick={() => setActiveTab("CHAT")}
                className={`flex-1 sm:flex-initial memphis-border-2 px-4.5 py-2 cursor-pointer select-none active:translate-y-[1px] ${
                  activeTab === "CHAT" ? "bg-[#d200c1] text-white" : "bg-white"
                }`}
              >
                💬 BANTER
              </button>
            </div>
          </div>

          {/* Composer Form Box */}
          <form onSubmit={handlePostBanter} className="memphis-border memphis-shadow-sm bg-white p-4 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black border-dashed pb-2">
              <span className="font-russo text-xs text-black">
                {activeTab === "MEMES" ? "🖼️ DEPLOY QUICK TEXT MEME" : "💬 DRAFT SAUCE"}
              </span>
              <Link href="/studio" className="font-mono text-[10px] font-bold text-[#d200c1] hover:underline">
                GO TO MEME STUDIO (FULL CANVAS) ➡️
              </Link>
            </div>
            
            <textarea
              rows={3}
              placeholder={
                activeTab === "MEMES"
                  ? "TYPE TEXT MEME CAPTION HERE (BG PATTERN WILL BE APPLIED AUTOMATICALLY)..."
                  : "TYPE SAVAGE BANTER TALK OR ROAST SUGGESTIONS..."
              }
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              className="w-full memphis-border bg-[#fff9ea] text-black p-3 font-mono text-xs font-bold uppercase placeholder-black/40 focus:bg-white focus:outline-none"
              required
            />

            <div className="flex justify-end">
              <PixelButton variant="secondary" size="sm" type="submit">
                {activeTab === "MEMES" ? "POST MEME 🚀" : "SEND ROAST 💀"}
              </PixelButton>
            </div>
          </form>

          {/* Feed Content List */}
          <div className="flex flex-col gap-6">
            {activeTab === "MEMES" ? (
              memes.length > 0 ? (
                memes.map((meme) => <MemeCard key={meme.id} meme={meme} />)
              ) : (
                <div className="text-center py-12 border-4 border-dashed border-black bg-white">
                  <span className="text-3xl block">🖼️</span>
                  <p className="font-russo text-lg uppercase text-black mt-2">NO MEMES POSTED YET</p>
                  <p className="font-mono text-xs font-bold text-black/50">Be the first to create one in the studio!</p>
                </div>
              )
            ) : (
              feedPosts.length > 0 ? (
                feedPosts.map((post) => <FeedCard key={post.id} post={post} />)
              ) : (
                <div className="text-center py-12 border-4 border-dashed border-black bg-white">
                  <span className="text-3xl block">💬</span>
                  <p className="font-russo text-lg uppercase text-black mt-2">NO CHAT BANTER YET</p>
                  <p className="font-mono text-xs font-bold text-black/50">Say something roasted to trigger the opponent clan!</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Column (Trending Topics, AI Roaster, Templates) - 1 Col span, hidden on mobile unless in tools tab */}
        <div className={`lg:col-span-1 flex flex-col gap-6 ${
          mobileViewTab === "tools" ? "flex" : "hidden lg:flex"
        }`}>
          <Sidebar type="right" matchId={id} />
        </div>

      </main>
    </div>
  );
}
