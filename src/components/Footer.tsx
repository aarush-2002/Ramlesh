"use client";

export default function Footer() {
  return (
    <footer className="min-h-[80vh] flex flex-col justify-between px-6 py-20 bg-ink border-t border-white/10">
      <h2 className="font-display font-bold text-[15vw] leading-none text-transparent [-webkit-text-stroke:2px_white] hover:text-[#FF2DA8] hover:[-webkit-text-stroke-color:#FF2DA8] transition-colors duration-500 cursor-default text-center">
        converge.
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-20">
        <p className="text-t2 text-lg max-w-md">Relamesh is open source. Phase 1 starts with a terminal and a SQLite file.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-8 py-3 rounded-full bg-[#D4FF3F] text-ink font-bold text-lg hover:bg-white transition-colors"
        >
          Merge again
        </button>
      </div>
    </footer>
  );
}