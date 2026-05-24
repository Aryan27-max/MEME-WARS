"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PixelButton from "@/components/PixelButton";
import StickerChip from "@/components/StickerChip";
import RetroWindow from "@/components/RetroWindow";
import FanBadge from "@/components/FanBadge";
import Image from "next/image";

interface Layer {
  id: string;
  name: string;
  type: "text" | "image" | "sticker" | "background";
  content: string;
  color?: string;
  size?: number;
  rotation?: number;
  x?: number;
  y?: number;
  visible: boolean;
}

const TEMPLATE_MASCOTS = [
  { id: "rcb", name: "RCB Lion", image: "/mascots/rcb.png", color: "#dc2626" },
  { id: "csk", name: "CSK Lion", image: "/mascots/csk.png", color: "#facc15" },
  { id: "mi", name: "MI Robot", image: "/mascots/mi.png", color: "#1d4ed8" },
  { id: "kkr", name: "KKR Knight", image: "/mascots/kkr.png", color: "#581c87" },
  { id: "srh", name: "SRH Eagle", image: "/mascots/srh.png", color: "#f97316" },
];

const PATTERNS = [
  { name: "Striped Red", value: "/patterns/striped.png" },
  { name: "Geometric Yellow", value: "/patterns/geometric_seamless.png" },
  { name: "Halftone Blue", value: "/patterns/halftone.png" },
  { name: "Confetti Orange", value: "/patterns/confetti.png" },
  { name: "Abstract Purple", value: "/patterns/abstract_geometric.png" },
  { name: "Black & White Grid", value: "/patterns/black_white.png" },
];

const STICKERS = [
  { emoji: "🕶️", name: "Thug Glasses" },
  { emoji: "👑", name: "King Crown" },
  { emoji: "🔥", name: "Fire Splash" },
  { emoji: "😭", name: "Crying Loud" },
  { emoji: "🤫", name: "Shush Gesture" },
  { emoji: "🍕", name: "Pizza Slice" },
];

const MOCK_AI_CAPTIONS = [
  "RCB fans calculating mathematical scenarios to qualify with a net run rate of +0.001 🧮",
  "CSK fans whenever Thala Dhoni breathes on the cricket pitch: 🤫 Whistle Podu, peak captaincy!",
  "MI management introducing their 4th captain change of the calendar month 🤡",
  "The stadium security trying to find KKR fans who aren't dancing 🕺",
  "Pat Cummins preparing another blueprint to silence 100k people in the crowd 🔥",
];

const MOCK_AI_ROASTS = [
  "Your trophy cabinet has more cobwebs than actual championships. 😭",
  "Bowl speed slower than our loading spinner. 💀",
  "Calculated chase? Bro, your batsmen are playing test matches in T20 jerseys. 🤫",
  "Finishing 10th with the most expensive squad is a special kind of art. 🎨",
];

export default function MemeStudioPage() {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  
  const [activeMascotId, setActiveMascotId] = useState("rcb");
  const [activePatternIdx, setActivePatternIdx] = useState(0);

  // FX Filters
  const [enhanced, setEnhanced] = useState(false);
  const [bgRemoved, setBgRemoved] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Initialize canvas layers
  useEffect(() => {
    setLayers([
      {
        id: "bg-layer",
        name: "Background Pattern",
        type: "background",
        content: PATTERNS[0].value,
        visible: true,
      },
      {
        id: "mascot-layer",
        name: "Mascot Graphic",
        type: "image",
        content: TEMPLATE_MASCOTS[0].image,
        size: 240,
        x: 0,
        y: 20,
        visible: true,
      },
      {
        id: "top-text",
        name: "Top Text",
        type: "text",
        content: "RCB FANS WHEN",
        color: "#ffe400",
        size: 32,
        rotation: -4,
        x: 0,
        y: -110,
        visible: true,
      },
      {
        id: "bottom-text",
        name: "Bottom Text",
        type: "text",
        content: "THEY SCORE 200 RUNS & STILL LOSE",
        color: "#ffffff",
        size: 20,
        rotation: 2,
        x: 0,
        y: 130,
        visible: true,
      },
    ]);
    setSelectedLayerId("top-text");
  }, []);

  const handleSelectLayer = (id: string) => {
    setSelectedLayerId(id);
  };

  const handleUpdateLayer = (updated: Partial<Layer>) => {
    if (!selectedLayerId) return;
    setLayers((prev) =>
      prev.map((lay) => (lay.id === selectedLayerId ? { ...lay, ...updated } : lay))
    );
  };

  const handleToggleVisibility = (id: string) => {
    setLayers((prev) =>
      prev.map((lay) => (lay.id === id ? { ...lay, visible: !lay.visible } : lay))
    );
  };

  const handleDeleteLayer = (id: string) => {
    if (id === "mascot-layer" || id === "bg-layer") return; // Keep core graphics
    setLayers((prev) => prev.filter((lay) => lay.id !== id));
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const handleAddText = () => {
    const newId = `text-layer-${Date.now()}`;
    const newLayer: Layer = {
      id: newId,
      name: `Custom Text ${layers.length - 2}`,
      type: "text",
      content: "NEW BANTER LABEL",
      color: "#d200c1",
      size: 24,
      rotation: 0,
      x: 0,
      y: 0,
      visible: true,
    };
    setLayers([...layers, newLayer]);
    setSelectedLayerId(newId);
  };

  const handleAddSticker = (emoji: string) => {
    const newId = `sticker-layer-${Date.now()}`;
    const newLayer: Layer = {
      id: newId,
      name: `Sticker: ${emoji}`,
      type: "sticker",
      content: emoji,
      size: 50,
      rotation: -10,
      x: 30,
      y: -30,
      visible: true,
    };
    setLayers([...layers, newLayer]);
    setSelectedLayerId(newId);
  };

  const handleSelectMascot = (mascot: typeof TEMPLATE_MASCOTS[0]) => {
    setActiveMascotId(mascot.id);
    setLayers((prev) =>
      prev.map((lay) =>
        lay.id === "mascot-layer" ? { ...lay, content: mascot.image } : lay
      )
    );
  };

  const handleSelectPattern = (pattern: typeof PATTERNS[0], idx: number) => {
    setActivePatternIdx(idx);
    setLayers((prev) =>
      prev.map((lay) =>
        lay.id === "bg-layer" ? { ...lay, content: pattern.value } : lay
      )
    );
  };

  // AI Buttons triggers
  const handleAIGenerateCaption = () => {
    const randomCap = MOCK_AI_CAPTIONS[Math.floor(Math.random() * MOCK_AI_CAPTIONS.length)];
    // Update bottom text
    setLayers((prev) =>
      prev.map((lay) =>
        lay.id === "bottom-text" ? { ...lay, content: randomCap.toUpperCase() } : lay
      )
    );
    setSelectedLayerId("bottom-text");
  };

  const handleAIGenerateRoast = () => {
    const randomRoast = MOCK_AI_ROASTS[Math.floor(Math.random() * MOCK_AI_ROASTS.length)];
    // Update top text
    setLayers((prev) =>
      prev.map((lay) =>
        lay.id === "top-text" ? { ...lay, content: randomRoast.toUpperCase() } : lay
      )
    );
    setSelectedLayerId("top-text");
  };

  const handleAIMemeGenerator = () => {
    // Randomize background, mascot, and text
    const randMascot = TEMPLATE_MASCOTS[Math.floor(Math.random() * TEMPLATE_MASCOTS.length)];
    const randPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    const randCap = MOCK_AI_CAPTIONS[Math.floor(Math.random() * MOCK_AI_CAPTIONS.length)];
    const randRoast = MOCK_AI_ROASTS[Math.floor(Math.random() * MOCK_AI_ROASTS.length)];

    setActiveMascotId(randMascot.id);
    setLayers((prev) =>
      prev.map((lay) => {
        if (lay.id === "bg-layer") return { ...lay, content: randPattern.value };
        if (lay.id === "mascot-layer") return { ...lay, content: randMascot.image };
        if (lay.id === "top-text") return { ...lay, content: randRoast.toUpperCase() };
        if (lay.id === "bottom-text") return { ...lay, content: randCap.toUpperCase() };
        return lay;
      })
    );
  };

  const handlePostToMatch = () => {
    // Generate meme image post
    const topVal = layers.find((l) => l.id === "top-text")?.content || "";
    const bottomVal = layers.find((l) => l.id === "bottom-text")?.content || "";
    
    const newMemeObj = {
      id: `studio-meme-${Date.now()}`,
      matchId: "rcb-csk", // deploy to RCB-CSK feed
      creator: { username: "MemeLord_GZ", clan: activeMascotId as any, level: 14 },
      imageUrl: PATTERNS[activePatternIdx].value, // backing image
      caption: `${topVal} ${bottomVal}`.trim() || "Gen'Z Banter custom creation!",
      tags: ["MemeStudio", "SavageRoast", activeMascotId.toUpperCase()],
      upvotes: 24,
      downvotes: 1,
      reactions: { fire: 5, skull: 3, clown: 1, shush: 2 },
    };

    try {
      const storedMemeStr = localStorage.getItem("genz_studio_memes");
      const currentStored = storedMemeStr ? JSON.parse(storedMemeStr) : [];
      localStorage.setItem("genz_studio_memes", JSON.stringify([newMemeObj, ...currentStored]));
    } catch (e) {
      console.error(e);
    }

    setSuccessMsg("🎉 MEME SUCCESSFULLY DEPLOYED TO RCB VS CSK MATCH FEED! REDIRECTING...");
    setTimeout(() => {
      window.location.href = "/match/rcb-csk";
    }, 1800);
  };

  const activeLayer = layers.find((l) => l.id === selectedLayerId);

  return (
    <div className="min-h-screen bg-[#fff9ea] flex flex-col justify-between overflow-x-hidden relative pb-16 bg-polka">
      {/* Toast Notice */}
      {successMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-bounce bg-[#ffe400] text-black font-bangers text-xl sm:text-2xl px-6 py-2.5 memphis-border shadow-[4px_4px_0px_#000] tracking-wider select-none text-center">
          {successMsg}
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
            <div className="memphis-border-2 px-4 py-1.5 font-bangers text-lg tracking-wider bg-[#ffe400] text-black rotate-[3deg] shadow-[3px_3px_0px_#000] cursor-pointer select-none">
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

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">
        
        {/* Title row (12 columns) */}
        <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <StickerChip label="MEME CREATOR WORKSPACE" color="yellow" rotation="rotate-[2deg]" />
            </div>
            <h2 className="font-russo text-3xl sm:text-4xl text-black uppercase leading-none">
              CANVA MEME STUDIO
            </h2>
          </div>
          
          <div className="flex gap-2">
            <PixelButton variant="primary" size="sm" onClick={handleAIMemeGenerator}>
              AI RANDOMIZE 🪄
            </PixelButton>
            <PixelButton variant="secondary" size="sm" onClick={handlePostToMatch} glow>
              POST TO MATCH FEED 🚀
            </PixelButton>
          </div>
        </div>

        {/* LEFT COLUMN: Tool Panel & Layers (lg:col-span-3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Tool Panel window */}
          <RetroWindow title="DESIGN TOOLS" headerBg="bg-primary-container" showDots={false}>
            <div className="p-4 bg-white flex flex-col gap-4">
              {/* Add Layer Actions */}
              <div>
                <span className="font-mono text-[10px] font-bold text-black/60 uppercase block mb-2">ADD ELEMENT:</span>
                <div className="grid grid-cols-2 gap-2">
                  <PixelButton variant="white" size="sm" className="text-sm! py-1.5" onClick={handleAddText}>
                    ➕ ADD TEXT
                  </PixelButton>
                  <div className="relative group">
                    <PixelButton variant="white" size="sm" className="w-full text-sm! py-1.5">
                      ➕ STICKER
                    </PixelButton>
                    {/* Emoji dropdown on hover */}
                    <div className="absolute top-full left-0 right-0 bg-white memphis-border-2 p-1.5 hidden group-hover:grid grid-cols-3 gap-1 z-30 shadow-md">
                      {STICKERS.map((st) => (
                        <button
                          key={st.name}
                          type="button"
                          onClick={() => handleAddSticker(st.emoji)}
                          className="hover:bg-[#ffe400] text-center text-lg p-1"
                        >
                          {st.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background patterns picker */}
              <div>
                <span className="font-mono text-[10px] font-bold text-black/60 uppercase block mb-2">BACKGROUND PATTERN:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {PATTERNS.map((p, idx) => (
                    <button
                      key={p.name}
                      onClick={() => handleSelectPattern(p, idx)}
                      className={`h-9 border-2 border-black relative transition-all bg-cover bg-center ${
                        activePatternIdx === idx ? "scale-105 border-[#d200c1]" : "opacity-75 hover:opacity-100"
                      }`}
                      style={{ backgroundImage: `url(${p.value})` }}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>

              {/* Team Mascot Selector */}
              <div>
                <span className="font-mono text-[10px] font-bold text-black/60 uppercase block mb-2">CLAN MASCOT:</span>
                <div className="flex gap-2">
                  {TEMPLATE_MASCOTS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMascot(m)}
                      className={`w-9 h-9 border-2 border-black rounded-full overflow-hidden relative bg-white transition-all ${
                        activeMascotId === m.id ? "scale-110 border-[#ffe400] ring-2 ring-black" : "opacity-70 hover:opacity-100"
                      }`}
                      title={m.name}
                    >
                      <Image src={m.image} alt={m.name} fill className="object-contain p-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </RetroWindow>

          {/* Layers Panel window */}
          <RetroWindow title="LAYERS PANEL" headerBg="bg-secondary" className="memphis-shadow-pink">
            <div className="bg-white p-3 divide-y-2 divide-black/10 max-h-52 overflow-y-auto scrollbar-thin flex flex-col">
              {layers.map((lay) => (
                <div
                  key={lay.id}
                  onClick={() => handleSelectLayer(lay.id)}
                  className={`flex items-center justify-between py-2 px-1 cursor-pointer hover:bg-zinc-50 ${
                    selectedLayerId === lay.id ? "bg-[#ffe400]/30 border border-black border-dashed" : ""
                  }`}
                >
                  <span className="font-mono text-xs font-bold truncate max-w-[140px] uppercase">
                    {lay.type === "text" ? "📝" : lay.type === "sticker" ? "🕶️" : "🖼️"}{" "}
                    {lay.name}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {/* Hide Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVisibility(lay.id);
                      }}
                      className="text-xs hover:bg-[#b4ebff] p-0.5"
                    >
                      {lay.visible ? "👁️" : "🙈"}
                    </button>
                    {/* Delete button (except core mascot and bg) */}
                    {lay.id !== "mascot-layer" && lay.id !== "bg-layer" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLayer(lay.id);
                        }}
                        className="text-xs text-live-red hover:bg-red-50 p-0.5"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RetroWindow>
        </div>

        {/* MIDDLE COLUMN: Canvas Board Area (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <RetroWindow title="MEME CANVAS (1:1)" headerBg="bg-primary-container" bodyClassName="bg-zinc-950 p-4">
            <div className="flex items-center justify-center w-full">
              
              {/* Canvas Wrapper Board */}
              <div
                id="meme-canvas-render"
                className={`relative w-full aspect-square max-w-[420px] bg-white memphis-border overflow-hidden select-none ${
                  enhanced ? "crt-screen crt-flicker neon-glow-pink" : ""
                }`}
              >
                {/* Background Pattern Layer */}
                {layers.find((l) => l.id === "bg-layer")?.visible && (
                  <div
                    className="absolute inset-0 opacity-20 bg-repeat"
                    style={{
                      backgroundImage: `url(${layers.find((l) => l.id === "bg-layer")?.content})`,
                      backgroundSize: "120px",
                    }}
                  />
                )}

                {/* Grid guidelines */}
                <div className="absolute inset-0 bg-grid-line opacity-[0.02] pointer-events-none" />

                {/* Mascot Graphic Image Layer */}
                {layers.find((l) => l.id === "mascot-layer")?.visible && (
                  <div
                    className="absolute z-10 transition-transform duration-300"
                    style={{
                      width: `${layers.find((l) => l.id === "mascot-layer")?.size}px`,
                      height: `${layers.find((l) => l.id === "mascot-layer")?.size}px`,
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) translate(${layers.find((l) => l.id === "mascot-layer")?.x}px, ${layers.find((l) => l.id === "mascot-layer")?.y}px)`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={layers.find((l) => l.id === "mascot-layer")?.content || ""}
                        alt="Canvas Mascot"
                        fill
                        className={`object-contain ${
                          bgRemoved ? "mix-blend-multiply" : "filter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Dynamic custom layers: Text & Stickers */}
                {layers.map((lay) => {
                  if (!lay.visible || lay.type === "background" || lay.id === "mascot-layer") return null;

                  if (lay.type === "text") {
                    return (
                      <div
                        key={lay.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectLayer(lay.id);
                        }}
                        className={`absolute z-20 font-russo uppercase leading-tight text-center px-4 w-full cursor-pointer select-none ${
                          selectedLayerId === lay.id ? "outline-2 outline-dashed outline-[#d200c1]" : ""
                        }`}
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `translate(-50%, -50%) translate(${lay.x}px, ${lay.y}px) rotate(${lay.rotation}deg)`,
                          color: lay.color,
                          fontSize: `${lay.size}px`,
                          textShadow: "2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000",
                        }}
                      >
                        {lay.content}
                      </div>
                    );
                  }

                  if (lay.type === "sticker") {
                    return (
                      <div
                        key={lay.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectLayer(lay.id);
                        }}
                        className={`absolute z-30 text-center cursor-pointer select-none leading-none ${
                          selectedLayerId === lay.id ? "outline-2 outline-dashed outline-[#d200c1]" : ""
                        }`}
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `translate(-50%, -50%) translate(${lay.x}px, ${lay.y}px) rotate(${lay.rotation}deg)`,
                          fontSize: `${lay.size}px`,
                        }}
                      >
                        {lay.content}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

            </div>
          </RetroWindow>

          {/* AI Helper Actions Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <PixelButton variant="white" size="sm" className="text-xs! py-1.5" onClick={handleAIGenerateCaption}>
              💬 AI CAPTION
            </PixelButton>
            <PixelButton variant="white" size="sm" className="text-xs! py-1.5" onClick={handleAIGenerateRoast}>
              🔥 AI ROAST
            </PixelButton>
            <PixelButton
              variant={bgRemoved ? "primary" : "white"}
              size="sm"
              className="text-xs! py-1.5"
              onClick={() => setBgRemoved(!bgRemoved)}
            >
              ✂️ BG REMOVE
            </PixelButton>
            <PixelButton
              variant={enhanced ? "secondary" : "white"}
              size="sm"
              className="text-xs! py-1.5"
              onClick={() => setEnhanced(!enhanced)}
            >
              📺 CRT ENHANCE
            </PixelButton>
          </div>
        </div>

        {/* RIGHT COLUMN: Properties Panel (lg:col-span-3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <RetroWindow title="PROPERTIES" headerBg="bg-[#ffe400]">
            <div className="p-4 bg-white flex flex-col gap-4 font-mono text-xs">
              {activeLayer ? (
                <div className="flex flex-col gap-3.5">
                  <div className="border-b border-black/10 pb-2">
                    <span className="font-bold text-black uppercase">ACTIVE ELEMENT:</span>
                    <p className="font-mono text-[10px] font-bold text-[#d200c1] uppercase mt-0.5">
                      {activeLayer.name} ({activeLayer.type})
                    </p>
                  </div>

                  {/* Content Editor */}
                  {activeLayer.type === "text" && (
                    <div>
                      <label className="font-bold block mb-1">TEXT CONTENT:</label>
                      <input
                        type="text"
                        value={activeLayer.content}
                        onChange={(e) => handleUpdateLayer({ content: e.target.value })}
                        className="w-full border-2 border-black p-1.5 uppercase font-bold"
                      />
                    </div>
                  )}

                  {/* Size Adjustment */}
                  {activeLayer.size !== undefined && (
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>SIZE:</span>
                        <span>{activeLayer.size}px</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={activeLayer.type === "text" ? 64 : 320}
                        value={activeLayer.size}
                        onChange={(e) => handleUpdateLayer({ size: parseInt(e.target.value) })}
                        className="w-full accent-black cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Rotation Adjustment */}
                  {activeLayer.rotation !== undefined && (
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>ROTATION:</span>
                        <span>{activeLayer.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min={-45}
                        max={45}
                        value={activeLayer.rotation}
                        onChange={(e) => handleUpdateLayer({ rotation: parseInt(e.target.value) })}
                        className="w-full accent-black cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Position X Offset */}
                  {activeLayer.x !== undefined && (
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>POSITION X:</span>
                        <span>{activeLayer.x}px</span>
                      </div>
                      <input
                        type="range"
                        min={-200}
                        max={200}
                        value={activeLayer.x}
                        onChange={(e) => handleUpdateLayer({ x: parseInt(e.target.value) })}
                        className="w-full accent-black cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Position Y Offset */}
                  {activeLayer.y !== undefined && (
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>POSITION Y:</span>
                        <span>{activeLayer.y}px</span>
                      </div>
                      <input
                        type="range"
                        min={-200}
                        max={200}
                        value={activeLayer.y}
                        onChange={(e) => handleUpdateLayer({ y: parseInt(e.target.value) })}
                        className="w-full accent-black cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Text Color (only for text types) */}
                  {activeLayer.type === "text" && (
                    <div>
                      <label className="font-bold block mb-1">TEXT COLOR:</label>
                      <div className="flex flex-wrap gap-1">
                        {["#ffffff", "#ffe400", "#d200c1", "#b4ebff", "#dc2626", "#22c55e", "#000000"].map((c) => (
                          <button
                            key={c}
                            onClick={() => handleUpdateLayer({ color: c })}
                            className={`w-6 h-6 border border-black cursor-pointer ${
                              activeLayer.color === c ? "ring-2 ring-secondary" : ""
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-black/50">
                  <span>👈 SELECT A LAYER FROM THE LIST TO EDIT PROPERTIES</span>
                </div>
              )}
            </div>
          </RetroWindow>
        </div>

      </main>
    </div>
  );
}
