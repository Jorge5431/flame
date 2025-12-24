
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="group flex flex-col cursor-pointer" onClick={() => onViewDetails(product)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-white text-black px-8 py-4 text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-zinc-200"
          >
            Add to Bag
          </button>
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-[11px] font-black tracking-[0.2em] uppercase group-hover:text-white transition-colors">{product.name}</h3>
          <p className="text-[11px] font-light tracking-widest">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
