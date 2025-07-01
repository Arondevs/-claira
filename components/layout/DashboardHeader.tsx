'use client';

import { useSession } from 'next-auth/react';
import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="card flex items-center justify-between px-4 py-3 mb-4 sticky top-0 z-40 shadow-soft rounded-lgCard">
      {/* Left side */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-textPrimary">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-textSecondary" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 bg-background border-none rounded-card shadow-soft placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent sm:text-sm"
          />
        </div>

        {/* Create Post Button */}
        <Button href="/dashboard/posts/create" className="hidden sm:inline-flex bg-accent text-white rounded-card shadow-soft px-4 py-2 font-medium">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>

        {/* Notifications */}
        <button className="relative p-2 text-textSecondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-full bg-background shadow-soft">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-pink-400"></span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-accent">
            <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-soft">
              <span className="text-white font-medium text-base">
                {session?.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-textPrimary">{session?.user?.name}</p>
              <p className="text-xs text-textSecondary">{session?.user?.email}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
} 