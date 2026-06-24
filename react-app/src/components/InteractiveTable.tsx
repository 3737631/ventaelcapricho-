import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame, Wine, Cake, ChefHat, Award, Utensils } from 'lucide-react';
import { interactiveDishes } from '../data';
import { InteractiveTableDish } from '../types';

export default function InteractiveTable() {
  const [selectedDish, setSelectedDish] = useState<InteractiveTableDish | null>(interactiveDishes[0]);
  const touchStartRef = useRef<number | null>(null);

  const renderDishIcon = (dishId: string, className = "w-6 h-6 text-[#B8826A]") => {
    switch (dishId) {
      case 'it1':
        return <ChefHat className={className} />;
      case 'it2':
        return <Flame className={className} />;
      case 'it3':
        return <Cake className={className} />;
      case 'it4':
        return <Wine className={className} />;
      case 'it5':
        return <Award className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const handleNext = () => {
    const currentIndex = interactiveDishes.findIndex(d => d.id === selectedDish?.id);
    const nextIndex = (currentIndex + 1) % interactiveDishes.length;
    setSelectedDish(interactiveDishes[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = interactiveDishes.findIndex(d => d.id === selectedDish?.id);
    const prevIndex = (currentIndex - 1 + interactiveDishes.length) % interactiveDishes.length;
    setSelectedDish(interactiveDishes[prevIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 40) { // threshold for swipe
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartRef.current = null;
  };

  return (
    <section id="mesa-interactiva" className="relative py-20 bg-background overflow-hidden border-b border-primary/30">
      {/* Decorative Traditional Andalusian Tile Strip */}
      <div className="absolute top-0 left-0 w-full h-4 bg-tile-pattern opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section: Ultra Elegant & Minimalist */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cursive text-4xl text-accent block mb-2 leading-none">
            El arte de la hospitalidad
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif mb-4">
            El Mantel de la Experiencia Sensorial
          </h2>
          <div className="w-16 h-[1px] bg-accent/40 mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-brown/90 leading-relaxed font-sans max-w-2xl mx-auto">
            Explora de manera visual nuestras especialidades tradicionales más queridas. 
            Haz clic o desliza con el dedo de un lado a otro sobre los platos de nuestro mantel artesanal.
          </p>
        </div>

        {/* Centered Minimalist Interactive Tablecloth */}
        <div className="max-w-4xl mx-auto">
          
          {/* Table Canvas Header - Clean, No unrequested labels */}
          <div className="mb-4 flex items-center justify-between px-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brown/65 flex items-center gap-2 font-sans">
              <Utensils className="w-3.5 h-3.5 text-accent animate-pulse" /> 
              <span>Mantel de la Experiencia</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brown/50 font-sans hidden sm:block">
              Desliza o haz clic para interactuar
            </span>
          </div>

          {/* The Tablecloth Canvas - Clean, Smooth & Minimalist with touch swiping support */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-border bg-mantel p-6 sm:p-12 flex flex-col justify-between select-none touch-pan-y"
            id="tablecloth-visual-canvas"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile Navigation Arrows Overlay for sensory comfort */}
            <div className="absolute inset-y-0 left-2.5 flex items-center justify-center z-20 sm:hidden pointer-events-none">
              <button 
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-black/25 text-white flex items-center justify-center pointer-events-auto active:bg-accent/80 transition-colors shadow-md"
                aria-label="Plato anterior"
              >
                <span className="text-lg font-bold leading-none select-none">‹</span>
              </button>
            </div>
            <div className="absolute inset-y-0 right-2.5 flex items-center justify-center z-20 sm:hidden pointer-events-none">
              <button 
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-black/25 text-white flex items-center justify-center pointer-events-auto active:bg-accent/80 transition-colors shadow-md"
                aria-label="Siguiente plato"
              >
                <span className="text-lg font-bold leading-none select-none">›</span>
              </button>
            </div>

            {/* Plates Placed Harmoniously on the Tablecloth (No dragging - highly visual & elegant grid) */}
            <div className="absolute inset-6 sm:inset-12 z-10 grid grid-cols-5 h-full items-center justify-center">
              {interactiveDishes.map((dish, idx) => {
                const isSelected = selectedDish?.id === dish.id;
                
                // Clean, elegant coordinate distribution for a perfect fine dining setup
                const positions = [
                  "col-start-1 row-start-2 -translate-y-8 sm:-translate-y-12",  // Croquetas (Left-top)
                  "col-start-2 row-start-1 translate-y-4 sm:translate-y-2",     // Solomillo (Center-top)
                  "col-start-3 row-start-2 -translate-y-8 sm:-translate-y-12",  // Torrija (Right-top)
                  "col-start-4 row-start-3 -translate-y-2 sm:-translate-y-4",   // Manzanilla (Center-bottom)
                  "col-start-5 row-start-2 -translate-y-8 sm:-translate-y-12",  // Jamón (Right-bottom)
                ];

                return (
                  <div
                    key={dish.id}
                    className={`flex flex-col items-center justify-center relative ${positions[idx] || "col-span-1"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="relative cursor-pointer group"
                      onClick={() => setSelectedDish(dish)}
                    >
                      {/* Ceramic Porcelain Plate Ring */}
                      <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-background transition-all duration-500 relative ${
                        isSelected 
                          ? 'ring-[5px] ring-white shadow-xl scale-110 border border-accent/35' 
                          : 'ring-[2px] ring-white/45 shadow-lg hover:shadow-xl'
                      }`}>
                        
                        {/* Seville Blue / Ochre Ceramic Pattern Inside Plate */}
                        <div className={`absolute inset-1 rounded-full border border-dashed pointer-events-none transition-colors duration-500 ${
                          isSelected ? 'border-accent/40' : 'border-primary/30'
                        }`}></div>
                        
                        {/* Inner gold/bronze circle for refinement */}
                        <div className="absolute inset-2 rounded-full border border-primary/10 pointer-events-none"></div>

                        {/* Icon representation */}
                        <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                          {renderDishIcon(dish.id, isSelected ? "w-6 h-6 sm:w-8 sm:h-8 text-accent" : "w-5 h-5 sm:w-7 sm:h-7 text-[#B8826A]/90")}
                        </span>
                      </div>

                      {/* Elegantly typed plate labels under - Refined, Minimalist and interactive */}
                      <div className="mt-2 text-center flex flex-col items-center">
                        <span className={`text-[10px] sm:text-xs font-serif tracking-wide transition-all duration-300 ${
                          isSelected 
                            ? 'text-white font-bold scale-105' 
                            : 'text-white/85 font-medium group-hover:text-white'
                        }`}>
                          {dish.name}
                        </span>
                        {/* Elegant minimal gold underline indicator that expands on select */}
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: isSelected ? '28px' : '0px' }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="h-[1.5px] bg-accent mt-0.5 rounded-full"
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Fine status bar on bottom of the tablecloth - No Capricho, purely sensory */}
            <div className="w-full text-center relative z-20 select-none pb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#F3EEE4] bg-black/20 backdrop-blur-sm px-3.5 py-1 rounded-full font-sans">
                Experiencia Sensorial
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
