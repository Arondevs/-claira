"use client";

import { useState, useEffect, useRef } from "react";
import Head from 'next/head';

// Fade-in on scroll (matches homepage/waitlist)
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

// Word-by-word scroll animation
function useScrollWordAnimation() {
  useEffect(() => {
    const initScrollWordAnimation = () => {
      const textSections = document.querySelectorAll('[data-scroll-text]');
      
      textSections.forEach(section => {
        const words = section.querySelectorAll('.scroll-word');
        
        // Create intersection observer for each section
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateWordAnimation(entry.target, words);
            }
          });
        }, {
          threshold: 0,
          rootMargin: '-10% 0px -10% 0px'
        });
        
        observer.observe(section);
      });
    };

    const updateWordAnimation = (section: Element, words: NodeListOf<Element>) => {
      const animateWords = () => {
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress through the section - more sensitive
        const scrollProgress = Math.max(0, Math.min(1, 
          (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.5)
        ));
        
        // Calculate how many words should be active - faster activation
        const activeWordCount = Math.floor(scrollProgress * words.length * 1.5);
        
        // Update word states
        words.forEach((word, index) => {
          if (index < activeWordCount) {
            word.classList.add('active');
          } else {
            word.classList.remove('active');
          }
        });
      };

      const throttledAnimate = throttle(animateWords, 8); // Faster throttle
      window.addEventListener('scroll', throttledAnimate);
      
      // Initial call
      animateWords();
      
      // Cleanup
      return () => window.removeEventListener('scroll', throttledAnimate);
    };

    // Throttle function for performance
    const throttle = (func: Function, limit: number) => {
      let inThrottle: boolean;
      return function(this: any, ...args: any[]) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initScrollWordAnimation);
    } else {
      initScrollWordAnimation();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);
}

export default function FeaturesPage() {
  useRevealOnScroll();
  useScrollWordAnimation();
  
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentScrollY <= 0) {
            setNavVisible(true);
          } else if (currentScrollY > lastScrollY.current) {
            setNavVisible(false);
          } else {
            setNavVisible(true);
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

  return (
    <>
      <Head>
        <title>Features - Claira</title>
        <meta name="description" content="Discover Claira's revolutionary AI features for women's health tracking and guidance." />
        <meta property="og:title" content="Features - Claira" />
        <meta property="og:description" content="Discover Claira's revolutionary AI features for women's health tracking and guidance." />
      </Head>
      <div className="min-h-screen w-full bg-cla-whitepink flex flex-col" style={{ minHeight: "100vh" }}>
        {/* Navigation Bar */}
        <header className={`w-full bg-transparent z-20 fixed top-0 left-0 nav-bar ${navVisible ? "nav-visible" : "nav-hidden"}`} style={{ height: 64, paddingTop: 10 }}>
          <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-12 md:px-24" style={{ height: 64 }}>
            <a href="/" className="flex items-center text-[1.35rem] font-semibold tracking-tight text-black logo-font mr-12" style={{ letterSpacing: "-0.01em", fontWeight: 600 }}>
              Claira
            </a>
            <div className="hidden md:flex items-center space-x-12 text-[0.97rem] font-medium nav-links">
              <a href="/" className="cluely-nav-link">Home</a>
              <a href="/features" className="cluely-nav-link active">Features</a>
              <a href="/early-access" className="cluely-nav-link">Early Access</a>
            </div>
            <div className="flex items-center space-x-7">
              <a href="/early-access" className="modern-black-btn" style={{ minWidth: 220 }}>
                Get Early Access
              </a>
            </div>
          </nav>
        </header>
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 px-4 pt-[180px] pb-[120px]" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="animated-text-section reveal" data-scroll-text>
            <h1 className="feature-title text-center">
              <div className="mb-4">
                <span className="scroll-word">The</span>
                <span className="scroll-word">Future</span>
                <span className="scroll-word">of</span>
                <span className="scroll-word">Women's</span>
                <span className="scroll-word">Health</span>
              </div>
              <div className="mb-4">
                <span className="scroll-word">Has</span>
                <span className="scroll-word">a</span>
                <span className="scroll-word">Name</span>
              </div>
              <div>
                <span className="scroll-word">—</span>
                <span className="scroll-word">Claira.</span>
              </div>
            </h1>
          </div>
          <div className="animated-text-section reveal mb-[84px]" data-scroll-text>
            <div className="flex flex-col items-center w-full max-w-2xl">
              <p className="text-[1.25rem] md:text-[1.45rem] text-center" style={{ fontWeight: 400, lineHeight: 1.5 }}>
                <span className="scroll-word">Claira</span>
                <span className="scroll-word">isn't</span>
                <span className="scroll-word">just</span>
                <span className="scroll-word">another</span>
                <span className="scroll-word">period</span>
                <span className="scroll-word">tracker.</span>
                <span className="scroll-word">She's</span>
                <span className="scroll-word">your</span>
                <span className="scroll-word">intelligent</span>
                <span className="scroll-word">health</span>
                <span className="scroll-word">companion</span>
                <span className="scroll-word">that</span>
                <span className="scroll-word">learns,</span>
                <span className="scroll-word">adapts,</span>
                <span className="scroll-word">and</span>
                <span className="scroll-word">grows</span>
                <span className="scroll-word">with</span>
                <span className="scroll-word">you.</span>
              </p>
            </div>
          </div>
          <div className="w-full max-w-3xl flex flex-col gap-[64px]">
            {/* Feature Sections with Word Animation */}
            <section className="reveal feature-section">
              <div className="animated-text-section" data-scroll-text>
                <h2 className="text-[1.35rem] md:text-[1.7rem] font-bold mb-4" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  <span className="scroll-word">Intelligent</span>
                  <span className="scroll-word">Adaptation</span>
                </h2>
                <p className="text-[1.18rem] md:text-[1.25rem] font-normal" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                  <span className="scroll-word">Claira</span>
                  <span className="scroll-word">Learns</span>
                  <span className="scroll-word">Your</span>
                  <span className="scroll-word">Unique</span>
                  <span className="scroll-word">Patterns.</span>
                  <span className="scroll-word">Unlike</span>
                  <span className="scroll-word">basic</span>
                  <span className="scroll-word">calendar</span>
                  <span className="scroll-word">apps,</span>
                  <span className="scroll-word">Claira</span>
                  <span className="scroll-word">uses</span>
                  <span className="scroll-word">AI</span>
                  <span className="scroll-word">to</span>
                  <span className="scroll-word">understand</span>
                  <span className="scroll-word">your</span>
                  <span className="scroll-word">individual</span>
                  <span className="scroll-word">cycle,</span>
                  <span className="scroll-word">symptoms,</span>
                  <span className="scroll-word">and</span>
                  <span className="scroll-word">health</span>
                  <span className="scroll-word">patterns.</span>
                </p>
              </div>
            </section>
            
            <section className="reveal feature-section">
              <div className="animated-text-section" data-scroll-text>
                <h2 className="text-[1.35rem] md:text-[1.7rem] font-bold mb-4" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  <span className="scroll-word">Mood</span>
                  <span className="scroll-word">&</span>
                  <span className="scroll-word">Emotional</span>
                  <span className="scroll-word">Intelligence</span>
                </h2>
                <p className="text-[1.18rem] md:text-[1.25rem] font-normal" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                  <span className="scroll-word">Your</span>
                  <span className="scroll-word">Emotions</span>
                  <span className="scroll-word">Matter.</span>
                  <span className="scroll-word">Claira</span>
                  <span className="scroll-word">recognizes</span>
                  <span className="scroll-word">the</span>
                  <span className="scroll-word">connection</span>
                  <span className="scroll-word">between</span>
                  <span className="scroll-word">your</span>
                  <span className="scroll-word">mental</span>
                  <span className="scroll-word">and</span>
                  <span className="scroll-word">physical</span>
                  <span className="scroll-word">health.</span>
                  <span className="scroll-word">She</span>
                  <span className="scroll-word">tracks</span>
                  <span className="scroll-word">mood</span>
                  <span className="scroll-word">patterns,</span>
                  <span className="scroll-word">emotional</span>
                  <span className="scroll-word">cycles,</span>
                  <span className="scroll-word">and</span>
                  <span className="scroll-word">provides</span>
                  <span className="scroll-word">personalized</span>
                  <span className="scroll-word">support.</span>
                </p>
              </div>
            </section>
            
            <section className="reveal feature-section">
              <div className="animated-text-section" data-scroll-text>
                <h2 className="text-[1.35rem] md:text-[1.7rem] font-bold mb-4" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  <span className="scroll-word">Memory</span>
                  <span className="scroll-word">&</span>
                  <span className="scroll-word">Personalization</span>
                </h2>
                <p className="text-[1.18rem] md:text-[1.25rem] font-normal" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                  <span className="scroll-word">She</span>
                  <span className="scroll-word">Remembers</span>
                  <span className="scroll-word">Everything</span>
                  <span className="scroll-word">So</span>
                  <span className="scroll-word">You</span>
                  <span className="scroll-word">Don't</span>
                  <span className="scroll-word">Have</span>
                  <span className="scroll-word">To.</span>
                  <span className="scroll-word">Claira</span>
                  <span className="scroll-word">remembers</span>
                  <span className="scroll-word">your</span>
                  <span className="scroll-word">symptoms,</span>
                  <span className="scroll-word">triggers,</span>
                  <span className="scroll-word">medications,</span>
                  <span className="scroll-word">and</span>
                  <span className="scroll-word">what</span>
                  <span className="scroll-word">works</span>
                  <span className="scroll-word">for</span>
                  <span className="scroll-word">you.</span>
                </p>
              </div>
            </section>
            
            <section className="reveal feature-section">
              <div className="animated-text-section" data-scroll-text>
                <h2 className="text-[1.35rem] md:text-[1.7rem] font-bold mb-4" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  <span className="scroll-word">Real-Time</span>
                  <span className="scroll-word">Guidance</span>
                </h2>
                <p className="text-[1.18rem] md:text-[1.25rem] font-normal" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                  <span className="scroll-word">Instant,</span>
                  <span className="scroll-word">Intelligent</span>
                  <span className="scroll-word">Answers.</span>
                  <span className="scroll-word">Get</span>
                  <span className="scroll-word">personalized</span>
                  <span className="scroll-word">health</span>
                  <span className="scroll-word">guidance</span>
                  <span className="scroll-word">24/7.</span>
                  <span className="scroll-word">Claira</span>
                  <span className="scroll-word">provides</span>
                  <span className="scroll-word">expert-backed</span>
                  <span className="scroll-word">advice</span>
                  <span className="scroll-word">tailored</span>
                  <span className="scroll-word">to</span>
                  <span className="scroll-word">your</span>
                  <span className="scroll-word">specific</span>
                  <span className="scroll-word">situation</span>
                  <span className="scroll-word">and</span>
                  <span className="scroll-word">health</span>
                  <span className="scroll-word">history.</span>
                </p>
              </div>
            </section>
            
            <section className="reveal feature-section">
              <div className="animated-text-section" data-scroll-text>
                <h2 className="text-[1.35rem] md:text-[1.7rem] font-bold mb-4" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  <span className="scroll-word">Predictive</span>
                  <span className="scroll-word">Insights</span>
                </h2>
                <p className="text-[1.18rem] md:text-[1.25rem] font-normal" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                  <span className="scroll-word">See</span>
                  <span className="scroll-word">Your</span>
                  <span className="scroll-word">Health</span>
                  <span className="scroll-word">Future.</span>
                  <span className="scroll-word">Advanced</span>
                  <span className="scroll-word">AI</span>
                  <span className="scroll-word">predicts</span>
                  <span className="scroll-word">your</span>
                  <span className="scroll-word">cycles,</span>
                  <span className="scroll-word">symptoms,</span>
                  <span className="scroll-word">and</span>
                  <span className="scroll-word">health</span>
                  <span className="scroll-word">patterns</span>
                  <span className="scroll-word">with</span>
                  <span className="scroll-word">unprecedented</span>
                  <span className="scroll-word">accuracy.</span>
                  <span className="scroll-word">Know</span>
                  <span className="scroll-word">what's</span>
                  <span className="scroll-word">coming</span>
                  <span className="scroll-word">before</span>
                  <span className="scroll-word">it</span>
                  <span className="scroll-word">happens.</span>
                </p>
              </div>
            </section>
            
            <section className="reveal feature-section">
              <div className="animated-text-section" data-scroll-text>
                <h2 className="text-[1.35rem] md:text-[1.7rem] font-bold mb-4" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  <span className="scroll-word">Privacy-First</span>
                  <span className="scroll-word">Approach</span>
                </h2>
                <p className="text-[1.18rem] md:text-[1.25rem] font-normal" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                  <span className="scroll-word">Your</span>
                  <span className="scroll-word">Health</span>
                  <span className="scroll-word">Data</span>
                  <span className="scroll-word">Stays</span>
                  <span className="scroll-word">Yours.</span>
                  <span className="scroll-word">Bank-level</span>
                  <span className="scroll-word">encryption</span>
                  <span className="scroll-word">and</span>
                  <span className="scroll-word">privacy</span>
                  <span className="scroll-word">protection.</span>
                  <span className="scroll-word">Your</span>
                  <span className="scroll-word">intimate</span>
                  <span className="scroll-word">health</span>
                  <span className="scroll-word">data</span>
                  <span className="scroll-word">never</span>
                  <span className="scroll-word">leaves</span>
                  <span className="scroll-word">your</span>
                  <span className="scroll-word">control.</span>
                </p>
              </div>
            </section>
            
            {/* CTA Section */}
            <section className="reveal flex flex-col items-center justify-center py-16">
              <div className="animated-text-section" data-scroll-text>
                <h2 className="text-[1.35rem] md:text-[1.7rem] font-bold mb-4 text-center" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  <span className="scroll-word">Ready</span>
                  <span className="scroll-word">to</span>
                  <span className="scroll-word">Experience</span>
                  <span className="scroll-word">the</span>
                  <span className="scroll-word">Future?</span>
                </h2>
                <p className="text-[1.18rem] md:text-[1.25rem] font-normal mb-8 text-center" style={{ fontWeight: 400, lineHeight: 1.6 }}>
                  <span className="scroll-word">Join</span>
                  <span className="scroll-word">500+</span>
                  <span className="scroll-word">women</span>
                  <span className="scroll-word">who</span>
                  <span className="scroll-word">are</span>
                  <span className="scroll-word">ready</span>
                  <span className="scroll-word">to</span>
                  <span className="scroll-word">revolutionize</span>
                  <span className="scroll-word">their</span>
                  <span className="scroll-word">health</span>
                  <span className="scroll-word">journey</span>
                  <span className="scroll-word">with</span>
                  <span className="scroll-word">Claira.</span>
                </p>
              </div>
              <a href="/early-access" className="modern-black-btn" style={{ minWidth: 220 }}>
                Get Early Access
              </a>
            </section>
          </div>
        </main>
        {/* Animations, Gradient, and Button Styles (copied from homepage/waitlist) */}
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
          
          /* Word-by-word scroll animation styles */
          .scroll-word {
            color: #999999;
            transition: color 0.1s ease-out;
            display: inline-block;
            margin-right: 0.3rem;
          }
          
          .scroll-word.active {
            color: #000000;
          }
          
          .animated-text-section {
            margin-bottom: 2rem;
            padding: 1rem 0;
          }
          
          /* Navigation active state */
          .cluely-nav-link.active {
            color: #18181b;
          }
          .cluely-nav-link.active:after {
            width: 100%;
          }
          
          /* Complete navigation link styles */
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
            text-decoration: none;
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
          
          /* Button styles to match Early Access page */
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
          
          /* Modern feature section styling */
          .feature-section {
            padding: 4rem 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            max-width: 800px;
            margin: 0 auto;
          }
          
          .feature-section:last-child {
            border-bottom: none;
          }
          
          .feature-section h2 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #000;
          }
          
          .feature-section p {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
          }
          
          @media (max-width: 768px) {
            .scroll-word {
              margin-right: 0.2rem;
            }
          }
        `}</style>
      </div>
    </>
  );
} 