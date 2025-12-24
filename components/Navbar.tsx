
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  activeCategory, 
  setActiveCategory,
  searchQuery,
  onSearchChange
}) => {
  const categories = ['All', 'Drop 001', 'Collections', 'About'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-5 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <h1 
          className="text-2xl font-black tracking-[0.3em] cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onSearchChange('');
          }}
        >
          FLAME
        </h1>
        <div className="hidden lg:flex gap-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === 'Drop 001' ? 'Men' : 'All')}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                (cat === 'Drop 001' && activeCategory === 'Men') ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="SEARCH"
            className="bg-transparent border-b border-white/10 w-40 focus:w-60 focus:border-white transition-all py-1 px-2 text-[10px] tracking-widest uppercase focus:outline-none"
          />
        </div>
        
        <button 
          onClick={onCartClick}
          className="relative group p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
