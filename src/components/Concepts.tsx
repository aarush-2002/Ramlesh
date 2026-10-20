"use client";
import { motion } from "framer-motion";

const concepts = [
  { word: "Clocks", desc: "Hybrid logical clocks order edits without trusting anyone's wall clock." },
  { word: "Tombstones", desc: "Deletes are remembered, so old edits can't bring a row back." },
  { word: "Idempotent", desc: "Receive the same change twice and nothing changes. Order doesn't matter either." },
  { word: "Cascades", desc: "Child rows disappear with their parent on every copy, with no extra messages." },
];

export default function Concepts() {
  return (
    <section id="ideas" className="py-32 px-6 max-w-6xl mx-auto bg-ink">
      {concepts.map((c, i) => (
        <motion.div
          key={i}
          className="group border-t border-white/10 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer"
          whileHover={{ x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={`font-display font-bold text-6xl md:text-8xl tracking-tighter transition-colors duration-500 ${i % 2 === 0 ? "group-hover:text-[#D4FF3F]" : "group-hover:text-[#FF2DA8]"}`}>
            {c.word}
          </h3>
          <p className="text-t2 max-w-md text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {c.desc}
          </p>
        </motion.div>
      ))}
      <div className="border-t border-white/10" />
    </section>
  );
}