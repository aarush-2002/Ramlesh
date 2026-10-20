"use client";
import { useSync } from "@/context/SyncContext";

export default function Navbar() {
  const { isOffline } = useSync();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 bg-ink/80 backdrop-blur-md border-b border-white/5">
      <div className="font-display font-bold text-2xl text-t1 tracking-tight">relamesh</div>
      <div
        className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
          isOffline ? "bg-[#FF2DA8] text-ink" : "bg-white/10 text-t1 border border-white/10"
        }`}
      >
        <div className={`w-2 h-2 rounded-full ${isOffline ? "bg-ink" : "bg-[#D4FF3F]"}`} />
        {isOffline ? "Offline" : "Synced"}
      </div>
    </nav>
  );
}