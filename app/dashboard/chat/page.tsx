'use client';

import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-pink-200">
      <ChatSidebar />
      <main className="flex-1 flex flex-col">
        <ChatWindow />
      </main>
    </div>
  );
} 