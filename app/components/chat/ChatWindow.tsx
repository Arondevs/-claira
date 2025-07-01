import React from 'react';

interface Message {
  id?: string | number;
  role: string;
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => (
  <div className="chat-container flex h-full bg-white">
    {/* Sidebar */}
    <aside className="chat-sidebar w-64 bg-white border-r border-gray-200">
      {/* ...sidebar content... */}
    </aside>
    {/* Main chat area */}
    <main className="flex-1 flex flex-col justify-between bg-gray-50">
      {/* ...chat messages... */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={
              msg.role === 'user'
                ? 'user-message mb-4 p-4 max-w-lg ml-auto bg-black text-white rounded-lg shadow'
                : 'ai-message mb-4 p-4 max-w-lg mr-auto bg-gray-100 text-black rounded-lg shadow'
            }
          >
            {msg.content}
          </div>
        ))}
      </div>
      {/* Input area */}
      <form className="chat-input flex items-center p-4 bg-white border-t border-gray-200">
        {/* ...input and button... */}
      </form>
    </main>
  </div>
);

export default ChatWindow; 