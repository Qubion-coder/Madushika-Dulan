import React, { useState } from 'react';
import { Check, Link as LinkIcon, MessageSquare } from 'lucide-react';

const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const generatedLink = `${window.location.origin}/?prefix=${encodeURIComponent(prefix)}&name=${encodeURIComponent(guestName)}`;

  const messageTemplate = `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Dulan & Madushika`;

  const copyToClipboard = async (text: string, isLink: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isLink) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-[#fdfaf5] font-montserrat p-6 md:p-12 flex flex-col items-center justify-start md:justify-center relative smooth-mobile-scroll">
      {/* Background decorations matching the theme */}
      <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />
      
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-200/50 p-8 md:p-12 relative z-10">
        <h1 className="font-cinzel text-3xl md:text-4xl text-theme-900 mb-8 text-center font-bold tracking-widest drop-shadow-sm">
          Generate Link
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] md:text-xs font-bold text-theme-700 uppercase tracking-[0.2em] mb-2">
              Prefix
            </label>
            <div className="relative">
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full p-4 rounded-xl border border-theme-200 focus:outline-none focus:ring-2 focus:ring-theme-400 bg-white text-theme-900 font-medium appearance-none shadow-sm"
              >
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-theme-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] md:text-xs font-bold text-theme-700 uppercase tracking-[0.2em] mb-2">
              Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full p-4 rounded-xl border border-theme-200 focus:outline-none focus:ring-2 focus:ring-theme-400 bg-white text-theme-900 font-medium placeholder-stone-400 shadow-sm"
            />
          </div>

          <div className="pt-8 border-t border-theme-100">
            <h2 className="text-[10px] md:text-xs font-bold text-theme-700 uppercase tracking-[0.2em] mb-4">
              Generated Preview
            </h2>
            <div className="bg-[#fdfaf5] p-6 rounded-2xl border border-theme-200/60 whitespace-pre-wrap font-medium text-stone-700 text-sm md:text-base leading-relaxed shadow-inner min-h-[200px]">
              {guestName ? messageTemplate : <span className="text-stone-400 italic">Enter a guest name to see the preview...</span>}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => copyToClipboard(generatedLink, true)}
              disabled={!guestName}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-theme-800 border border-theme-200 px-6 py-4 rounded-xl font-bold uppercase tracking-[0.15em] text-xs hover:bg-theme-50 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />}
              {copiedLink ? 'Copied!' : 'Copy Link Only'}
            </button>
            <button
              onClick={() => copyToClipboard(messageTemplate, false)}
              disabled={!guestName}
              className="flex-1 flex items-center justify-center gap-2 bg-theme-800 text-white px-6 py-4 rounded-xl font-bold uppercase tracking-[0.15em] text-xs hover:bg-theme-900 transition-all shadow-lg shadow-theme-900/20 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {copiedMessage ? <Check className="w-4 h-4" /> : <MessageSquare className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />}
              {copiedMessage ? 'Copied!' : 'Copy Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
