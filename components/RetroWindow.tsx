import React from "react";

interface RetroWindowProps {
  title?: string;
  headerBg?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  onClose?: () => void;
  showDots?: boolean;
}

export default function RetroWindow({
  title = "GEN'Z SYSTEM v1.0",
  headerBg = "bg-primary-container",
  children,
  className = "",
  bodyClassName = "",
  onClose,
  showDots = true,
}: RetroWindowProps) {
  return (
    <div className={`memphis-border memphis-shadow bg-white flex flex-col ${className}`}>
      {/* Title Bar */}
      <div className={`memphis-border-2 border-t-0 border-l-0 border-r-0 border-b-4 border-black px-4 py-2.5 flex items-center justify-between font-russo uppercase select-none ${headerBg}`}>
        <div className="flex items-center gap-3">
          {showDots && (
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-black bg-live-red inline-block" />
              <span className="w-3.5 h-3.5 rounded-full border-2 border-black bg-[#facc15] inline-block" />
              <span className="w-3.5 h-3.5 rounded-full border-2 border-black bg-[#22c55e] inline-block" />
            </div>
          )}
          <span className="text-sm sm:text-base font-bold text-black tracking-wide truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {onClose ? (
            <button
              onClick={onClose}
              className="memphis-border-2 bg-white text-black text-xs font-bold font-mono px-2 py-0.5 hover:bg-live-red hover:text-white cursor-pointer active:translate-y-[2px]"
            >
              X
            </button>
          ) : (
            <div className="flex gap-1.5 font-mono text-xs font-bold text-black opacity-80">
              <span className="px-1.5 py-0.5 border border-black bg-white select-none">?</span>
              <span className="px-1.5 py-0.5 border border-black bg-white select-none">-</span>
            </div>
          )}
        </div>
      </div>

      {/* Window Body */}
      <div className={`flex-1 relative ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
