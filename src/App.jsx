import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MousePointer2, Mic2, ActivityIcon, Sun, Moon, Menu } from 'lucide-react';
import heroBg from './assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ theme, toggleTheme }) => {
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -10%',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <nav ref={navRef} className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-7xl transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center justify-between md:justify-center gap-4 md:gap-12 text-textMain [&.nav-scrolled]:bg-background/10 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border [&.nav-scrolled]:border-textMain/10">
        <div className="font-heading font-bold text-lg md:text-xl tracking-tight uppercase tracking-wider text-accent">The Creative Genius</div>
        <div className="hidden md:flex items-center gap-8 font-heading text-sm font-medium">
          <a href="#podcast" className="hover:text-accent transition-colors">Podcast</a>
          <a href="#events" className="hover:text-accent transition-colors">Events</a>
          <a href="#music" className="hover:text-accent transition-colors">Music</a>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-textMain" /> : <Moon size={20} className="text-textMain" />}
          </button>
          <button className="btn-accent hidden md:flex text-sm py-2 px-5">
            <span>Subscribe Now</span>
          </button>
          <button className="md:hidden p-2 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={20} className="text-textMain" />
          </button>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-md z-40 transition-opacity duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="flex flex-col items-center justify-center gap-8" onClick={(e) => e.stopPropagation()}>
          <a href="#podcast" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-textMain hover:text-accent">Podcast</a>
          <a href="#events" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-textMain hover:text-accent">Events</a>
          <a href="#music" onClick={() => setMobileMenuOpen(false)} className="font-heading text-2xl text-textMain hover:text-accent">Music</a>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Brutalist concrete/industrial texture from Unsplash
  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-8 md:px-24">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1695277123951-e1cc156094cf?q=80&w=2574&auto=format&fit=crop" alt="Hero background Kigali" className="w-full h-full object-cover grayscale opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-text font-heading font-bold text-4xl md:text-6xl text-textMain tracking-tight">Fuel the grind.</span>
          <span className="hero-text font-drama italic text-6xl md:text-[9rem] text-accent leading-none tracking-tight -ml-2">Focus is superpower.</span>
        </h1>
        <p className="hero-text font-data text-textMain/70 mt-6 max-w-2xl text-sm md:text-base leading-relaxed">
          The Creative Genius is a backstage pass to real stories, focused hustle, and unfiltered growth. Where purpose meets process.
        </p>
        <div className="hero-cta mt-12 flex items-center gap-6">
          <a href="https://www.youtube.com/@TheCreativeGenius" target="_blank" rel="noreferrer" className="btn-accent flex items-center gap-2 px-6 py-3">
            <span>Listen to Feed Your Focus</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const FeaturePodcastCard = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Feed Your Focus", desc: "Where purpose meets the process." },
    { id: 2, label: "Real Stories", desc: "Conversations with real world leaders." },
    { id: 3, label: "Unfiltered Growth", desc: "Build yourself mentally and spiritually." }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="podcast" className="bg-surfaceCard border border-textMain/10 rounded-[2rem] p-8 h-[380px] relative overflow-hidden flex flex-col items-center justify-center shadow-lg">
      <div className="absolute top-8 left-8">
        <h3 className="font-heading font-bold text-lg text-textMain">Podcast</h3>
        <p className="font-data text-xs text-accent mt-2 uppercase tracking-widest">Diagnostic Shuffler</p>
      </div>
      <div className="relative w-full max-w-[280px] h-[160px] mt-16">
        {cards.map((card, i) => (
          <div 
            key={card.id}
            className="absolute inset-0 bg-background border border-textMain/10 rounded-2xl p-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col justify-center"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
              zIndex: 10 - i,
              opacity: 1 - i * 0.3
            }}
          >
            <div className="flex items-center gap-3 text-textMain mb-3">
              <Mic2 size={16} className="text-accent" />
              <h4 className="font-heading font-semibold text-sm">{card.label}</h4>
            </div>
            <p className="font-heading text-xs text-textMain/60 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureEventsCard = () => {
  const [text, setText] = useState("");
  const messages = ["New podcast dropping soon...", "Check out my new podcast...", "Check out my new music..."];
  
  useEffect(() => {
    let currentMsgIdx = 0;
    let currentCharIdx = 0;
    let textToType = "";
    
    const type = () => {
      textToType = messages[currentMsgIdx];
      setText(textToType.slice(0, currentCharIdx + 1));
      currentCharIdx++;
      
      if (currentCharIdx >= textToType.length) {
        setTimeout(() => {
          currentCharIdx = 0;
          currentMsgIdx = (currentMsgIdx + 1) % messages.length;
        }, 2000);
      }
    };
    
    const interval = setInterval(type, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="events" className="bg-surfaceCard border border-textMain/10 rounded-[2rem] p-8 h-[380px] relative overflow-hidden flex flex-col justify-between group cursor-crosshair shadow-lg">
      <div>
        <h3 className="font-heading font-bold text-lg text-textMain">Events News</h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <p className="font-data text-xs text-accent uppercase tracking-widest">Live Feed</p>
        </div>
      </div>
      
      <div className="bg-background border border-textMain/5 rounded-2xl p-6 mt-6 flex-1 flex flex-col justify-end overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,59,46,0.05)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <p className="font-data text-sm text-accent relative z-10 leading-relaxed">
          &gt; <span className="text-textMain/80">{text}</span>
          <span className="inline-block w-2 h-4 bg-accent ml-1 -mb-1 animate-[pulse_0.8s_infinite]"></span>
        </p>
      </div>
    </div>
  );
};

const FeatureMusicCard = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.to(cursorRef.current, {
        x: 130, y: 75, duration: 1, ease: "power2.inOut"
      });
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.add(() => setActiveDay(3));
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      
      tl.to(cursorRef.current, {
        x: 70, y: 160, duration: 1, delay: 0.5, ease: "power2.inOut"
      });
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      
      tl.to(cursorRef.current, {
        x: -50, y: -50, duration: 1, delay: 0.5,
        onStart: () => setActiveDay(null)
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div id="music" className="bg-surfaceCard border border-textMain/10 rounded-[2rem] p-8 h-[380px] relative overflow-hidden flex flex-col justify-between shadow-lg">
      <div>
        <h3 className="font-heading font-bold text-lg text-textMain">Music</h3>
        <p className="font-data text-xs text-accent mt-2 uppercase tracking-widest">Protocol Scheduler</p>
      </div>
      
      <div className="relative w-full flex-1 flex flex-col justify-center items-center select-none pt-4">
        <div className="flex gap-2 mb-10 relative">
          {days.map((d, i) => (
            <div 
              key={i} 
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-data text-xs border transition-colors duration-300 ${activeDay === i ? 'bg-accent/10 border-accent/50 text-textMain shadow-[0_0_10px_rgba(230,59,46,0.2)]' : 'bg-background/50 text-textMain/40 border-textMain/10'}`}
            >
              {d}
            </div>
          ))}
          
          <div ref={cursorRef} className="absolute -left-10 -top-10 z-20 pointer-events-none drop-shadow-md">
            <MousePointer2 size={24} className="text-textMain fill-black dark:fill-white" />
          </div>
        </div>
        
        <div className={`px-6 py-2 rounded-full border text-xs font-heading font-medium transition-colors duration-300 ${activeDay !== null ? 'bg-accent text-white border-accent' : 'bg-background border-textMain/10 text-textMain/50'}`}>
          Confirm Drop Date
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-24 px-8 md:px-24 bg-background relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeaturePodcastCard />
        <FeatureEventsCard />
        <FeatureMusicCard />
      </div>
    </section>
  );
};

const Philosophy = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-40 px-8 md:px-24 bg-primary overflow-hidden flex items-center justify-center min-h-[80vh] z-20 border-y border-textMain/5">
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <img src="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=2600&auto=format&fit=crop" alt="Abstract texture" className="w-full h-full object-cover" />
      </div>
      <div ref={textRef} className="relative z-10 max-w-5xl mx-auto text-center flex flex-col gap-8">
        <p className="phil-line font-heading text-xl md:text-3xl text-textMain/50 tracking-tight">Most platforms focus on: polished highlights.</p>
        <p className="phil-line font-drama italic text-5xl md:text-[6rem] text-textMain tracking-tight leading-[1.1] -mt-4">
          We focus on: <span className="text-accent underline decoration-accent/30 underline-offset-8">unfiltered raw growth.</span>
        </p>
      </div>
    </section>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-background relative pb-24 z-20">
      <div className="protocol-card sticky top-0 h-[100dvh] bg-background flex items-center justify-center pt-12">
        <div className="max-w-4xl w-full px-8 md:px-24 flex flex-col md:flex-row items-center gap-16">
          <div className="w-48 h-48 border border-textMain/10 rounded-full flex flex-col items-center justify-center relative spin-slow relative shadow-lg bg-surfaceCard">
            <div className="absolute inset-2 border-t-2 border-accent rounded-full animate-spin [animation-duration:3s]"></div>
            <div className="absolute inset-6 border-b-2 border-textMain/20 rounded-full animate-spin [animation-duration:4s] animation-reverse"></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="font-data text-accent mb-4">01</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-textMain mb-6">Mentally</h2>
            <p className="font-heading text-textMain/70 text-lg leading-relaxed">Reprogramming the mindset. Unlocking the focus required to sustain the daily grind and build something bigger than yourself.</p>
          </div>
        </div>
      </div>
      
      <div className="protocol-card sticky top-0 h-[100dvh] bg-background flex items-center justify-center pt-12">
        <div className="max-w-4xl w-full px-8 md:px-24 flex flex-col md:flex-row items-center gap-16">
          <div className="w-48 h-48 border border-textMain/10 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg bg-surfaceCard">
            <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
              {[...Array(8)].map((_, i) => <div key={i} className="w-full h-px bg-textMain/5"></div>)}
            </div>
            <div className="w-full h-1 bg-accent absolute -top-1 shadow-[0_0_20px_#E63B2E] animate-[scan_2s_linear_infinite]"></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="font-data text-accent mb-4">02</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-textMain mb-6">Creatively</h2>
            <p className="font-heading text-textMain/70 text-lg leading-relaxed">Breaking down the barriers to true expression. Exploring music, events, and raw backstage stories.</p>
          </div>
        </div>
      </div>
      
      <div className="protocol-card sticky top-0 h-[100dvh] bg-background flex items-center justify-center pt-12">
        <div className="max-w-4xl w-full px-8 md:px-24 flex flex-col md:flex-row items-center gap-16">
          <div className="w-48 h-48 border border-textMain/10 rounded-2xl flex items-center justify-center relative group shadow-lg bg-surfaceCard">
            <ActivityIcon size={64} className="text-textMain/20 group-hover:text-accent transition-colors duration-500" />
            <svg className="absolute inset-0 w-full h-full text-accent" viewBox="0 0 100 100">
               <path d="M 0 50 Q 25 50 25 25 T 50 50 T 75 75 T 100 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="150" strokeDashoffset="150" className="animate-[dash_3s_linear_infinite]" />
            </svg>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="font-data text-accent mb-4">03</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-textMain mb-6">Spiritually</h2>
            <p className="font-heading text-textMain/70 text-lg leading-relaxed">Connecting the hustle to a higher purpose. Reminding people that their focus is their absolute superpower.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="bg-background py-32 px-8 flex flex-col items-center justify-center text-center relative z-30 border-t border-textMain/10">
        <h2 className="font-drama italic text-5xl md:text-7xl text-textMain mb-8">Ready to dial in?</h2>
        <p className="font-heading text-textMain/70 text-lg max-w-xl mx-auto mb-12">Support the team and subscribe now. Listen to the Feed Your Focus podcast.</p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a href="https://www.youtube.com/@TheCreativeGenius" target="_blank" rel="noreferrer" className="btn-accent text-lg px-8 py-4 w-full md:w-auto">
            <span>Subscribe Now</span>
          </a>
          <button className="bg-transparent border border-textMain/20 hover:border-textMain/50 text-textMain font-heading font-medium rounded-full text-lg px-8 py-4 transition-colors">
            Support the Team
          </button>
        </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-textMain pt-24 pb-8 px-8 md:px-24 rounded-t-[3rem] relative z-40 border-t border-textMain/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-heading font-bold text-2xl tracking-widest uppercase mb-4">The Creative Genius</div>
          <p className="font-heading text-textMain/60 text-sm max-w-xs leading-relaxed">A backstage pass to real stories, focused hustle, and unfiltered growth. Hosted by TCG.</p>
          <div className="mt-8 inline-flex items-center gap-3 bg-background border border-textMain/10 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-accent animate-[pulse_2s_infinite] shadow-[0_0_8px_#E63B2E]"></div>
            <span className="font-data text-xs uppercase tracking-widest text-textMain/80">Signal Live</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-heading font-semibold text-textMain mb-6">Links</h4>
          <ul className="flex flex-col gap-3 font-heading text-sm text-textMain/60">
            <li><a href="#podcast" className="hover:text-accent transition-colors">Podcast</a></li>
            <li><a href="#music" className="hover:text-accent transition-colors">Music</a></li>
            <li><a href="#events" className="hover:text-accent transition-colors">Events News</a></li>
            <li><a href="https://www.youtube.com/@TheCreativeGenius" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">YouTube Channel</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-heading font-semibold text-textMain mb-6">Legal</h4>
          <ul className="flex flex-col gap-3 font-heading text-sm text-textMain/60">
            <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Imprint</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-textMain/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs font-data text-textMain/50">
        <p>© 2026 The Creative Genius. All rights reserved.</p>
        <p className="mt-4 md:mt-0 uppercase tracking-widest">built by braze.inc with a raw precision</p>
      </div>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
      </svg>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CTA />
      <Footer />
    </>
  );
}
