"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
};

const columns = [
  { id: "todo", title: "TODO", color: "#8A8A8A" },
  { id: "in_progress", title: "IN PROGRESS", color: "#D4FF3F" },
  { id: "done", title: "DONE", color: "#FF2DA8" },
];

const defaultTasks: Task[] = [
  { id: "task-1", title: "Design Homepage", status: "todo" },
  { id: "task-2", title: "Setup Rust Engine", status: "in_progress" },
  { id: "task-3", title: "Deploy to Vercel", status: "done" },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"synced" | "offline" | "syncing">("synced");

  // Load tasks with ID conversion
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("relamesh_tasks");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Force all IDs to be strings with prefix
        const cleanTasks: Task[] = parsed.map((task: any) => ({
          id: String(task.id).startsWith("task-") ? String(task.id) : `task-${String(task.id)}`,
          title: String(task.title || ""),
          status: ["todo", "in_progress", "done"].includes(task.status) ? task.status : "todo",
        }));
        setTasks(cleanTasks);
      } else {
        setTasks(defaultTasks);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks(defaultTasks);
    }
    setIsLoading(false);
  }, []);

  // Save tasks
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("relamesh_tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask,
      status: "todo",
    };
    setTasks([...tasks, task]);
    setNewTask("");
    
    if (!isOffline) {
      setSyncStatus("syncing");
      setTimeout(() => setSyncStatus("synced"), 500);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCache = () => {
    localStorage.removeItem("relamesh_tasks");
    setTasks(defaultTasks);
    setSyncStatus("syncing");
    setTimeout(() => setSyncStatus("synced"), 500);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destId = result.destination.droppableId;

    // Get tasks in source and destination columns
    const sourceTasks = tasks.filter((t) => t.status === sourceId);
    const destTasks = tasks.filter((t) => t.status === destId);

    // Move the task
    const [movedTask] = sourceTasks.splice(result.source.index, 1);
    movedTask.status = destId as Task["status"];
    destTasks.splice(result.destination.index, 0, movedTask);

    // Rebuild the full tasks array
    const newTasks = [
      ...tasks.filter((t) => t.status !== sourceId && t.status !== destId),
      ...sourceTasks,
      ...destTasks,
    ];

    setTasks(newTasks);

    if (!isOffline) {
      setSyncStatus("syncing");
      setTimeout(() => setSyncStatus("synced"), 500);
    }
  };

  const toggleOffline = () => {
    setIsOffline(!isOffline);
    setSyncStatus(!isOffline ? "offline" : "syncing");
    if (!isOffline) {
      setTimeout(() => setSyncStatus("synced"), 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#D4FF3F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#D4FF3F] font-display text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#EDEDED]">
      <nav className="border-b border-white/10 px-8 py-4 flex justify-between items-center sticky top-0 bg-[#0B0B0B]/90 backdrop-blur-md z-50">
        <Link href="/" className="font-display font-bold text-2xl tracking-tight hover:text-[#D4FF3F] transition-colors">
          ← Relamesh
        </Link>
        
        <div className="flex items-center gap-4">
          <button
            onClick={clearCache}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/60 hover:bg-white/10 transition-all"
          >
            Clear Cache
          </button>

          <button
            onClick={toggleOffline}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              isOffline ? "bg-[#FF2DA8] text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isOffline ? "bg-white" : "bg-[#D4FF3F]"}`} />
            {isOffline ? "Offline" : "Online"}
          </button>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
            syncStatus === "synced" ? "bg-[#D4FF3F]/10 border-[#D4FF3F]/20" :
            syncStatus === "offline" ? "bg-[#FF2DA8]/10 border-[#FF2DA8]/20" :
            "bg-white/5 border-white/10"
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              syncStatus === "synced" ? "bg-[#D4FF3F]" :
              syncStatus === "offline" ? "bg-[#FF2DA8]" :
              "bg-white/40"
            }`} />
            <span className={`text-xs font-medium ${
              syncStatus === "synced" ? "text-[#D4FF3F]" :
              syncStatus === "offline" ? "text-[#FF2DA8]" :
              "text-white/60"
            }`}>
              {syncStatus === "synced" ? "Synced" : syncStatus === "offline" ? "Offline" : "Syncing..."}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-5xl mb-2">Project Alpha</h1>
          <p className="text-white/40 text-sm">Drag tasks between columns to update status</p>
        </div>

        <div className="flex gap-4 mb-12">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder={isOffline ? "Add task (will sync when online)..." : "Add a new task..."}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4FF3F]/50 transition-colors"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 rounded-lg bg-[#D4FF3F] text-[#0B0B0B] font-bold hover:bg-white transition-colors"
          >
            Add Task
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <div key={column.id} className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-sm tracking-wider" style={{ color: column.color }}>
                    {column.title}
                  </h3>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/40">
                    {tasks.filter((t) => t.status === column.id).length}
                  </span>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-3 min-h-[100px] transition-colors rounded-lg ${
                        snapshot.isDraggingOver ? "bg-white/5 p-2" : "p-0"
                      }`}
                    >
                      {tasks
                        .filter((t) => t.status === column.id)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-[#111] border rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all ${
                                  snapshot.isDragging
                                    ? "border-[#D4FF3F] shadow-lg shadow-[#D4FF3F]/20 rotate-1 scale-105"
                                    : "border-white/10 hover:border-white/30"
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <p className="text-sm font-medium flex-1">{task.title}</p>
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-white/30 hover:text-[#FF2DA8] transition-colors ml-2 text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}