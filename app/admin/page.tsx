"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface WaitlistSignup {
  id: number;
  email: string;
  name: string | null;
  challenge: string | null;
  signup_date: string;
  source: string;
}

export default function AdminPage() {
  const [signups, setSignups] = useState<WaitlistSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchSignups();
  }, []);
  
  const fetchSignups = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('waitlist_signups')
        .select('*')
        .order('signup_date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setSignups(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading signups...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Waitlist Signups ({signups.length})
          </h1>
          <p className="text-gray-600 mb-6">
            View all waitlist submissions from the Early Access page
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Challenge</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Source</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup) => (
                  <tr key={signup.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{signup.email}</td>
                    <td className="py-3 px-4 text-gray-700">{signup.name || '-'}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {signup.challenge ? (
                        <span className="inline-block bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">
                          {signup.challenge}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(signup.signup_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{signup.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {signups.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No signups yet. Share your Early Access page to start collecting leads!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 