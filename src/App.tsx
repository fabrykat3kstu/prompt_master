import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  Zap,
  Video,
  Code,
  GraduationCap,
  Wallet,
  Shield,
  List,
  Activity,
  Palmtree,
  Search,
  Check,
  Copy,
  ChevronRight,
  ChevronDown,
  Info,
  Star,
  Plus,
  Trash2,
  Sparkles,
  Smartphone,
  Terminal,
  Send,
  Loader2,
  ExternalLink,
  BookOpen,
  Edit,
  Sliders,
  Play
} from "lucide-react";
import { CATEGORIES, INITIAL_PROMPTS } from "./promptsData";
import { PromptItem, Category, UserCustomPrompt, TestExecutionResult } from "./types";
import InstallGuide from "./components/InstallGuide";

// Mapping category icon strings safely to Lucide components
const IconMap: { [key: string]: React.ComponentType<any> } = {
  Briefcase: Briefcase,
  Zap: Zap,
  Video: Video,
  SearchCode: Code,
  GraduationCap: GraduationCap,
  Wallet: Wallet,
  ShieldCheck: Shield,
  LayoutList: List,
  Activity: Activity,
  Palmtree: Palmtree
};

export default function App() {
  // Navigation & Tabs state
  // "explore" | "library" | "optimizer"
  const [activeTab, setActiveTab] = useState<"explore" | "library" | "optimizer">("explore");
  
  // Prompt Collections state
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customPrompts, setCustomPrompts] = useState<UserCustomPrompt[]>([]);
  
  // Filtering & Category selection state
  const [selectedCategory, setSelectedCategory] = useState<string>("strategy");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);
  
  // Parameter Inputs state (for the active variables form)
  // Maps promptId -> parameterName -> value
  const [paramInputs, setParamInputs] = useState<{ [promptId: string]: { [param: string]: string } }>({});
  
  // Play Console Test state
  const [testResults, setTestResults] = useState<{ [promptId: string]: TestExecutionResult }>({});
  
  // AI Optimizer panel state
  const [draftPrompt, setDraftPrompt] = useState<string>("");
  const [optimizedOutput, setOptimizedOutput] = useState<string>("");
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizeError, setOptimizeError] = useState<string>("");
  
  // New custom prompt form state
  const [isAddingCustom, setIsAddingCustom] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCat, setNewCat] = useState<string>("strategy");
  const [newPromptText, setNewPromptText] = useState<string>("");
  const [newTip, setNewTip] = useState<string>("");
  
  // Share & Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastSub, setToastSub] = useState<string | null>(null);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState<boolean>(false);

  // Initialize data from localStorage or fallback
  useEffect(() => {
    // 1. Favorites
    const savedFavs = localStorage.getItem("pm_favorites");
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
    
    // 2. Custom Prompts
    const savedCustom = localStorage.getItem("pm_custom_prompts");
    if (savedCustom) {
      const parsed = JSON.parse(savedCustom);
      setCustomPrompts(parsed);
      
      // Combine initial with custom
      const withCustom = [...INITIAL_PROMPTS, ...parsed.map((cp: any) => ({
        ...cp,
        id: cp.id,
        isCustom: true
      }))];
      setPrompts(withCustom);
    } else {
      setPrompts(INITIAL_PROMPTS);
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
      triggerToast("Usunięto z ulubionych", "Usunąłeś tę instrukcję ze swojej podręcznej strefy.");
    } else {
      updated = [...favorites, id];
      triggerToast("Dodano do ulubionych ⭐️", "Ta instrukcja jest teraz łatwo dostępna w sekcji Biblioteka.");
    }
    setFavorites(updated);
    localStorage.setItem("pm_favorites", JSON.stringify(updated));
  };

  // Helper to trigger toast notifications
  const triggerToast = (msg: string, sub: string = "") => {
    setToastMessage(msg);
    setToastSub(sub);
    setTimeout(() => {
      setToastMessage(null);
      setToastSub(null);
    }, 3000);
  };

  // Copy customized prompt text to clipboard
  const copyPromptText = (promptId: string, basePrompt: string) => {
    const substituted = getSubstitutedPrompt(promptId, basePrompt);
    navigator.clipboard.writeText(substituted);
    triggerToast("Skopiowano instrukcję! 📋", "Skojarzone parametry zostały poprawnie wklejone do tekstu.");
  };

  // Extract variables enclosed in brackets like [ZMIENNA]
  const getPlaceholders = (text: string): string[] => {
    const r = /\[([^\]]+)\]/g;
    const matches: string[] = [];
    let match;
    while ((match = r.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return Array.from(new Set(matches));
  };

  // Get compiled prompt string with current user variables substituted
  const getSubstitutedPrompt = (promptId: string, basePrompt: string): string => {
    const placeholders = getPlaceholders(basePrompt);
    let result = basePrompt;
    const inputs = paramInputs[promptId] || {};
    
    placeholders.forEach(param => {
      const userValue = inputs[param];
      if (userValue !== undefined && userValue !== "") {
        result = result.replace(new RegExp(`\\[${param}\\]`, "g"), userValue);
      }
    });
    return result;
  };

  // Handle variable parameter changes
  const handleParamChange = (promptId: string, param: string, value: string) => {
    setParamInputs(prev => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [param]: value
      }
    }));
  };

  // Delete custom prompt
  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Czy na pewno chcesz usunąć ten spersonalizowany prompt?")) {
      const updatedCustom = customPrompts.filter(p => p.id !== id);
      setCustomPrompts(updatedCustom);
      localStorage.setItem("pm_custom_prompts", JSON.stringify(updatedCustom));
      
      // Re-compile all prompts
      const withCustom = [...INITIAL_PROMPTS, ...updatedCustom.map((cp: any) => ({
        ...cp,
        id: cp.id,
        isCustom: true
      }))];
      setPrompts(withCustom);
      triggerToast("Usunięto prompt", "Wyszczególniony prompt został wykasowany.");
      if (expandedPromptId === id) setExpandedPromptId(null);
    }
  };

  // Handle adding custom prompt form submit
  const handleAddCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPromptText.trim()) {
      alert("Proszę uzupełnić tytuł oraz treść instrukcji.");
      return;
    }

    const cp: UserCustomPrompt = {
      id: "custom-" + Date.now(),
      title: newTitle,
      category: newCat,
      prompt: newPromptText,
      tip: newTip || "Twoja własna instrukcja dla AI.",
    };

    const updated = [cp, ...customPrompts];
    setCustomPrompts(updated);
    localStorage.setItem("pm_custom_prompts", JSON.stringify(updated));

    // Update global state
    const withCustom = [...INITIAL_PROMPTS, ...updated.map((cp: any) => ({
      ...cp,
      id: cp.id,
      isCustom: true
    }))];
    setPrompts(withCustom);

    // Reset Form
    setIsAddingCustom(false);
    setNewTitle("");
    setNewPromptText("");
    setNewTip("");
    
    // Select the category to highlight the added prompt
    setSelectedCategory(newCat);
    setActiveTab("library");
    setExpandedPromptId(cp.id);
    
    triggerToast("Zapisano prompt! 🚀", "Twoja autorska instrukcja dla AI trafiła bezpiecznie do biblioteki.");
  };

  // Async api call to test a prompt live
  const testPromptLive = async (promptId: string, basePromptText: string) => {
    const substituted = getSubstitutedPrompt(promptId, basePromptText);
    
    setTestResults(prev => ({
      ...prev,
      [promptId]: {
        promptText: substituted,
        loading: true
      }
    }));

    try {
      const response = await fetch("/api/test-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptText: basePromptText,
          userInputs: paramInputs[promptId] || {}
        })
      });

      if (!response.ok) {
        throw new Error("Wystąpił błąd po stronie serwera API Gemini.");
      }

      const data = await response.json();
      setTestResults(prev => ({
        ...prev,
        [promptId]: {
          promptText: substituted,
          loading: false,
          responseText: data.response,
          timestamp: new Date().toLocaleTimeString("pl-PL")
        }
      }));
      triggerToast("Wygenerowano prompt AI! 🧠", "Konsola poprawnie utworzyła gotową instrukcję.");
    } catch (err: any) {
      setTestResults(prev => ({
        ...prev,
        [promptId]: {
          promptText: substituted,
          loading: false,
          error: err?.message || "Nie udało się skomunikować z API Gemini."
        }
      }));
      triggerToast("Błąd wykonania", "Konsola nie zdołała przetworzyć zapytania modelowego.");
    }
  };

  // Async api call to optimize brief text with Gemini API
  const optimizeDraftPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftPrompt.trim()) {
      setOptimizeError("Proszę wpisać krótki szkic pomysłu na prompt.");
      return;
    }

    setIsOptimizing(true);
    setOptimizeError("");
    setOptimizedOutput("");

    try {
      const res = await fetch("/api/optimize-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: draftPrompt })
      });

      if (!res.ok) {
        throw new Error("Wymagany sekret w panelu Secrets jest niedostępny lub wystąpił błąd sieci.");
      }

      const data = await res.json();
      setOptimizedOutput(data.optimized);
      triggerToast("Prompt ulepszony! ✨", "Sztuczna inteligencja nadała Twojemu briefowi elitarną strukturę.");
    } catch (err: any) {
      setOptimizeError(err?.message || "Błąd połączenia z serwerem. Upewnij się, że serwer działa na porcie 3000.");
    } finally {
      setIsOptimizing(false);
    }
  };

  // Create custom prompt immediately from Optimized AI output
  const handleSaveOptimizedToLibrary = () => {
    if (!optimizedOutput) return;
    
    setNewTitle("Zoptymalizowany Prompt AI");
    setNewPromptText(optimizedOutput);
    setNewTip("Stworzony za pomocą kreatora AI Fabryki tekstu");
    setNewCat("marketing");
    setIsAddingCustom(true);
    setActiveTab("library");
    triggerToast("Uzupełniono kreator", "Przydziel nazwę i zapisz do wybranej kategorii.");
  };

  // Filter default prompts Based on category and search query
  const filteredPrompts = prompts.filter(p => {
    // Search query matches title, description or prompt text
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) || 
      p.prompt.toLowerCase().includes(query);

    if (searchQuery) return matchesSearch;
    
    // If no search, filter strictly by selected category
    return p.category === selectedCategory && !p.isCustom;
  });

  // Calculate stats
  const totalPromptsCount = prompts.length;
  const favoritesCount = favorites.length;
  const customCount = customPrompts.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 md:pb-0 font-sans">
      
      {/* 1. Header with branding & PWA setup trigger */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 custom-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo & Agency title */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab("explore")}>
            {/* Elegant Vector reconstruction of Fabryka tekstu logo */}
            <div className="relative shrink-0 w-10 h-10 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center p-1.5 shadow-md shadow-orange-500/5 group-hover:border-orange-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" className="w-full h-full stroke-orange-500 fill-none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                {/* Paper sheet */}
                <path d="M 35 15 L 75 20 C 78 20, 80 23, 79 26 L 68 88 C 67 91, 64 93, 61 92 L 21 85 C 18 85, 16 82, 17 79 L 28 17 C 29 14, 32 12, 35 15 Z" />
                <line x1="34" y1="32" x2="64" y2="36" />
                <line x1="32" y1="44" x2="62" y2="48" />
                <line x1="30" y1="56" x2="60" y2="60" />
                <line x1="28" y1="68" x2="48" y2="71" />
                
                {/* Gear bottom right */}
                <g transform="translate(73, 78)">
                  <circle cx="0" cy="0" r="15" className="fill-slate-950 stroke-orange-500" strokeWidth="6" />
                  <circle cx="0" cy="0" r="4" className="fill-slate-950" />
                </g>
              </svg>
            </div>
            
            <div className="text-left">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-none">PROMPT MASTER</h1>
              <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest block mt-0.5">Fabryka tekstu</span>
            </div>
          </div>

          {/* User profile / installation utilities */}
          <div className="flex items-center gap-2">
            
            {/* Install trigger button */}
            <button 
              onClick={() => setIsInstallGuideOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100 flex items-center gap-2 active:scale-95 cursor-pointer border border-transparent font-sans"
            >
              <Smartphone className="w-4 h-4 text-orange-400 shake-hover" />
              <span>Zainstaluj na telefonie</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main app workspace (Desktop Sidebar layout is preserved/complemented beautifully) */}
      <div className="max-w-7xl w-full mx-auto flex flex-1 items-stretch">
        
        {/* Sidebar Nav (visible only on desktop md:flex) */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 p-6 space-y-8 select-none">
          <div className="space-y-1.5">
            <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase px-3">Główne moduły</span>
            
            <button 
              onClick={() => { setActiveTab("explore"); setSearchQuery(""); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeTab === "explore" ? "sidebar-active-orange custom-shadow" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <Sliders className="w-4 h-4 text-slate-500" />
              <span>Baza instrukcji podstawowych</span>
            </button>

            <button 
              onClick={() => setActiveTab("library")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeTab === "library" ? "sidebar-active-indigo custom-shadow" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <div className="flex-1 flex items-center justify-between">
                <span>Moja biblioteka</span>
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono">{customCount + favoritesCount}</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab("optimizer")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeTab === "optimizer" ? "sidebar-active-indigo custom-shadow" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Kreator AI Gemini</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-150">
            <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase px-3 block mb-3">Statystyki</span>
            <div className="bg-[#F8FAFC] rounded-2xl p-4 space-y-3 border border-slate-200 custom-shadow mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Razem instrukcji dla AI:</span>
                <strong className="text-slate-800 font-bold">{totalPromptsCount}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Moje ulubione:</span>
                <strong className="text-slate-800 font-bold">{favoritesCount}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Własne prompty:</span>
                <strong className="text-slate-800 font-bold">{customCount}</strong>
              </div>
            </div>

            {/* Aesthetic Facebook Link in Sidebar */}
            <a 
              href="https://www.facebook.com/fabrykat3kstu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl text-xs font-bold text-slate-600 transition-all active:scale-95 mt-2"
            >
              <svg className="w-4 h-4 text-blue-600 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span>Nasz &nbsp;Facebook</span>
            </a>
          </div>
        </aside>

        {/* Dynamic Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
          
          {/* A. EXPLORE VIEW */}
          {activeTab === "explore" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Promo Pitch Header inside dashboard */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 md:p-8 rounded-3xl border border-slate-800 text-white relative overflow-hidden custom-shadow">
                <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-24 -top-24 w-72 h-72 bg-[#4f46e5]/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-2 text-left">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Katalog instrukcji dla AI premium</h2>
                  <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed">
                    Gotowe instrukcje dla AI opracowane we współpracy z ekspertami branżowymi. Wybierz schemat, uzupełnij określone parametry i skopiuj bezbłędny prompt.
                  </p>
                </div>
              </div>

              {/* Advanced Search Filter */}
              <div className="relative custom-shadow rounded-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Zacznij pisać, aby odnaleźć właściwy prompt (np. SEO, XTB, PDF, Kalendarz)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) {
                      setExpandedPromptId(null);
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs md:text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 font-sans text-left"
                />
              </div>

              {/* Categories Horizontal Slider (Only active if not in search query mode) */}
              {!searchQuery && (
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase text-left block">
                    Obszary kompetencyjne
                  </span>
                  <div className="flex flex-wrap gap-2 md:gap-2.5 py-1.5">
                    {CATEGORIES.map(cat => {
                      const CatIcon = IconMap[cat.icon] || Code;
                      const isActive = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); setExpandedPromptId(null); }}
                          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-[11px] font-bold shrink-0 transition-all border custom-shadow cursor-pointer ${isActive ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
                        >
                          <CatIcon className={`w-4 h-4 ${isActive ? "text-orange-400 animate-pulse" : "text-slate-400"}`} />
                          <span>{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Selected Category description */}
                  <div className="bg-white border border-slate-200/65 rounded-2xl p-4 flex gap-3 text-left custom-shadow glass-panel">
                    <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {CATEGORIES.find(c => c.id === selectedCategory)?.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* List of Prompts Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase text-left">
                    {searchQuery ? "Odnalezione wyniki" : "Zestawienie promptów"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    PULA {filteredPrompts.length} PROMPTÓW DLA AI
                  </span>
                </div>

                {filteredPrompts.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400">
                    <Search className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                    <p className="font-bold text-sm mb-1">Brak dopasowanych promptów</p>
                    <p className="text-xs text-slate-400">Spróbuj wpisać inne słowa kluczowe lub zresetuj filtry.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredPrompts.map(prompt => {
                      const isExpanded = expandedPromptId === prompt.id;
                      const placeholders = getPlaceholders(prompt.prompt);
                      const isFav = favorites.includes(prompt.id);
                      
                      return (
                        <div 
                          key={prompt.id}
                          className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 custom-shadow ${isExpanded ? "border-indigo-500 ring-4 ring-indigo-500/5 shadow-md" : "border-slate-200 hover:border-indigo-300"}`}
                        >
                          {/* Row Header clickable */}
                          <div 
                            onClick={() => setExpandedPromptId(isExpanded ? null : prompt.id)}
                            className="p-5 md:p-6 flex items-start justify-between cursor-pointer group"
                          >
                            <div className="flex-1 pr-4 text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                                  {CATEGORIES.find(c => c.id === prompt.category)?.name}
                                </span>
                                {placeholders.length > 0 && (
                                  <span className="text-[8px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                    {placeholders.length} PARAMETRY
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base md:text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                                {prompt.title}
                              </h3>
                              <p className="text-slate-500 mt-1.5 text-xs font-normal leading-relaxed">
                                {prompt.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={(e) => toggleFavorite(prompt.id, e)}
                                className="p-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full text-slate-400 hover:text-amber-500 transition-all cursor-pointer"
                              >
                                <Star className={`w-4 h-4 ${isFav ? "fill-amber-400 text-amber-500" : ""}`} />
                              </button>
                              
                              <div className={`p-2 bg-slate-50 text-slate-400 rounded-full shrink-0 group-hover:bg-slate-150 transition-all ${isExpanded ? "rotate-180 bg-indigo-50 text-indigo-600" : ""}`}>
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                          </div>

                          {/* Expanded Parameter Inputs Drawer & Copy Box */}
                          {isExpanded && (
                            <div className="border-t border-slate-100 bg-slate-50/30 p-5 md:p-6 space-y-6">
                              
                              {/* Variables Dynamic Form */}
                              {placeholders.length > 0 && (
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <Sliders className="w-4 h-4 text-indigo-500" />
                                    <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Skonfiguruj zmienne tekstowe</h4>
                                  </div>
                                  <div className="grid gap-3 sm:grid-cols-2">
                                    {placeholders.map(param => (
                                      <div key={param} className="space-y-1 text-left">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{param}</label>
                                        <textarea
                                          value={paramInputs[prompt.id]?.[param] || ""}
                                          onChange={(e) => handleParamChange(prompt.id, param, e.target.value)}
                                          placeholder={`Podaj wartość dla: [${param}]`}
                                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-350 font-sans custom-scrollbar"
                                          rows={2}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Live Console Output Preview */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-1.5 font-extrabold text-slate-705 uppercase tracking-wider">
                                    <Terminal className="w-4 h-4 text-slate-500" />
                                    <span>Podgląd skompilowanego promptu</span>
                                  </div>
                                </div>
                                <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-5 pt-12 relative shadow-inner overflow-hidden max-h-[250px] overflow-y-auto custom-scrollbar">
                                  
                                  {/* Red, Yellow, Green Mac Browser Dots */}
                                  <div className="absolute left-6 top-5 flex gap-1.5 opacity-60">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                  </div>

                                  <pre className="text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-left select-all">
                                    {getSubstitutedPrompt(prompt.id, prompt.prompt)}
                                  </pre>
                                </div>
                              </div>

                              {/* Tip Message box */}
                              <div className="bg-indigo-50/30 border-l-4 border-indigo-500 rounded-r-xl p-4 flex gap-3 text-left">
                                <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-indigo-950 font-medium leading-relaxed italic">
                                  <strong>Wskazówka:</strong> {prompt.tip}
                                </p>
                              </div>

                              {/* Controls (Copy & Run Test in server API) */}
                              <div className="flex flex-wrap gap-2 pt-2 justify-end border-t border-slate-100">
                                
                                {/* Test / Run with Gemini Server */}
                                <button
                                  onClick={() => testPromptLive(prompt.id, prompt.prompt)}
                                  className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                  disabled={testResults[prompt.id]?.loading}
                                >
                                  {testResults[prompt.id]?.loading ? (
                                    <>
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      <span>Trwa generowanie AI...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-3.5 h-3.5 text-indigo-500" />
                                      <span>Przetestuj z Gemini</span>
                                    </>
                                  )}
                                </button>

                                {/* Copy Prompt text */}
                                <button
                                  onClick={() => copyPromptText(prompt.id, prompt.prompt)}
                                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                                >
                                  <Copy className="w-3.5 h-3.5 text-slate-950" />
                                  <span>Skopiuj Gotowy Prompt</span>
                                </button>
                              </div>

                              {/* Interactive Live API Response view */}
                              {testResults[prompt.id] && (
                                <div className="border border-indigo-100 rounded-[2rem] bg-indigo-50/20 p-5 mt-4 text-left animate-fade-in space-y-3 shadow-inner">
                                  <div className="flex items-center justify-between border-b border-indigo-150 pb-2">
                                    <div className="flex items-center gap-1.5">
                                      <div className="p-1.5 bg-indigo-500 rounded-full text-white">
                                        <Terminal className="w-3.5 h-3.5" />
                                      </div>
                                      <h5 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">Konsola Testowa AI</h5>
                                    </div>
                                    <span className="text-[9px] text-indigo-600 font-mono font-bold">Otrzymany wynik: {testResults[prompt.id].timestamp || "Teraz"}</span>
                                  </div>
                                  
                                  {testResults[prompt.id].loading ? (
                                    <div className="py-6 flex flex-col items-center justify-center space-y-2 text-indigo-500 font-semibold text-xs">
                                      <Loader2 className="w-6 h-6 animate-spin" />
                                      <span>Generuję zoptymalizowany, ustrukturyzowany prompt...</span>
                                    </div>
                                  ) : testResults[prompt.id].error ? (
                                    <div className="text-red-700 font-medium text-xs bg-red-50 p-3 rounded-lg border border-red-200">
                                      Błąd: {testResults[prompt.id].error}
                                    </div>
                                  ) : (
                                    <div className="space-y-3">
                                      <div className="text-xs text-slate-700 bg-white/70 border border-slate-100 rounded-2xl p-4 max-h-[300px] overflow-y-auto custom-scrollbar whitespace-pre-wrap leading-relaxed">
                                        {testResults[prompt.id].responseText}
                                      </div>
                                      <div className="flex justify-end">
                                        <button
                                          onClick={() => {
                                            if (testResults[prompt.id].responseText) {
                                              navigator.clipboard.writeText(testResults[prompt.id].responseText || "");
                                              triggerToast("Skopiowano prompt!", "Zoptymalizowany prompt został zapisany w schowku.");
                                            }
                                          }}
                                          className="text-[10px] font-bold bg-white border border-indigo-200 text-indigo-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                                        >
                                          <Copy className="w-3 h-3" />
                                          Kopiuj Prompt
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* B. LIBRARY VIEW ("Moja Biblioteka") */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 text-left">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Twoja biblioteka instrukcji dla AI</h2>
                  <p className="text-xs text-slate-500 mt-1">Stwórz własne schematy lub miej podgląd na ulubione instrukcje systemowe.</p>
                </div>
                
                {/* Trigger Custom Prompt Form */}
                <button
                  onClick={() => setIsAddingCustom(!isAddingCustom)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 font-extrabold text-xs text-white rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-center"
                >
                  {isAddingCustom ? "Anuluj kreator" : "Dodaj własny prompt"}
                  {isAddingCustom ? null : <Plus className="w-4 h-4 text-white" />}
                </button>
              </div>

               {/* Add Custom prompt form */}
              {isAddingCustom && (
                <form 
                  onSubmit={handleAddCustomPromptSubmit}
                  className="bg-white border border-slate-200 rounded-3xl p-6 text-left custom-shadow space-y-4 animate-fade-in"
                >
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Sliders className="w-4 h-4 text-indigo-500" />
                    Wykreuj nową instrukcję dla AI
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1">Nazwa / Tytuł promptu</label>
                      <input 
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="np. Wiralowy Post na LinkedIn"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1">Kategoria przypisania</label>
                      <select
                        value={newCat}
                        onChange={(e) => setNewCat(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all cursor-pointer"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between pl-1">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Treść uniwersalnego promptu</label>
                      <span className="text-[9px] text-slate-400 italic">Zastosuj [PLATFORMA], [TEMAT] dla parametrów</span>
                     </div>
                    <textarea 
                      value={newPromptText}
                      onChange={(e) => setNewPromptText(e.target.value)}
                      placeholder="Wpisz treść systemową Twojego promptu. Przykład: 'Prowadzę agencję o specyfikacji [NISZA]. Pomóż mi zoptymalizować...'"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-300 custom-scrollbar"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1">Porada / Notatka optymalizacyjna</label>
                    <input 
                      type="text"
                      value={newTip}
                      onChange={(e) => setNewTip(e.target.value)}
                      placeholder="np. Dobrze scala się z materiałami PDF od klienta."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCustom(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Zrezygnuj
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer"
                    >
                      Zapisz w Bibliotece
                    </button>
                  </div>
                </form>
              )}

              {/* Favorites Collection section */}
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase text-left block">
                  Moje ulubione instrukcje (⭐️ {favoritesCount})
                </span>

                {favoritesCount === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-400">
                    <p className="text-xs">Nie dodałeś jeszcze żadnego promptu do ulubionych.</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {prompts.filter(p => favorites.includes(p.id)).map(p => (
                      <div 
                        key={p.id}
                        onClick={() => { setSelectedCategory(p.category); setActiveTab("explore"); setExpandedPromptId(p.id); }}
                        className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-indigo-400 custom-shadow transition-all text-left"
                      >
                        <div className="pr-4">
                           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                            {CATEGORIES.find(c => c.id === p.category)?.name}
                          </span>
                          <h4 className="font-extrabold text-sm text-slate-850 leading-tight">{p.title}</h4>
                          <p className="text-slate-500 text-[11px] truncate mt-0.5 max-w-sm sm:max-w-md">{p.description}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-bold text-indigo-600 uppercase flex items-center gap-0.5 mr-2">
                            <span>OTWÓRZ</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                          <button
                            onClick={(e) => toggleFavorite(p.id, e)}
                            className="p-1.5 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Prompts list manager */}
              <div className="space-y-4 pt-4">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase text-left block">
                  Moje autorskie instrukcje dla AI (💻 {customCount})
                </span>

                {customCount === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400">
                    <p className="text-xs mb-2">Brak własnych instrukcji dla AI.</p>
                    <button
                      onClick={() => setIsAddingCustom(true)}
                      className="text-xs text-indigo-600 font-bold underline cursor-pointer"
                    >
                      Stwórz swój pierwszy własny prompt teraz
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {prompts.filter(p => p.isCustom).map(prompt => {
                      const isExpanded = expandedPromptId === prompt.id;
                      const placeholders = getPlaceholders(prompt.prompt);
                      const isFav = favorites.includes(prompt.id);
                      
                      return (
                        <div 
                          key={prompt.id}
                          className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 custom-shadow ${isExpanded ? "border-indigo-500 ring-4 ring-indigo-500/5 shadow-md" : "border-slate-200 hover:border-indigo-300"}`}
                        >
                          {/* Row Header clickable */}
                          <div 
                            onClick={() => setExpandedPromptId(isExpanded ? null : prompt.id)}
                            className="p-5 md:p-6 flex items-start justify-between cursor-pointer group"
                          >
                            <div className="flex-1 pr-4 text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[8px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                  TWÓJ WŁASNY PROMPT
                                </span>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                  {CATEGORIES.find(c => c.id === prompt.category)?.name}
                                </span>
                              </div>
                              <h3 className="text-base md:text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                                {prompt.title}
                              </h3>
                              <p className="text-slate-500 mt-1.5 text-xs font-normal leading-relaxed">
                                {prompt.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={(e) => toggleFavorite(prompt.id, e)}
                                className="p-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full text-slate-400 hover:text-amber-500 transition-all cursor-pointer"
                              >
                                <Star className={`w-4 h-4 ${isFav ? "fill-amber-400 text-amber-500" : ""}`} />
                              </button>
                              
                              <button 
                                onClick={(e) => handleDeleteCustom(prompt.id, e)}
                                className="p-2 bg-slate-50 border border-slate-200 hover:border-red-500 hover:bg-red-50 text-slate-400 rounded-full transition-all cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                              <div className={`p-2 bg-slate-50 text-slate-400 rounded-full shrink-0 ${isExpanded ? "rotate-180 bg-orange-100 text-orange-600" : ""}`}>
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                          </div>

                          {/* Expanded Parameter Inputs Drawer */}
                          {isExpanded && (
                            <div className="border-t border-slate-100 bg-slate-50/50 p-5 md:p-6 space-y-6">
                              
                              {/* Variables Dynamic Form */}
                              {placeholders.length > 0 && (
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <Sliders className="w-4 h-4 text-slate-500" />
                                    <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Skonfiguruj zmienne tekstowe</h4>
                                  </div>
                                  <div className="grid gap-3 sm:grid-cols-2">
                                    {placeholders.map(param => (
                                      <div key={param} className="space-y-1 text-left">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{param}</label>
                                        <textarea
                                          value={paramInputs[prompt.id]?.[param] || ""}
                                          onChange={(e) => handleParamChange(prompt.id, param, e.target.value)}
                                          placeholder={`Podaj wartość dla: [${param}]`}
                                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-300 font-sans custom-scrollbar"
                                          rows={2}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Live Console Output Preview */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-1.5 font-extrabold text-slate-700 uppercase tracking-wider">
                                    <Terminal className="w-4 h-4 text-slate-500" />
                                    <span>Podgląd skompilowanego promptu</span>
                                  </div>
                                  <span className="text-[9px] text-slate-400 font-mono">AUTORSKA METODA</span>
                                </div>
                                <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-5 pt-12 relative shadow-inner overflow-hidden max-h-[250px] overflow-y-auto custom-scrollbar">
                                  <div className="absolute left-6 top-5 flex gap-1.5 opacity-60">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                  </div>
                                  <pre className="text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed text-left select-all">
                                    {getSubstitutedPrompt(prompt.id, prompt.prompt)}
                                  </pre>
                                </div>
                              </div>

                              {/* Controls */}
                              <div className="flex gap-2 pt-2 justify-end border-t border-slate-100">
                                <button
                                  onClick={() => testPromptLive(prompt.id, prompt.prompt)}
                                  className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                  disabled={testResults[prompt.id]?.loading}
                                >
                                  {testResults[prompt.id]?.loading ? (
                                    <>
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      <span>Trwa generowanie AI...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-3.5 h-3.5 text-indigo-500" />
                                      <span>Przetestuj z Gemini</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => copyPromptText(prompt.id, prompt.prompt)}
                                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                                >
                                  <Copy className="w-3.5 h-3.5 text-slate-950" />
                                  <span>Skopiuj Gotowy Prompt</span>
                                </button>
                              </div>

                              {/* Interactive Live AI Response view */}
                              {testResults[prompt.id] && (
                                <div className="border border-indigo-100 rounded-[2rem] bg-indigo-50/20 p-5 mt-4 text-left animate-fade-in space-y-3">
                                  <div className="flex items-center justify-between border-b border-indigo-150 pb-2">
                                    <div className="flex items-center gap-1.5">
                                      <div className="p-1.5 bg-indigo-500 rounded-full text-white">
                                        <Terminal className="w-3.5 h-3.5" />
                                      </div>
                                      <h5 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">Konsola Testowa AI</h5>
                                    </div>
                                    <span className="text-[9px] text-indigo-600 font-mono font-bold">Otrzymany wynik: {testResults[prompt.id].timestamp || "Teraz"}</span>
                                  </div>
                                  
                                  {testResults[prompt.id].loading ? (
                                    <div className="py-6 flex flex-col items-center justify-center space-y-2 text-indigo-500 font-semibold text-xs">
                                      <Loader2 className="w-6 h-6 animate-spin" />
                                      <span>Rozważam odpowiedź...</span>
                                    </div>
                                  ) : testResults[prompt.id].error ? (
                                    <div className="text-red-700 font-medium text-xs bg-red-50 p-3 rounded-lg border border-red-200">
                                      Błąd: {testResults[prompt.id].error}
                                    </div>
                                  ) : (
                                    <div className="space-y-3">
                                      <div className="text-xs text-slate-700 bg-white/70 border border-slate-100 rounded-2xl p-4 max-h-[300px] overflow-y-auto custom-scrollbar whitespace-pre-wrap leading-relaxed">
                                        {testResults[prompt.id].responseText}
                                      </div>
                                      <div className="flex justify-end">
                                        <button
                                          onClick={() => {
                                            if (testResults[prompt.id].responseText) {
                                              navigator.clipboard.writeText(testResults[prompt.id].responseText || "");
                                              triggerToast("Skopiowano odpowiedź AI!", "Generowana treść jest w schowku.");
                                            }
                                          }}
                                          className="text-[10px] font-bold bg-white border border-indigo-200 text-indigo-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                                        >
                                          <Copy className="w-3 h-3" />
                                          Kopiuj Odpowiedź
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* C. AI OPTIMIZER VIEW ("Kreator AI") */}
          {activeTab === "optimizer" && (
            <div className="space-y-6 animate-fade-in text-left">
              
              {/* Promo Pitch Header and Vibe banner */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 p-6 md:p-8 rounded-[2rem] border border-indigo-900/40 text-white relative overflow-hidden shadow-lg">
                <div className="absolute -right-32 -bottom-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-32 -top-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Kreator i rafineria promptów</h2>
                  <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed">
                    Masz luźny pomysł, ale nie wiesz, jak nadać mu profesjonalny kształt? wpisz draft po polsku. model Gemini przełoży go na pięcioetapowy, ustrukturyzowany prompt dla wygładzonych copywriterów.
                  </p>
                </div>
              </div>

              {/* Input area */}
              <div className="grid gap-6 md:grid-cols-12">
                
                {/* Handlers card */}
                <div className="md:col-span-12 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <form onSubmit={optimizeDraftPrompt} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pl-1 block">
                        Twój roboczy pomysł na prompt (draft)
                      </label>
                      <textarea
                        value={draftPrompt}
                        onChange={(e) => setDraftPrompt(e.target.value)}
                        placeholder="np.: Chcę napisać post na Facebooku o pozycjonowaniu stron medycznych. Powinien uderzyć w ból braku klientów z Google i promować audyt WCAG."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-350 font-sans custom-scrollbar"
                        rows={5}
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-slate-400">
                        Zaawansowany model: <strong>gemini-3.5-flash</strong>
                      </span>
                      
                      <button
                        type="submit"
                        disabled={isOptimizing}
                        className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isOptimizing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                            <span>Trwa rafinowanie promptu...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-orange-400 shake-hover" />
                            <span>Zoptymalizuj z Gemini API</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Response / Result Area */}
                {(optimizedOutput || optimizeError) && (
                  <div className="md:col-span-12 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 animate-fade-in text-left">
                    
                    {optimizeError && (
                      <div className="bg-red-50 border border-red-205 text-red-800 p-4 rounded-xl text-xs font-semibold">
                        Błąd: {optimizeError}
                      </div>
                    )}

                    {optimizedOutput && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-widest">
                              Zoptymalizowany Wzór Promptu
                            </h4>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(optimizedOutput);
                                triggerToast("Dodano do schowka!", "Nowy zaawansowany prompt czeka w gotowości.");
                              }}
                              className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-250 text-slate-700 font-bold text-[10px] rounded-lg transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              Kopiuj prompt
                            </button>

                            <button
                              onClick={handleSaveOptimizedToLibrary}
                              className="px-3 py-1.5 bg-orange-100 border border-orange-200 hover:bg-orange-200 text-orange-800 font-bold text-[10px] rounded-lg transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Zapisz w Bibliotece
                            </button>
                          </div>
                        </div>

                        {/* Monaco-like preview screen */}
                        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 pt-12 relative shadow-inner overflow-hidden max-h-[450px] overflow-y-auto custom-scrollbar">
                          <div className="absolute left-6 top-5 flex gap-1.5 opacity-60">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          </div>
                          <pre className="text-slate-200 text-xs md:text-sm font-mono whitespace-pre-wrap leading-relaxed text-left selection:bg-orange-500/30">
                            {optimizedOutput}
                          </pre>
                        </div>

                        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-4 flex gap-3 text-left shadow-sm">
                          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-indigo-950 leading-relaxed font-medium">
                            Ten ustrukturyzowany prompt zawiera predefiniowane parametry. możesz zapisać go w Bibliotece, podmienić parametry i testować bezpośrednio w konsoli roboczej na żywo!
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>
          )}

        </main>
      </div>

      {/* 3. Mobile Bottom Floating Navigation Dock (visible under md width) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-6 flex items-center justify-around shadow-lg">
        
        <button 
          onClick={() => { setActiveTab("explore"); setSearchQuery(""); }}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "explore" ? "text-orange-500" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Katalog</span>
        </button>

        <button 
          onClick={() => setActiveTab("library")}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "library" ? "text-orange-500" : "text-slate-400 hover:text-slate-600"}`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            {(customCount + favoritesCount) > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-slate-950 font-black text-[8px] px-1.5 py-0.2 rounded-full border border-white">
                {customCount + favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider">Biblioteka</span>
        </button>

        <button 
          onClick={() => setActiveTab("optimizer")}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "optimizer" ? "text-orange-500" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Kreator AI</span>
        </button>
      </nav>

      {/* 4. Install PWA Guide modal popup */}
      <InstallGuide 
        isOpen={isInstallGuideOpen} 
        onClose={() => setIsInstallGuideOpen(false)} 
      />

      {/* 5. Sleek Elegant Success popup Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-slate-950 text-white px-5 py-4 rounded-3xl shadow-2xl z-50 flex items-center gap-3.5 border border-slate-800 animate-slide-up max-w-sm sm:max-w-md w-[88vw] text-left">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/35 shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-xs text-white uppercase tracking-wider leading-none">{toastMessage}</p>
            {toastSub && <p className="text-[10px] text-slate-400 truncate mt-1">{toastSub}</p>}
          </div>
        </div>
      )}

    </div>
  );
}
