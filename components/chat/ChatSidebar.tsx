'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function ChatSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-72 h-full bg-backgroundSecondary border-r border-borderSecondary text-textPrimary">
      <div className="flex items-center justify-between px-6 py-6 border-b border-borderSecondary">
        <span className="text-2xl font-semibold tracking-tight">Claira</span>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-2 rounded-sharp bg-accent text-white font-medium shadow-crisp hover:bg-opacity-90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Chat
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Placeholder for chat history */}
        <div className="text-textSecondary text-sm italic text-center mt-12">
          Your chats with Claira will appear here.
        </div>
      </div>
      <div className="px-6 py-4 border-t border-borderSecondary text-xs text-textSecondary">
        &copy; {new Date().getFullYear()} Claira. All rights reserved.
      </div>
    </aside>
  );
} 