import { useState, useEffect } from "react";
import { Download, X, Smartphone, ArrowUpFromLine, MoreVertical, PlusSquare, Play, HelpCircle } from "lucide-react";

interface InstallGuideProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export default function InstallGuide({ onClose, isOpen = false }: InstallGuideProps) {
  const [deviceType, setDeviceType] = useState<"android" | "ios" | "desktop">("desktop");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setDeviceType("ios");
    } else if (/android/.test(ua)) {
      setDeviceType("android");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full md:max-w-lg bg-slate-900 border-t md:border border-slate-800 rounded-t-[2rem] md:rounded-[2rem] text-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Orange Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-indigo-500 rounded-full" />

        {/* Header */}
        <div className="p-6 pb-2 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <Smartphone className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide">Zainstaluj na telefonie</h3>
              <p className="text-xs text-slate-400">Dodaj Prompt Master do ekranu głównego</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-hide flex-1">
          {/* Brand Presentation */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center">
            {/* Vector Brand Logo */}
            <div className="w-12 h-12 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" className="w-9 h-9 stroke-[#ee8130] fill-none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 35 15 L 75 20 C 78 20, 80 23, 79 26 L 68 88 C 67 91, 64 93, 61 92 L 21 85 C 18 85, 16 82, 17 79 L 28 17 C 29 14, 32 12, 35 15 Z" />
                <line x1="34" y1="32" x2="64" y2="36" />
                <line x1="32" y1="44" x2="62" y2="48" />
                <line x1="30" y1="56" x2="60" y2="60" />
                <line x1="28" y1="68" x2="48" y2="71" />
                <g transform="translate(75, 80)">
                  <circle cx="0" cy="0" r="15" className="fill-slate-900 stroke-[#ee8130]" strokeWidth="6" />
                  <circle cx="0" cy="0" r="4" className="fill-slate-900" />
                </g>
              </svg>
            </div>
            <div className="text-left">
              <h4 className="font-extrabold text-sm text-slate-100">PROMPT MASTER App</h4>
              <p className="text-xs text-slate-400">Aplikacja ładuje się natychmiast, działa bez instalowania z Google Play i zajmuje tylko 2 MB pamięci.</p>
            </div>
          </div>

          {/* Quick tab for selecting Android / iOS instructions */}
          <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-xl">
            <button 
              onClick={() => setDeviceType("android")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${deviceType === "android" ? "bg-orange-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`}
            >
              Android (Chrome)
            </button>
            <button 
              onClick={() => setDeviceType("ios")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${deviceType === "ios" ? "bg-orange-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`}
            >
              iPhone / iOS
            </button>
            <button 
              onClick={() => setDeviceType("desktop")}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${deviceType === "desktop" ? "bg-orange-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`}
            >
              Inny / PC
            </button>
          </div>

          {/* Dynamic Instructions based on choice */}
          {deviceType === "android" && (
            <div className="space-y-4 animate-fade-in text-slate-300">
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">1</div>
                <p className="text-sm text-left">
                  Otwórz przeglądarkę <strong className="text-white font-semibold">Google Chrome</strong> na telefonie.
                </p>
              </div>
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">2</div>
                <div className="text-left">
                  <p className="text-sm">
                    Kliknij ikonę menu <strong className="text-white font-semibold">trzech pionowych kropek</strong> w prawym górnym rogu:
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium border border-slate-700">
                    <MoreVertical className="w-4 h-4 text-slate-100" /> Opcje Chrome
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">3</div>
                <div className="text-left">
                  <p className="text-sm">
                    Wybierz opcję <strong className="text-white font-semibold">Dołącz do ekranu głównego</strong> lub <strong className="text-white font-semibold">Zainstaluj aplikację</strong>.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs font-semibold border border-orange-500/20">
                    <Download className="w-3.5 h-3.5" /> Dodaj do ekranu głównego
                  </div>
                </div>
              </div>
            </div>
          )}

          {deviceType === "ios" && (
            <div className="space-y-4 animate-fade-in text-slate-300">
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">1</div>
                <p className="text-sm text-left">
                  Otwórz tę stronę w przeglądarce <strong className="text-white font-semibold">Safari</strong> na swoim iPhonie.
                </p>
              </div>
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">2</div>
                <div className="text-left">
                  <p className="text-sm">
                    Stuknij ikonę <strong className="text-white font-semibold">Udostępnij</strong> (kwadrat z strzałką w górę) na dolnym pasku nawigacyjnym:
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium border border-slate-700">
                    <ArrowUpFromLine className="w-3.5 h-3.5 text-blue-400" /> Przycisk udostępniania
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">3</div>
                <div className="text-left">
                  <p className="text-sm">
                    Przewiń menu w dół i wybierz opcję <strong className="text-white font-semibold">Do ekranu początkowego</strong>.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs font-semibold border border-orange-500/20">
                    <PlusSquare className="w-3.5 h-3.5 text-orange-400" /> Do ekranu początkowego
                  </div>
                </div>
              </div>
            </div>
          )}

          {deviceType === "desktop" && (
            <div className="space-y-4 animate-fade-in text-slate-300">
              <p className="text-sm text-slate-400 text-left">
                Chociaż ta aplikacja jest zoptymalizowana pod urządzenia mobilne, możesz zainstalować ją również na komputerze PC za pomocą przeglądarki Chrome lub Edge:
              </p>
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">1</div>
                <p className="text-sm text-left">
                  Spójrz na pasek adresu przeglądarki u góry ekranu.
                </p>
              </div>
              <div className="flex gap-4 items-start bg-slate-950/40 p-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500 shrink-0">2</div>
                <p className="text-sm text-left">
                  Kliknij ikonę <strong className="text-white font-semibold">"Zainstaluj aplikację"</strong> (monitor ze strzałką w dół lub mały plusik) po prawej stronie paska adresu.
                </p>
              </div>
              <div className="pt-2">
                <p className="text-xs text-slate-400 mb-2 text-left">Szybkie parowanie z telefonem? Skopiuj ten unikalny adres:</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={window.location.href}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shrink-0"
                  >
                    {copied ? "Skopiowano!" : "Kopiuj link"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">PROMPT MASTER — POWERED BY FABRYKA TEKSTU</p>
        </div>
      </div>
    </div>
  );
}
