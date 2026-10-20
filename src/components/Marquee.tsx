"use client";
import { motion } from "framer-motion";

const items = [
  "hybrid logical clocks",
  "tombstones",
  "idempotent ops",
  "derived cascades",
  "delta sync",
];

export default function Marquee() {
  return (
    <section id="marquee" className="py-16 border-y border-white/10 bg-ink overflow-hidden">
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-16 shrink-0"
          animate={{ x: [0, -1500] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="font-display font-bold text-6xl md:text-8xl text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] whitespace-nowrap">
                {item}
              </span>
              <div className="w-3 h-3 rounded-full bg-[#FF2DA8]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}