
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  items: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ items, onBack, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      onSuccess();
    }, 2500);
  };

  if (orderComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 animate-in zoom-in fade-in duration-700">
        <div className="w-20 h-20 border border-white flex items-center justify-center rounded-full mb-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">Order Confirmed</h2>
        <p className="text-white/40 text-xs tracking-widest uppercase max-w-sm leading-relaxed mb-12">
          Your request has been accepted. The fire is being prepared for shipment. You will receive a confirmation email shortly.
        </p>
        <button 
          onClick={onBack}
          className="bg-white text-black px-12 py-5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all"
        >
          Return to Archive
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <button 
        onClick={onBack}
        className="text-[10px] font-bold tracking-[0.3em] uppercase mb-12 flex items-center gap-2 hover:opacity-60 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Shop
      </button>

      <form onSubmit={handleCompletePurchase} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Checkout Form */}
        <div className="space-y-16">
          <section className="space-y-8">
            <h2 className="text-2xl font-black tracking-[0.2em] uppercase">Customer Information</h2>
            <div className="space-y-4">
              <input required type="email" placeholder="EMAIL" className="w-full bg-zinc-900 border-none p-4 text-[10px] tracking-widest focus:ring-1 focus:ring-white/20" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="FIRST NAME" className="bg-zinc-900 border-none p-4 text-[10px] tracking-widest focus:ring-1 focus:ring-white/20" />
                <input required type="text" placeholder="LAST NAME" className="bg-zinc-900 border-none p-4 text-[10px] tracking-widest focus:ring-1 focus:ring-white/20" />
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black tracking-[0.2em] uppercase">Shipping Address</h2>
            <div className="space-y-4">
              <div className="relative">
                <select className="w-full bg-zinc-900 border-none p-4 text-[10px] tracking-widest focus:ring-1 focus:ring-white/20 appearance-none">
                  <option>UNITED STATES</option>
                  <option>BRAZIL</option>
                  <option>UNITED KINGDOM</option>
                  <option>JAPAN</option>
                  <option>GERMANY</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <input required type="text" placeholder="ADDRESS" className="w-full bg-zinc-900 border-none p-4 text-[10px] tracking-widest focus:ring-1 focus:ring-white/20" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="CITY" className="bg-zinc-900 border-none p-4 text-[10px] tracking-widest focus:ring-1 focus:ring-white/20" />
                <input required type="text" placeholder="POSTAL CODE" className="bg-zinc-900 border-none p-4 text-[10px] tracking-widest focus:ring-1 focus:ring-white/20" />
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black tracking-[0.2em] uppercase">Payment Method</h2>
            <div className="space-y-4">
              <label className="bg-zinc-900 p-4 border border-white/10 flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-4">
                   <input type="radio" name="payment" defaultChecked className="hidden" />
                   <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   </div>
                   <span className="text-[10px] font-bold tracking-widest">CREDIT CARD</span>
                </div>
                <div className="flex gap-2">
                   <img src="https://img.icons8.com/color/48/visa.png" className="h-4" alt="visa" />
                   <img src="https://img.icons8.com/color/48/mastercard.png" className="h-4" alt="mastercard" />
                </div>
              </label>
              <label className="bg-zinc-900 p-4 border border-white/5 flex items-center justify-between cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                   <input type="radio" name="payment" className="hidden" />
                   <div className="w-4 h-4 rounded-full border-2 border-white/20"></div>
                   <span className="text-[10px] font-bold tracking-widest">PIX (BRAZIL)</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest">INSTANT</span>
              </label>
            </div>
            
            <button 
              disabled={isProcessing}
              type="submit"
              className="w-full bg-white text-black py-6 text-xs font-black tracking-[0.5em] uppercase hover:bg-zinc-200 transition-colors relative"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  <span>AUTHORIZING...</span>
                </div>
              ) : (
                `Complete Purchase — $${subtotal.toFixed(2)}`
              )}
            </button>
            
            <div className="text-center pt-4">
               <p className="text-[9px] text-white/30 tracking-widest uppercase">
                 Secure checkout • Worldwide shipping • Encrypted by Stripe
               </p>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="bg-zinc-950 p-10 border border-white/5 h-fit sticky top-32">
          <h2 className="text-sm font-black tracking-[0.3em] uppercase mb-10 border-b border-white/5 pb-6">Order Summary</h2>
          <div className="space-y-8 mb-10">
            {items.map(item => (
              <div key={item.id} className="flex gap-6">
                <div className="w-20 h-24 bg-zinc-900 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                   <div>
                     <h4 className="text-[10px] font-black tracking-widest uppercase">{item.name}</h4>
                     <p className="text-[9px] text-white/40 mt-1 uppercase tracking-widest">Size: {item.selectedSize} / Color: {item.selectedColor}</p>
                   </div>
                   <div className="flex justify-between items-end">
                     <p className="text-[10px] text-white/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                     <p className="text-[10px] font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 pt-6 border-t border-white/5">
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-white/40">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] tracking-widest uppercase text-white/40">
              <span>Shipping</span>
              <span className="text-green-500">FREE</span>
            </div>
            <div className="flex justify-between text-[12px] font-black tracking-[0.2em] uppercase pt-4">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutView;
