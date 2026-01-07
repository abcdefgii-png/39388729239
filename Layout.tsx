import React from 'react';
import { BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenGallery: () => void;
  onGoHome: () => void;
  showGalleryButton?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onOpenGallery, onGoHome, showGalleryButton = true }) => {
  return (
    <div className="relative min-h-screen w-full bg-void text-gold-200 overflow-hidden selection:bg-gold-900 selection:text-gold-100 font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-void-light to-void z-0" />
      
      {/* Stardust particles (simulated) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <div className="stardust top-1/4 left-1/4 animate-pulse-slow"></div>
        <div className="stardust top-3/4 left-1/3 animate-pulse-slow delay-700"></div>
        <div className="stardust top-1/3 right-1/4 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto cursor-pointer group" onClick={onGoHome}>
          <h1 className="text-xl md:text-2xl font-serif font-light tracking-widest text-gold-200/90 group-hover:text-gold-100 transition-colors">
            静默陪伴 <span className="text-sm opacity-50 block md:inline md:ml-2">Quiet Companion</span>
          </h1>
          <p className="text-[10px] md:text-xs text-gold-700 uppercase tracking-[0.2em] mt-1">给今天一个缓冲</p>
        </div>

        {showGalleryButton && (
          <button 
            onClick={onOpenGallery}
            className="pointer-events-auto flex items-center space-x-2 text-gold-600 hover:text-gold-200 transition-colors opacity-80 hover:opacity-100"
          >
            <span className="text-xs tracking-widest hidden md:inline">卡册</span>
            <BookOpen size={20} strokeWidth={1.5} />
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-screen flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
};
