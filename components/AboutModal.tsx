
import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}>
      <div className="max-w-2xl w-full text-center space-y-12 px-6" onClick={e => e.stopPropagation()}>
        <h2 className="text-sm font-black tracking-[0.5em] uppercase text-white/40">THE FLAME MANIFESTO</h2>
        <div className="space-y-8">
          <p className="text-2xl md:text-4xl font-light leading-relaxed tracking-wide">
            WE DO NOT COMPETE WITH THE NOISE. <br/>
            WE ARE THE <span className="font-black">SILENCE</span> THAT FOLLOWS THE STORM.
          </p>
          <p className="text-sm text-white/60 leading-loose tracking-[0.15em] uppercase">
            FLAME was founded on the principle of internal intensity. 
            Streetwear is often loud, but power is usually quiet. 
            Every garment is a medium of purpose, crafted for those who carry their own fire.
            Designed in the shadows, worn in the light.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-[10px] font-black tracking-[0.3em] uppercase border-b border-white pb-1 hover:text-white/60 transition-colors"
        >
          Close Manifesto
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
