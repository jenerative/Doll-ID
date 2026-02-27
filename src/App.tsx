import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, ShieldCheck, Sparkles, Info, Star, Save, Upload, FileJson } from 'lucide-react';
import { toPng } from 'html-to-image';
import { IDCardPreview } from './components/IDCardPreview';
import { IDForm } from './components/IDForm';
import { IDCardData, INITIAL_DATA } from './types';
import { cn } from './lib/utils';

const STORAGE_KEY = 'doll_id_data';

export default function App() {
  const [data, setData] = useState<IDCardData>(INITIAL_DATA);
  const [isExporting, setIsExporting] = useState(false);
  const [iq, setIq] = useState(75);
  const [vibe, setVibe] = useState('Good Girl');
  const [side, setSide] = useState<'front' | 'back'>('front');
  const changeCounter = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed.data || INITIAL_DATA);
        setIq(parsed.iq || 75);
        setVibe(parsed.vibe || 'Good Girl');
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Auto-save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, iq, vibe }));
  }, [data, iq, vibe]);

  const vibes = ['Dumb', 'Ditzy', 'Subby', 'Horny', 'Stupid', 'Flirty', 'Bimbo', 'Slutty', 'Good Girl'];

  const handleDataChange = (newData: IDCardData) => {
    // Check if any text field changed (simple comparison)
    const textFields: (keyof IDCardData)[] = [
      'fullName', 'role', 'idNumber', 'bloodType', 'height', 'clearance', 'department', 
      'issueDate', 'expiryDate', 'cupSize', 'tattoos', 'piercings', 'hypnoTrigger1', 
      'hypnoTrigger2', 'certification', 'orgasmDenial', 'favoriteToy'
    ];
    const hasChanged = textFields.some(field => newData[field] !== data[field]);

    if (hasChanged) {
      changeCounter.current += 1;
      if (changeCounter.current >= 3) {
        setIq(Math.floor(Math.random() * (90 - 60 + 1)) + 60);
        setVibe(vibes[Math.floor(Math.random() * vibes.length)]);
        changeCounter.current = 0;
      }
    }
    setData(newData);
  };

  const handleExport = async () => {
    if (cardRef.current === null) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `doll-id-${side}-${data.fullName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      setData(INITIAL_DATA);
      setIq(75);
      setVibe('Good Girl');
      setSide('front');
      changeCounter.current = 0;
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSaveConfig = () => {
    const config = JSON.stringify({ data, iq, vibe }, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `doll-profile-${data.fullName.toLowerCase().replace(/\s+/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.data) {
          setData(parsed.data);
          setIq(parsed.iq || 75);
          setVibe(parsed.vibe || 'Good Girl');
          alert('Profile imported successfully!');
        }
      } catch (err) {
        alert('Invalid profile file.');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImportConfig} 
        accept=".json" 
        className="hidden" 
      />
      {/* Navigation / Header */}
      <header className="h-16 border-b border-rose-100 bg-white/60 backdrop-blur-md flex items-center px-8 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-stone-800">
            Doll <span className="text-rose-400 italic">ID</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-rose-100 pr-4 mr-2">
            <button 
              onClick={handleSaveConfig}
              className="p-2 text-stone-400 hover:text-rose-400 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
              title="Save Profile to File"
            >
              <FileJson className="w-4 h-4" />
              <span className="hidden sm:inline">Save Profile</span>
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-stone-400 hover:text-rose-400 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
              title="Import Profile from File"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
          </div>
          
          <button 
            onClick={handleReset}
            className="p-2 text-stone-400 hover:text-rose-400 transition-colors"
            title="Reset to Default"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-8 py-2.5 bg-rose-400 hover:bg-rose-500 disabled:bg-stone-200 text-white font-bold rounded-full transition-all active:scale-95 shadow-md shadow-rose-200"
          >
            {isExporting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isExporting ? 'EXPORTING...' : `EXPORT ${side.toUpperCase()} ID`}
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Panel: Form */}
        <section className="lg:col-span-7 p-8 lg:p-12 border-r border-rose-100 bg-white/40">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-3 text-stone-400 mb-8">
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em]">THE #1 CUNT CARD CREATOR // v1.0</span>
            </div>
            
            <IDForm data={data} onChange={handleDataChange} />

            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 flex gap-4">
              <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-500 leading-relaxed">
                Try not to think too hard or get too horny; your brain might leak out your needy holes. Ask a Sir for help if you need.
              </p>
            </div>
          </div>
        </section>

        {/* Right Panel: Preview */}
        <section className="lg:col-span-5 bg-[#FAF7F2] p-8 lg:p-12 relative">
          <div className="sticky top-24 flex flex-col items-center justify-center">
            {/* Background Decoration (moved inside sticky container or kept absolute) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-rose-200 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-rose-100 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-orange-100 rounded-full" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="mb-10 flex flex-col items-center gap-4">
                <div className="text-center space-y-2">
                  <h2 className="text-xs font-bold text-stone-400 uppercase tracking-[0.4em]">Doll ID Preview</h2>
                  <p className="text-[10px] text-rose-300 font-serif italic">You're already getting wet aren't you?</p>
                </div>
                
                <div className="flex p-1 bg-white/50 backdrop-blur-sm border border-rose-100 rounded-full shadow-sm">
                  <button
                    onClick={() => setSide('front')}
                    className={cn(
                      "px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                      side === 'front' ? "bg-rose-400 text-white shadow-md" : "text-stone-400 hover:text-rose-400"
                    )}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => setSide('back')}
                    className={cn(
                      "px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                      side === 'back' ? "bg-rose-400 text-white shadow-md" : "text-stone-400 hover:text-rose-400"
                    )}
                  >
                    Back
                  </button>
                </div>
              </div>
              
              <IDCardPreview data={data} cardRef={cardRef} iq={iq} vibe={vibe} side={side} />
              
              <div className="mt-12 flex justify-center">
                <div className="px-6 py-2.5 rounded-full border border-rose-100 bg-white/80 backdrop-blur-sm flex items-center gap-3 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest">Arousal Detection Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-14 border-t border-rose-100 bg-white/60 flex items-center px-8 justify-between text-[10px] text-stone-400 font-sans font-bold uppercase tracking-widest">
        <span>&copy; 2026 <a href="https://misosoup.club" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition-colors">Miso Soup Club</a> // All Rights Reserved</span>
        <div className="flex gap-8">
          <span>Dolls Documented: 69,420</span>
          <span>Disclaimer: No information shared here is stored.</span>
        </div>
      </footer>
    </div>
  );
}
