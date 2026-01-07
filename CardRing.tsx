import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CardRingProps {
  onSelectCard: (index: number) => void;
}

export const CardRing: React.FC<CardRingProps> = ({ onSelectCard }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const rafRef = useRef<number>();
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Physics loop for inertia
  useEffect(() => {
    const loop = () => {
      if (!isDragging && Math.abs(velocity) > 0.01) {
        setRotation(r => r + velocity);
        setVelocity(v => v * 0.95); // Damping
        rafRef.current = requestAnimationFrame(loop);
      } else if (!isDragging && Math.abs(velocity) <= 0.01) {
         setVelocity(0);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, velocity]);

  // Input Handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartRotation(rotation);
    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
    setVelocity(0); // Stop inertia on grab
  };

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    // Map screen pixels to degrees. Sensitivity factor 0.5
    setRotation(startRotation + deltaX * 0.5);

    // Calculate instantaneous velocity
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const dx = clientX - lastXRef.current;
      const v = dx / dt * 8; // Scale factor
      setVelocity(v);
      lastXRef.current = clientX;
      lastTimeRef.current = now;
    }
  }, [isDragging, startX, startRotation]);

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Event Listeners (Mouse/Touch)
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => handleEnd();

  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  const cards = Array.from({ length: 12 });
  const radius = 280; // Distance from center

  return (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="relative w-0 h-0 card-preserve-3d"
        style={{ perspective: '1200px' }}
      >
        <div className="absolute top-1/2 left-1/2 w-0 h-0 card-preserve-3d transition-transform duration-75 ease-out"
             style={{ transform: `rotateY(${rotation}deg)` }}>
          
          {cards.map((_, i) => {
            const angle = (i * 30); // 360 / 12
            return (
              <div
                key={i}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isDragging) onSelectCard(i);
                }}
                className="absolute top-1/2 left-1/2 w-48 h-72 -ml-24 -mt-36 card-preserve-3d cursor-pointer group hover:scale-105 transition-transform duration-300"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                {/* Card Back Design */}
                <div className="w-full h-full bg-void border border-gold-800 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_15px_rgba(184,134,11,0.2)] group-hover:border-gold-500 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
                  {/* Pattern */}
                  <div className="absolute inset-2 border border-gold-900/50 rounded flex items-center justify-center opacity-50">
                     <div className="w-24 h-24 border border-gold-900/30 rounded-full rotate-45" />
                     <div className="absolute w-16 h-16 border border-gold-900/30 rotate-45" />
                  </div>
                  {/* Central Symbol */}
                  <div className="relative w-8 h-8 bg-gold-900/20 rounded-full flex items-center justify-center">
                     <div className="w-2 h-2 bg-gold-600/50 rounded-full animate-pulse"></div>
                  </div>
                  {/* Corners */}
                  <div className="absolute top-3 left-3 w-1 h-1 bg-gold-800 rounded-full" />
                  <div className="absolute top-3 right-3 w-1 h-1 bg-gold-800 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-gold-800 rounded-full" />
                  <div className="absolute bottom-3 right-3 w-1 h-1 bg-gold-800 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-12 text-gold-800 text-[10px] tracking-[0.3em] uppercase pointer-events-none animate-pulse">
        Drag to rotate · Click to select
      </div>
    </div>
  );
};
