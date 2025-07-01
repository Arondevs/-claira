'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  MessageCircleHeart,
  HeartPulse,
  Smile,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Cycle Tracker', href: '/dashboard/cycles', icon: Calendar },
  { name: 'Symptom Log', href: '/dashboard/symptoms', icon: HeartPulse },
  { name: 'Chat with Claira', href: '/dashboard/chat', icon: MessageCircleHeart },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-72 flex-col card shadow-soft rounded-lgCard p-0">
          <div className="flex h-16 items-center justify-between px-6 border-b-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-accent rounded-lgCard flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-textPrimary">Claira</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-textSecondary hover:text-accent"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-card transition-colors shadow-none ${
                    isActive
                      ? 'bg-accent bg-opacity-10 text-accent'
                      : 'text-textSecondary hover:bg-background hover:text-textPrimary'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          {/* User section */}
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-soft">
                <span className="text-white font-medium text-lg">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-textPrimary">{session?.user?.name}</p>
                <p className="text-xs text-textSecondary">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-textSecondary hover:bg-background hover:text-textPrimary rounded-card transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow card shadow-soft rounded-lgCard p-0">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-accent rounded-lgCard flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-textPrimary">Claira</span>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-card transition-colors shadow-none ${
                    isActive
                      ? 'bg-accent bg-opacity-10 text-accent'
                      : 'text-textSecondary hover:bg-background hover:text-textPrimary'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          {/* User section */}
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-soft">
                <span className="text-white font-medium text-lg">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-textPrimary">{session?.user?.name}</p>
                <p className="text-xs text-textSecondary">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-textSecondary hover:bg-background hover:text-textPrimary rounded-card transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-3 rounded-lgCard bg-white shadow-soft border-none text-textSecondary hover:text-accent"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
} 