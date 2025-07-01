"use client"

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

// Intersection Observer for fade-in on scroll
function useRevealOnScroll() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function HomePage() {
  useRevealOnScroll();
  // Nav hide/show on scroll
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentScrollY <= 0) {
            setNavVisible(true);
          } else if (currentScrollY > lastScrollY.current) {
            setNavVisible(false); // scrolling down
          } else {
            setNavVisible(true); // scrolling up
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileMenuOpen]);

  return (
    <>
      <Head>
        <title>Claira - Your AI Women's Health Companion</title>
        <meta name="description" content="Meet Claira, your AI-powered women's health companion. Get personalized insights, expert guidance, and compassionate support for every stage of your menstrual journey." />
        <meta property="og:title" content="Claira - Your AI Women's Health Companion" />
        <meta property="og:description" content="The future of women's health is here. Join the waitlist for Claira." />
      </Head>
      <div className="min-h-screen w-full bg-cla-whitepink flex flex-col" style={{ minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <header className={`w-full bg-transparent z-20 fixed top-0 left-0 nav-bar ${navVisible ? 'nav-visible' : 'nav-hidden'}`} style={{ height: 64, paddingTop: 10 }}>
          <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-12 md:px-24" style={{ height: 64 }}>
            {/* Logo */}
            <a href="/" className="flex items-center text-[1.35rem] font-semibold tracking-tight text-black logo-font mr-12" style={{ letterSpacing: '-0.01em', fontWeight: 600 }}>
              Claira
            </a>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-12 text-[0.97rem] font-medium nav-links">
              <a href="/" className="cluely-nav-link active">Home</a>
              <a href="/features" className="cluely-nav-link">Features</a>
              <a href="/early-access" className="cluely-nav-link">Early Access</a>
            </div>
            {/* Right Side */}
            <div className="flex items-center space-x-7">
              <a
                href="/early-access"
                className="modern-black-btn"
              >
                Sign Up
              </a>
              {/* Hamburger Icon (Mobile Only) */}
              <button
                className="md:hidden ml-2 flex flex-col justify-center items-center w-10 h-10 focus:outline-none border border-red-500"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="block w-6 h-0.5 bg-black rounded transition-all duration-300 mb-1" />
                <span className="block w-6 h-0.5 bg-black rounded transition-all duration-300 mb-1" />
                <span className="block w-6 h-0.5 bg-black rounded transition-all duration-300" />
              </button>
            </div>
          </nav>
          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 md:hidden transition-opacity duration-300" style={{ animation: 'fadeIn 0.2s' }}>
              <div ref={mobileMenuRef} className="w-full max-w-sm bg-white rounded-b-2xl shadow-lg p-8 pt-6 flex flex-col items-center animate-slideDown relative">
                <button
                  className="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors text-2xl"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  &times;
                </button>
                <nav className="w-full flex flex-col gap-6 mt-8">
                  <a href="/" className="text-lg font-semibold text-black py-3 px-4 rounded hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Home</a>
                  <a href="/features" className="text-lg font-semibold text-black py-3 px-4 rounded hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Features</a>
                  <a href="/early-access" className="text-lg font-semibold text-black py-3 px-4 rounded hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Early Access</a>
                </nav>
              </div>
              <style jsx>{`
                @keyframes slideDown {
                  from { transform: translateY(-40px); opacity: 0; }
                  to { transform: translateY(0); opacity: 1; }
                }
                .animate-slideDown { animation: slideDown 0.25s cubic-bezier(.4,0,.2,1) forwards; }
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
              `}</style>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center flex-1 px-4 pt-[180px] pb-[120px]" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <h1
            className="text-[2.7rem] md:text-[4.2rem] font-extrabold leading-tight mb-[84px] text-black text-center"
            style={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.12 }}
          >
            Everything You Need.<br className="hidden md:inline" /> For Your Journey.
          </h1>
          <div className="flex flex-col items-center w-full max-w-2xl">
            <p
              className="text-[1.25rem] md:text-[1.45rem] text-black/70 font-normal text-center mb-[84px] subtitle-spaced"
              style={{ fontWeight: 400, lineHeight: 1.5 }}
            >
              Claira is your AI women's health companion<br />
              that understands your cycle, answers your questions,<br />
              and provides personalized guidance — in real time.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 mb-2">
            <a
              href="/early-access"
              className="cluely-cta-btn"
            >
              Get Early Access
            </a>
            <div className="text-[0.92rem] text-gray-500 font-medium mt-2 mb-1" style={{ color: '#6b7280', fontWeight: 500 }}>
              Join 500+ women waiting for Claira
            </div>
            <a
              href="#notify"
              className="cluely-secondary-link"
            >
              Get notified when Claira launches
            </a>
          </div>
        </main>

        {/* --- INFORMATION SECTIONS --- */}
        {/* What is Claira? */}
        <section id="what-is-claira" className="w-full flex flex-col items-center py-[120px] px-4 bg-transparent reveal">
          <div className="max-w-3xl w-full mx-auto text-center">
            <h2 className="text-[1.1rem] md:text-[1.18rem] font-medium uppercase tracking-widest text-gray-500 mb-7" style={{ letterSpacing: '0.12em' }}>
              What is Claira?
            </h2>
            <p className="text-[2.1rem] md:text-[2.7rem] font-bold leading-tight text-black mb-10" style={{ fontWeight: 700, lineHeight: 1.13 }}>
              Claira is your AI women's health companion that understands your unique menstrual cycle,<br className="hidden md:inline" /> tracks symptoms naturally, and provides personalized guidance in real-time.
            </p>
            <ul className="text-[1.18rem] md:text-[1.25rem] text-black/80 font-normal flex flex-col gap-3 items-center mb-0" style={{ fontWeight: 400, lineHeight: 1.6 }}>
              <li><span className="font-semibold text-black">•</span> Intelligent cycle prediction</li>
              <li><span className="font-semibold text-black">•</span> Symptom analysis</li>
              <li><span className="font-semibold text-black">•</span> Personalized insights</li>
              <li><span className="font-semibold text-black">•</span> Conversational support</li>
            </ul>
          </div>
        </section>

        {/* The Turning Point Section */}
        <section id="how-it-works" className="w-full flex flex-col items-center py-[120px] px-4 bg-transparent reveal">
          <div className="max-w-3xl w-full mx-auto text-center">
            <h3 className="text-[1.05rem] md:text-[1.13rem] font-medium uppercase tracking-widest text-gray-500 mb-7" style={{ letterSpacing: '0.13em' }}>
              THE UNDERSTANDING YOU'VE BEEN WAITING FOR
            </h3>
            <p className="text-[2.1rem] md:text-[2.7rem] font-bold leading-tight text-black mb-10" style={{ fontWeight: 700, lineHeight: 1.13 }}>
              Claira responds to everything about your cycle and reproductive health.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-12 mt-12">
              <div className="flex-1 min-w-[220px] text-left md:text-center">
                <h4 className="text-lg font-semibold mb-2 text-black">Track & Understand</h4>
                <p className="text-gray-700 text-base">Log periods, symptoms, and moods. Claira learns your patterns and helps you understand your body.</p>
              </div>
              <div className="flex-1 min-w-[220px] text-left md:text-center">
                <h4 className="text-lg font-semibold mb-2 text-black">Personalized Insights</h4>
                <p className="text-gray-700 text-base">Receive AI-powered recommendations and predictions tailored to your unique cycle and health goals.</p>
              </div>
              <div className="flex-1 min-w-[220px] text-left md:text-center">
                <h4 className="text-lg font-semibold mb-2 text-black">Conversational Support</h4>
                <p className="text-gray-700 text-base">Chat with Claira 24/7 for answers, support, and guidance—just like texting a trusted friend.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Not Just Another Calendar App Section */}
        <section id="not-just-calendar" className="w-full flex flex-col items-center py-[120px] px-4 bg-transparent reveal">
          <div className="max-w-3xl w-full mx-auto text-center">
            <h3 className="text-[1.05rem] md:text-[1.13rem] font-medium uppercase tracking-widest text-gray-500 mb-7" style={{ letterSpacing: '0.13em' }}>
              It's not just another calendar app.
            </h3>
            <p className="text-[2.1rem] md:text-[2.7rem] font-bold leading-tight text-black mb-10" style={{ fontWeight: 700, lineHeight: 1.13 }}>
              Claira is a responsive, smart design that adapts to help with your unique needs.<br className="hidden md:inline" /> Unlike basic tracking apps, Claira learns, understands, and grows with you.
            </p>
          </div>
        </section>
      </div>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .bg-cla-whitepink {
          background: radial-gradient(ellipse 120% 80% at 50% 0%, #fff6fa 0%, #fdf7fb 60%, #fff 100%);
        }
        .reveal {
          opacity: 0;
          transform: translateY(48px);
          transition: opacity 1s cubic-bezier(.4,0,.2,1), transform 1s cubic-bezier(.4,0,.2,1);
        }
        .reveal.revealed {
          opacity: 1;
          transform: none;
        }
        .logo-font {
          font-family: 'Inter', 'SF Pro Display', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          font-size: 1.35rem;
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
        .cluely-cta-btn {
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          min-height: 38px;
          background: transparent;
          color: #000;
          border: none;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        .cluely-cta-btn::before,
        .cluely-cta-btn::after {
          content: '';
          position: absolute;
          left: 50%;
          width: 0;
          height: 1px;
          background: #000;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .cluely-cta-btn::before { top: 0; }
        .cluely-cta-btn::after { bottom: 0; }
        .cluely-cta-btn:hover::before,
        .cluely-cta-btn:hover::after {
          width: 100%;
        }
        .cluely-cta-btn:hover {
          color: #000;
        }
        .cluely-secondary-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: #d72660;
          font-size: 1.08rem;
          font-weight: 500;
          text-decoration: underline;
          transition: color 0.18s;
          background: none;
          border: none;
          cursor: pointer;
        }
        .cluely-secondary-link:hover {
          color: #111;
        }
        .subtitle-spaced {
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          word-break: keep-all;
        }
        a, button {
          outline: none;
        }
        @media (max-width: 768px) {
          .max-w-5xl, .max-w-7xl, .max-w-2xl {
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
        a[href="/"] {
          text-decoration: none;
          transition: opacity 0.18s ease;
        }
        a[href="/"]:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
} 