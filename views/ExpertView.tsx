
import React, { useState, useEffect, useRef } from 'react';
import { getExpertAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const ExpertView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Dr. Cluck, your AI Avian Specialist. How can I help you with your flock today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.concat(userMsg).map(m => ({ role: m.role, text: m.text }));
      const response = await getExpertAdvice(history);
      const aiMsg: ChatMessage = { role: 'model', text: response || "I'm sorry, I encountered an error.", timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col h-[calc(100vh-200px)] animate-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8 shrink-0">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Expert Consultations</h2>
        <p className="text-slate-600">Get specialized management and medical advice from our AI Vet.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col flex-grow overflow-hidden">
        {/* Chat Area */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <i className={`fa-solid ${msg.role === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-700 border border-slate-100'
                }`}>
                  {msg.text.split('\n').map((line, i) => <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>)}
                  <div className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <i className="fa-solid fa-robot text-slate-400"></i>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about vaccination schedules, nutrition, or bio-security..."
              className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 pr-16 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white w-12 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md disabled:bg-slate-300"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {['Vaccination schedule?', 'Coccidiosis treatment?', 'Bio-security tips', 'Egg drop syndrome'].map(chip => (
              <button 
                key={chip}
                onClick={() => setInput(chip)}
                className="whitespace-nowrap bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertView;
