"use client";
import { motion } from "framer-motion";
import { useSync } from "@/context/SyncContext";

export default function Hero() {
  const { isOffline, toggleOffline } = useSync();

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 bg-ink pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display font-bold text-6xl md:text-8xl text-t1 mb-6 text-center tracking-tight"
      >
        Local-first sync for SQLite.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-t2 mb-16 text-center max-w-2xl"
      >
        Edit offline, merge without losing a thing.
      </motion.p>

      <div className="flex items-center gap-12 mb-16">
        <motion.div
          animate={{ x: isOffline ? -120 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-32 h-32 rounded-full bg-[#D4FF3F] flex items-center justify-center text-ink text-4xl font-bold shadow-[0_0_40px_rgba(212,255,63,0.3)]"
        >
          A
        </motion.div>
        <motion.div
          animate={{ x: isOffline ? 120 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-32 h-32 rounded-full bg-[#FF2DA8] flex items-center justify-center text-ink text-4xl font-bold shadow-[0_0_40px_rgba(255,45,168,0.3)]"
        >
          B
        </motion.div>
      </div>

      <button
        onClick={toggleOffline}
        className="px-8 py-3 rounded-full border border-white/20 text-t1 font-medium hover:bg-white/10 transition-all duration-300"
      >
        {isOffline ? "Reconnect" : "Go offline"}
      </button>
    </section>
  );
}