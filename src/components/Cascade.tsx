"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { caption: "Alice and Bob start in sync.", bobOffline: false, aliceGone: false, bobGone: false, showNewTask: false },
  { caption: "Bob goes offline and adds a task.", bobOffline: true, aliceGone: false, bobGone: false, showNewTask: true },
  { caption: "Alice deletes the project. Her rows fall away.", bobOffline: true, aliceGone: true, bobGone: false, showNewTask: true },
  { caption: "Bob reconnects. His new task goes with the project.", bobOffline: false, aliceGone: true, bobGone: true, showNewTask: false },
];

export default function Cascade() {
  const [step, setStep] = useState(0);
  const current = steps[step];

  const Row = ({ label, isProject, isGone, isNew }: any) => (
    <motion.div
      layout
      className={`flex items-center py-3 border-b border-white/10 text-sm ${isProject ? "font-semibold text-t1" : "pl-6 text-t2"} ${isNew ? "border border-dashed border-[#FF2DA8] rounded px-2 text-[#FF2DA8]" : ""}`}
      animate={{ opacity: isGone ? 0 : 1, y: isGone ? 50 : 0, rotate: isGone ? 5 : 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
    >
      {label}
    </motion.div>
  );

  return (
    <section id="cascade" className="py-32 px-6 max-w-6xl mx-auto bg-ink">
      <h2 className="font-display font-bold text-5xl md:text-7xl text-t1 mb-6 tracking-tight">Delete one. Everything under it goes.</h2>
      <p className="text-t2 text-lg max-w-2xl mb-16">Foreign keys survive being offline. Step through what happens when one person deletes a project while another adds a task to it.</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="border border-white/10 rounded-2xl p-8 min-h-[300px] bg-white/5">
          <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3 text-[#D4FF3F]">Alice</h3>
          {!current.aliceGone ? (
            <>
              <Row label="Project Alpha" isProject />
              <Row label="Design homepage" />
              <Row label="Write API docs" />
              <Row label="Ship v1.0" />
            </>
          ) : (
            <p className="text-t3 text-sm mt-8 italic">Nothing here.</p>
          )}
        </div>
        <div className="border border-white/10 rounded-2xl p-8 min-h-[300px] bg-white/5">
          <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3 text-[#FF2DA8]">
            Bob
            {current.bobOffline && <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#FF2DA8] text-ink ml-2">offline</span>}
          </h3>
          {!current.bobGone ? (
            <>
              <Row label="Project Alpha" isProject />
              <Row label="Design homepage" />
              <Row label="Write API docs" />
              <Row label="Ship v1.0" />
              <AnimatePresence>
                {current.showNewTask && <Row label="Fix login bug" isNew />}
              </AnimatePresence>
            </>
          ) : (
            <p className="text-t3 text-sm mt-8 italic">Nothing here.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-6">
        <button
          onClick={() => setStep((step + 1) % steps.length)}
          className="px-8 py-3 rounded-full border border-white/20 text-t1 font-medium hover:bg-white/10 transition-colors"
        >
          {step === 3 ? "Replay" : "Next step →"}
        </button>
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-semibold text-2xl md:text-3xl text-t1"
        >
          {current.caption}
        </motion.p>
      </div>
    </section>
  );
}