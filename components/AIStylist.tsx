
import React, { useState, useRef, useEffect } from 'react';
import { getAIStylistResponse } from '../services/geminiService';
import { Message } from '../types';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'FLAME CONCIERGE AT YOUR SERVICE. HOW SHALL WE IGNITE YOUR STYLE?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getAIStylistResponse([...messages, userMsg]);
    setMessages(prev => [...prev, { role: 'assistant', content: response.toUpperCase() }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-black w-[350px] h-[500px] rounded-none shadow-2xl flex flex-col border border-white/10 animate-in fade-in zoom-in duration-500">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="font-black text-[10px] tracking-[0.3em] uppercase">Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 text-[10px] tracking-widest font-bold ${
                  msg.role === 'user' 
                    ? 'bg-white text-black' 
                    : 'bg-zinc-900 text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 p-4 flex gap-2">
                  <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-75" />
                  <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-white/10">
            <div className="flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="INPUT COMMAND..."
                className="flex-1 text-[10px] tracking-widest bg-zinc-900 border-none px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-white text-black px-4 py-3 hover:bg-zinc-200 disabled:opacity-20 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white text-black h-16 w-16 flex items-center justify-center rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </button>
      )}
    </div>
  );
};

export default AIStylist;
