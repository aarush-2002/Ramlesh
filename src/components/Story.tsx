"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  { text: "Alice", color: "text-t1" },
  { text: "edits", color: "text-t1" },
  { text: "the", color: "text-t1" },
  { text: "title.", color: "text-t1" },
  { text: "Bob", color: "text-t1" },
  { text: "moves", color: "text-t1" },
  { text: "the", color: "text-t1" },
  { text: "card.", color: "text-t1" },
  { text: "Both", color: "text-t1" },
  { text: "are", color: "text-t1" },
  { text: "offline.", color: "text-[#FF2DA8]" },
  { text: "Nobody", color: "text-t1" },
  { text: "loses", color: "text-t1" },
  { text: "a", color: "text-t1" },
  { text: "thing.", color: "text-[#D4FF3F]" },
];

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="story" ref={containerRef} className="h-[300vh] relative bg-ink">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl text-center">
          <p className="font-display font-bold text-5xl md:text-7xl lg:text-9xl leading-[0.9] tracking-tighter">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

              return (
                <motion.span
                  key={i}
                  className={`inline-block mx-[0.2em] ${word.color}`}
                  style={{ opacity }}
                >
                  {word.text}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}