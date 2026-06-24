import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Wine, Cake, ChefHat, Award, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { type InteractiveTableDish, interactiveDishes } from '../types';
import './InteractiveTable.css';

export default function InteractiveTable() {
  const [selectedDish, setSelectedDish] = useState<InteractiveTableDish>(interactiveDishes[0]);
  const touchStartRef = useRef<number | null>(null);

  const renderDishIcon = (dishId: string, size = 24, color = '#B8826A') => {
    const props = { size, color };
    switch (dishId) {
      case 'it1': return <ChefHat {...props} />;
      case 'it2': return <Flame {...props} />;
      case 'it3': return <Cake {...props} />;
      case 'it4': return <Wine {...props} />;
      case 'it5': return <Award {...props} />;
      default: return <Sparkles {...props} />;
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
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartRef.current = null;
  };

  return (
    <section className="it-section">
      <div className="it-container">
        <div className="it-header">
          <span className="it-subtitle">El arte de la hospitalidad</span>
          <h2 className="it-title">Nuestros Platos Estrella</h2>
          <div className="it-divider"></div>
          <p className="it-description">
            Explora de manera visual nuestras especialidades tradicionales más queridas.
            Haz clic o desliza con el dedo para descubrir cada plato.
          </p>
        </div>

        <div className="it-wrapper">
          <div className="it-topbar">
            <span className="it-topbar-left">
              <Utensils size={14} color="#C76B4F" />
              <span>Selección del Chef</span>
            </span>
            <span className="it-topbar-right">Desliza o haz clic para interactuar</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="it-tablecloth"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button onClick={handlePrev} className="it-nav it-nav-prev" aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="it-nav it-nav-next" aria-label="Siguiente">
              <ChevronRight size={20} />
            </button>

            <div className="it-dish-area">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDish.id}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="it-dish-content"
                >
                  <div className="it-dish-image-wrapper">
                    <img
                      src={selectedDish.image}
                      alt={selectedDish.name}
                      className="it-dish-image"
                    />
                  </div>

                  <div className="it-dish-info">
                    <div className="it-dish-category">
                      {renderDishIcon(selectedDish.id, 20, '#C76B4F')}
                      <span>{selectedDish.category}</span>
                    </div>
                    <h3 className="it-dish-name">{selectedDish.name}</h3>
                    <p className="it-dish-desc">{selectedDish.description}</p>
                    <span className="it-dish-price">{selectedDish.price}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="it-dots">
              {interactiveDishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => setSelectedDish(dish)}
                  className={`it-dot ${selectedDish.id === dish.id ? 'it-dot-active' : ''}`}
                  aria-label={dish.name}
                />
              ))}
            </div>

            <div className="it-bottom-bar">
              <span>Experiencia Sensorial</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
