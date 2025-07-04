"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import Head from 'next/head';
import SiteNav from "@/components/layout/SiteNav";

function useRevealOnScroll() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, i * 100);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function EarlyAccessPage() {
  useRevealOnScroll();
  
  // Form state with Supabase integration
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    challenge: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate email
      if (!formData.email || !formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Save to Supabase
      const { error } = await supabase.from('waitlist').insert([
        {
          email: formData.email,
          name: formData.name,
          challenge: formData.challenge,
        },
      ]);
      if (error) throw error;

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000);
      setFormData({ email: '', name: '', challenge: '' });
    } catch (error: any) {
      console.error('Signup error:', error, JSON.stringify(error));
      let details = error.details || '';
      let json = '';
      try { json = JSON.stringify(error); } catch {}
      setSubmitMessage(`❌ ${error.message || ''} ${details} ${json || ''}`.trim() || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Head>
        <title>Get Early Access - Claira</title>
        <meta name="description" content="Join the waitlist for early access to Claira, your AI women's health companion." />
        <meta property="og:title" content="Get Early Access - Claira" />
        <meta property="og:description" content="Join the waitlist for early access to Claira, your AI women's health companion." />
      </Head>
      <div className="min-h-screen w-full bg-cla-whitepink flex flex-col" style={{ minHeight: "100vh" }}>
        {/* Navigation Bar */}
        <SiteNav active="early-access" />
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 px-8 pt-[100px] pb-[60px] max-w-3xl mx-auto">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-normal leading-tight mb-[60px] text-black text-center tracking-tight">
            Join the Founding Circle.
          </h1>
          
          <p className="text-[1rem] text-gray-600 font-light text-center mb-[80px] max-w-xl leading-relaxed">
            Join 500+ women who are ready for smarter period tracking
          </p>

          {showSuccessPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white text-black px-8 py-6 rounded-xl shadow-lg border border-gray-200 animate-popup-success transition-all duration-300"
                   style={{ minWidth: 320, maxWidth: '90vw', fontSize: '1.1rem', fontWeight: 500 }}>
                Welcome to the waitlist! We&apos;ll be in touch soon.
              </div>
              <style jsx>{`
                .animate-popup-success {
                  animation: popup-fade-scale 0.4s cubic-bezier(0.4,0,0.2,1);
                }
                @keyframes popup-fade-scale {
                  0% { opacity: 0; transform: scale(0.85) translateY(30px); }
                  100% { opacity: 1; transform: scale(1) translateY(0); }
                }
              `}</style>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                required
                disabled={isSubmitting}
                className="w-full p-2.5 border border-gray-200 rounded-md text-black bg-white focus:border-gray-400 focus:outline-none disabled:opacity-50 text-sm transition-all duration-200"
              />
            </div>

            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name (optional)"
                disabled={isSubmitting}
                className="w-full p-2.5 border border-gray-200 rounded-md text-black bg-white focus:border-gray-400 focus:outline-none disabled:opacity-50 text-sm transition-all duration-200"
              />
            </div>

            <div>
              <select
                name="challenge"
                value={formData.challenge}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full p-4 border border-gray-300 rounded-lg text-black bg-white focus:border-black focus:outline-none disabled:opacity-50"
              >
                <option value="">What's your biggest period challenge?</option>
                <option value="unpredictable">Unpredictable cycle timing</option>
                <option value="painful">Painful or difficult symptoms</option>
                <option value="insights">Lack of personalized insights</option>
                <option value="basic">Current apps are too basic</option>
                <option value="inaccurate">Inaccurate period predictions</option>
                <option value="pms">Need better PMS management</option>
                <option value="guidance">Want real-time AI guidance</option>
                <option value="privacy">Privacy concerns</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="modern-black-btn"
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>

            {submitMessage && (
              <div className={`text-center p-3 rounded ${
                submitMessage.includes('❌') ? 'text-red-600' : 'text-green-600'
              }`}>
                {submitMessage}
              </div>
            )}
          </form>

          <p className="text-gray-600 text-center mt-6">
            We'll notify you as soon as Claira is ready
          </p>
        </main>

        {/* Animations, Gradient, and Button Styles (copied from homepage) */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          .bg-cla-whitepink {
            background: radial-gradient(ellipse 120% 80% at 50% 0%, #fff6fa 0%, #fdf7fb 60%, #fff 100%);
          }
          .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4,0,0.2,1);
          }
          .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
          }
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
          }
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .nav-bar {
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          }
          .nav-visible {
            transform: translateY(0);
            opacity: 1;
          }
          .nav-hidden {
            transform: translateY(-100%);
            opacity: 0;
          }
          .logo-font {
            font-family: 'Inter', 'SF Pro Display', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            font-size: 1.35rem;
          }
          a[href="/"] {
            text-decoration: none;
            transition: opacity 0.18s ease;
          }
          a[href="/"]:hover {
            opacity: 0.8;
          }
          .cluely-nav-link {
            background: none;
            border: none;
            color: #18181b;
            font-size: 0.97rem;
            font-weight: 500;
            padding: 0 0.5rem 0.1rem 0.5rem;
            border-radius: 0;
            cursor: pointer;
            position: relative;
            transition: color 0.18s;
          }
          .cluely-nav-link:after {
            content: '';
            display: block;
            margin: 0 auto;
            width: 0;
            height: 2px;
            background: #18181b;
            transition: width 0.22s cubic-bezier(.4,0,.2,1);
          }
          .cluely-nav-link:hover:after {
            width: 100%;
          }
          .cluely-nav-link:hover {
            color: #18181b;
          }
          .cluely-nav-link.active {
            color: #18181b;
          }
          .cluely-nav-link.active:after {
            width: 100%;
          }
          .cluely-login-link {
            color: #18181b;
            font-size: 0.97rem;
            font-weight: 500;
            text-decoration: none;
            padding: 0 0.5rem;
            border-radius: 8px;
            transition: color 0.18s;
          }
          .cluely-login-link:hover {
            color: #18181b;
            text-decoration: underline;
          }
          .cluely-signup-btn {
            display: inline-flex;
            align-items: center;
            background: transparent;
            color: #000;
            border: none;
            padding: 0.5rem 1.2rem;
            font-size: 0.97rem;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          .cluely-signup-btn::before,
          .cluely-signup-btn::after {
            content: '';
            position: absolute;
            left: 50%;
            width: 0;
            height: 1px;
            background: #000;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          .cluely-signup-btn::before { top: 0; }
          .cluely-signup-btn::after { bottom: 0; }
          .cluely-signup-btn:hover::before,
          .cluely-signup-btn:hover::after {
            width: 100%;
          }
          .cluely-signup-btn:hover {
            color: #000;
          }
          .modern-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            color: #000;
            border: none;
            padding: 0.5rem 1.2rem;
            font-size: 0.97rem;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          .modern-button::before,
          .modern-button::after {
            content: '';
            position: absolute;
            left: 50%;
            width: 0;
            height: 1px;
            background: #000;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          .modern-button::before { top: 0; }
          .modern-button::after { bottom: 0; }
          .modern-button:hover::before,
          .modern-button:hover::after {
            width: 100%;
          }
          .modern-button:hover {
            color: #000;
          }
          .waitlist-input {
            width: 100%;
            padding: 0.625rem 0.875rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: #fff;
            color: #000;
            font-size: 0.875rem;
            font-weight: 400;
            transition: border 0.15s, box-shadow 0.15s;
            outline: none;
            margin-bottom: 0;
            height: 38px;
          }
          .waitlist-input:focus {
            border: 1px solid #ec4899;
            box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.1);
          }
          .waitlist-input::placeholder {
            color: #9ca3af;
            font-weight: 400;
          }
          select {
            color: #000000 !important;
            background-color: #ffffff !important;
          }
          select option {
            color: #000000 !important;
            background-color: #ffffff !important;
          }
          @media (max-width: 768px) {
            .max-w-5xl, .max-w-7xl, .max-w-2xl, .max-w-xl, .max-w-md {
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }
            h1 {
              font-size: 2.1rem !important;
            }
            nav {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
          }
        `}</style>
      </div>
    </>
  );
} 