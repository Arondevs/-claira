'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { 
  Calendar, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-postflow-600"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user?.name || 'User'}! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your social media accounts today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-accentPink" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Scheduled Posts</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published Today</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">2.4K</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Connected Accounts</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
                  <button className="btn-primary inline-flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      content: "Just launched our new product! 🚀 Check it out and let us know what you think. #launch #product #innovation",
                      platform: "Instagram",
                      status: "published",
                      time: "2 hours ago",
                      engagement: 245
                    },
                    {
                      id: 2,
                      content: "Excited to share some insights from our latest research on social media trends...",
                      platform: "Twitter",
                      status: "scheduled",
                      time: "Tomorrow at 9:00 AM",
                      engagement: 0
                    },
                    {
                      id: 3,
                      content: "We're hiring! Looking for talented developers to join our team...",
                      platform: "LinkedIn",
                      status: "draft",
                      time: "Draft",
                      engagement: 0
                    }
                  ].map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-900 mb-2 line-clamp-2">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="capitalize">{post.platform}</span>
                            <span>•</span>
                            <span>{post.time}</span>
                            {post.engagement > 0 && (
                              <>
                                <span>•</span>
                                <span>{post.engagement} engagements</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          {post.status === 'published' && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {post.status === 'scheduled' && (
                            <Clock className="h-5 w-5 text-blue-500" />
                          )}
                          {post.status === 'draft' && (
                            <AlertCircle className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions & Analytics */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-left">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </button>
                  <button className="w-full btn-outline text-left">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </button>
                  <button className="w-full btn-outline text-left">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </button>
                </div>
              </Card>

              {/* Platform Performance */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
                <div className="space-y-4">
                  {[
                    { platform: 'Instagram', engagement: 1240, growth: '+12%' },
                    { platform: 'Twitter', engagement: 890, growth: '+8%' },
                    { platform: 'LinkedIn', engagement: 567, growth: '+15%' },
                    { platform: 'TikTok', engagement: 2340, growth: '+23%' }
                  ].map((item) => (
                    <div key={item.platform} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-postflow-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{item.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{item.engagement}</div>
                        <div className="text-sm text-green-600">{item.growth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 