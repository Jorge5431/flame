
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 z-[120] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <h2 className="text-sm font-black tracking-[0.3em] uppercase">Shopping Bag</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/20 gap-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p className="text-[10px] font-bold tracking-widest uppercase">The bag is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-6 group">
                <div className="w-20 h-28 bg-zinc-900 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-[10px] font-black tracking-widest uppercase">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-white transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
                      </button>
                    </div>
                    <p className="text-[9px] text-white/40 mt-1 uppercase tracking-widest">Size: {item.selectedSize} / Color: {item.selectedColor}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-white/40 hover:text-white transition-colors">—</button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-white/40 hover:text-white transition-colors">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-white/5 space-y-6">
          <div className="flex justify-between text-[11px] font-black tracking-widest uppercase">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full bg-white text-black py-5 font-black uppercase text-[10px] tracking-[0.3em] disabled:opacity-20 hover:bg-zinc-200 transition-colors"
          >
            Go to Checkout
          </button>
          <div className="flex justify-center gap-6 opacity-30 grayscale items-center">
            <span className="text-[8px] font-black tracking-widest">VISA</span>
            <span className="text-[8px] font-black tracking-widest">AMEX</span>
            <span className="text-[8px] font-black tracking-widest">PIX</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
