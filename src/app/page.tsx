import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-3 border-b border-slate-200 bg-white">
        <img src="/logos/nisa.svg" alt="Nisa" className="h-7" />
        <div className="h-5 w-px bg-slate-200" />
        <h1 className="text-sm font-medium text-slate-600">
          Lesson Plan Generator
        </h1>
      </header>

      {/* Chat */}
      <main className="flex-1 overflow-hidden">
        <Chat />
      </main>
    </div>
  );
}
