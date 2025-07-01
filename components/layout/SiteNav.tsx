"use client";

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function SiteNav({ active }: { active?: "home" | "features" | "early-access" }) {
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  return (
    <header className={`w-full bg-transparent z-20 fixed top-0 left-0 nav-bar ${navVisible ? "nav-visible" : "nav-hidden"}`} style={{ height: 64, paddingTop: 10 }}>
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-12 md:px-24" style={{ height: 64 }}>
        {/* Logo */}
        <a href="/" className="flex items-center text-[1.35rem] font-semibold tracking-tight text-black logo-font mr-12" style={{ letterSpacing: "-0.01em", fontWeight: 600 }}>
          Claira
        </a>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-12 text-[0.97rem] font-medium nav-links">
          <a href="/" className={`cluely-nav-link${active === "home" ? " active" : ""}`}>Home</a>
          <a href="/features" className={`cluely-nav-link${active === "features" ? " active" : ""}`}>Features</a>
          <a href="/early-access" className={`cluely-nav-link${active === "early-access" ? " active" : ""}`}>Early Access</a>
        </div>
        {/* Right Side */}
        <div className="flex items-center space-x-7">
          <a href="/early-access" className="modern-black-btn">
            Sign Up
          </a>
          {/* Hamburger Icon (Mobile Only) */}
          <button
            className="md:hidden ml-2 flex flex-col justify-center items-center w-10 h-10 focus:outline-none border border-red-500"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <span className="block w-6 h-0.5 bg-black rounded transition-all duration-300 mb-1" />
            <span className="block w-6 h-0.5 bg-black rounded transition-all duration-300 mb-1" />
            <span className="block w-6 h-0.5 bg-black rounded transition-all duration-300" />
          </button>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 md:hidden transition-opacity duration-300" style={{ animation: "fadeIn 0.2s" }}>
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
  );
} 