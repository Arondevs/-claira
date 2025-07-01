'use client';

import MessageBubble from 'components/chat/MessageBubble';
import { useRef, useEffect, useState } from 'react';

export default function ChatWindow() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant' as 'assistant',
      content: "Hi! I'm Claira, your AI period coach. How are you feeling today?",
    },
    {
      id: '2',
      role: 'user' as 'user',
      content: "I'm feeling a bit moody and have some cramps.",
    },
    {
      id: '3',
      role: 'assistant' as 'assistant',
      content: "I'm here for you! Cramps and mood swings are common. What day of your cycle are you on? Would you like some tips for relief? 💜",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setError(null);
    setLoading(true);
    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    try {
      console.log('Sending message to /api/chat:', input);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to get response');
      }
      if (!res.body) throw new Error('No response body');
      let aiMsg = {
        id: Date.now().toString() + '-ai',
        role: 'assistant' as 'assistant',
        content: '',
      };
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        aiMsg.content += chunk;
        setMessages((prev) => {
          if (prev[prev.length - 1]?.id === aiMsg.id) {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: aiMsg.content } : m
            );
          } else {
            return [...prev, { ...aiMsg }];
          }
        });
      }
    } catch (err: any) {
      setError(err.message || 'Error sending message');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-clip-padding bg-cla ira-gradient min-h-screen">
      {/* Header */}
      <div className="card flex items-center justify-between px-6 py-4 mb-2 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">C</div>
          <span className="text-xl font-semibold tracking-tight">Claira</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-backgroundSecondary border border-borderSecondary flex items-center justify-center">
          {/* Placeholder for user avatar */}
          <span className="text-lg font-medium text-accent">A</span>
        </div>
      </div>
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 md:px-4 md:py-4 space-y-4 pb-32">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Error */}
      {error && (
        <div className="px-4 pb-2 text-red-500 text-sm text-center">{error}</div>
      )}
      {/* Input card */}
      <div className="fixed bottom-0 left-0 w-full px-2 pb-4 z-20">
        <form className="card flex items-center gap-2 shadow-soft border-none rounded-lgCard px-4 py-3" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none text-base text-textPrimary placeholder-textSecondary"
            value={input}
            onChange={handleInputChange}
            autoFocus
            disabled={loading}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-card font-semibold bg-accent-gradient text-white shadow-soft hover:opacity-90 transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || !input.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
} 