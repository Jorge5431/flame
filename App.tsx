
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import AIStylist from './components/AIStylist';
import CheckoutView from './components/CheckoutView';
import AboutModal from './components/AboutModal';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'shop' | 'checkout'>('shop');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Local state for modal variant selection
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const drop001 = useMemo(() => PRODUCTS.find(p => p.id === 'drop-001'), []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product, size: string, color: string) => {
    const variantId = `${product.id}-${size}-${color}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === variantId);
      if (existing) {
        return prev.map(item => item.id === variantId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { 
        id: variantId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedSize: size,
        selectedColor: color,
        quantity: 1 
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavCategory = (cat: string) => {
    if (cat === 'About') {
      setIsAboutOpen(true);
      return;
    }
    if (cat === 'Collections') {
      setActiveCategory('All');
      setActiveView('shop');
      document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setActiveCategory(cat === 'Drop 001' ? 'Men' : 'All');
    setActiveView('shop');
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      <Navbar 
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={handleNavCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="pt-20">
        {activeView === 'shop' ? (
          <>
            {/* SECTION 1 — HERO */}
            {searchQuery === '' && activeCategory === 'All' && (
              <section className="h-[90vh] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                   <img 
                    src={drop001?.image} 
                    className="w-full h-full object-cover opacity-40 grayscale" 
                    alt="Hero background" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                </div>
                
                <div className="relative z-10 text-center space-y-8 px-6 max-w-5xl mx-auto">
                  <h2 className="text-[14vw] md:text-[10vw] font-black leading-none tracking-[-0.05em] animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    IGNITE YOUR HEART
                  </h2>
                  <div className="space-y-6">
                    <p className="text-white/40 text-[10px] md:text-xs tracking-[0.5em] uppercase animate-in fade-in duration-1000 delay-300">
                      Clean streetwear. Fire within.
                    </p>
                    <button 
                      onClick={() => openQuickView(drop001!)}
                      className="bg-white text-black px-12 py-5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]"
                    >
                      ACQUIRE DROP 001
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* PRODUCT GRID */}
            <section id="archive" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
              <div className="mb-20 flex justify-between items-end border-b border-white/5 pb-8">
                 <h3 className="text-sm font-black tracking-[0.4em] uppercase">Archive Collection</h3>
                 <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{filteredProducts.length} ITEMS AVAILABLE</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={(p) => openQuickView(p)}
                    onViewDetails={(p) => openQuickView(p)}
                  />
                ))}
              </div>
            </section>

            {/* BRAND CONCEPT */}
            {searchQuery === '' && activeCategory === 'All' && (
              <section className="bg-zinc-950 py-60 px-6 border-y border-white/5">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                  <h4 className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase">Brand Manifesto</h4>
                  <p className="text-3xl md:text-5xl font-light leading-relaxed tracking-wide">
                    FLAME IS ABOUT <span className="font-black">SILENT INTENSITY</span>. <br/>
                    THE FIRE THAT BURNS INSIDE. 
                    NO NOISE. NO EXCESS. 
                    <span className="opacity-40 italic"> JUST PURPOSE.</span>
                  </p>
                </div>
              </section>
            )}
          </>
        ) : (
          <CheckoutView 
            items={cartItems} 
            onBack={() => setActiveView('shop')}
            onSuccess={() => setCartItems([])}
          />
        )}
      </main>

      <footer className="bg-black border-t border-white/5 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-[0.4em]">FLAME</h1>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest max-w-xs leading-relaxed">
              Global Streetwear Culture. <br/>
              Providing garments for the intense and the silent.
            </p>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">© 2024 FLAME Inc.</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-6">
               <h4 className="text-[10px] font-black tracking-widest uppercase text-white/40">Information</h4>
               <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
                 <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Sizing Guide</a></li>
               </ul>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black tracking-widest uppercase text-white/40">Connect</h4>
               <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
                 <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">X / Twitter</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
               </ul>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckoutClick}
      />

      <AIStylist />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* PRODUCT QUICK VIEW MODAL WITH VARIANT SELECTOR */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-md" onClick={() => setSelectedProduct(null)}>
          <div className="bg-black w-full max-w-5xl h-full md:h-auto border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-500" onClick={e => e.stopPropagation()}>
            <div className="w-full md:w-1/2 bg-zinc-900 overflow-hidden relative group">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover grayscale scale-100 hover:scale-110 transition-transform duration-[2000ms]" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white text-black text-[8px] font-black tracking-widest uppercase px-3 py-1">PREMIUM</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase">{selectedProduct.name}</h2>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">{selectedProduct.category}</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-white/40 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              
              <p className="text-3xl font-light tracking-tight mb-8">${selectedProduct.price.toFixed(2)}</p>
              <p className="text-white/60 text-xs leading-relaxed tracking-[0.1em] uppercase mb-12 font-medium">{selectedProduct.description}</p>
              
              <div className="grid grid-cols-2 gap-10 mb-12">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Select Size</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(s => (
                      <button 
                        key={s} 
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[44px] h-[44px] flex items-center justify-center border text-[10px] font-black transition-all ${selectedSize === s ? 'bg-white text-black border-white' : 'border-white/10 text-white hover:border-white/40'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Select Color</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map(c => (
                      <button 
                        key={c} 
                        onClick={() => setSelectedColor(c)}
                        className={`px-4 h-[44px] flex items-center justify-center border text-[10px] font-black tracking-widest uppercase transition-all ${selectedColor === c ? 'bg-white text-black border-white' : 'border-white/10 text-white hover:border-white/40'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  handleAddToCart(selectedProduct, selectedSize, selectedColor);
                  setSelectedProduct(null);
                }}
                className="w-full bg-white text-black py-6 font-black uppercase text-[10px] tracking-[0.4em] hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
