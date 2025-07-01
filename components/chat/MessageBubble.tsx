'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx(
        'card max-w-[85%] md:max-w-[60%] px-5 py-3 mb-2',
        isUser
          ? 'ml-auto bg-accent text-white rounded-card shadow-soft'
          : 'mr-auto bg-white text-textPrimary rounded-card shadow-soft'
      )}
      style={{
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <span className="whitespace-pre-line leading-relaxed text-base">{content}</span>
    </motion.div>
  );
} 