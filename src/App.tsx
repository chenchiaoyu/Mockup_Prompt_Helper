import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  Search, 
  Sparkles, 
  Cpu, 
  Globe, 
  Package, 
  Camera, 
  Compass, 
  Shapes, 
  Brush, 
  ShieldAlert, 
  Zap, 
  Box, 
  Layers, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  ExternalLink,
  Store,
  Coins,
  Maximize2,
  SlidersHorizontal,
  Eye,
  Info
} from 'lucide-react';

import { 
  CategoryKey, 
  AIPlatform, 
  promptDatabase, 
  midjourneyVersions, 
  MockupTemplate, 
  NoiseLevel, 
  noiseOptions,
  PromptItem,
  ProductScale,
  ProductCost,
  scaleDefinitions,
  costDefinitions
} from './data/promptDatabase';
import { SubCategoryAccordion } from './components/SubCategoryAccordion';
import { MobileCategoryNav } from './components/MobileCategoryNav';
import { MobilePromptModal } from './components/MobilePromptModal';
import { ParameterPanel } from './components/ParameterPanel';
import { FullPromptModal } from './components/FullPromptModal';
import { UserGuideModal } from './components/UserGuideModal';
import { BookOpen, HelpCircle } from 'lucide-react';

const sidebarIconMap: Record<string, React.ElementType> = {
  Package,
  Camera,
  Compass,
  Shapes,
  Brush,
  ShieldAlert,
  Store,
  Layers,
};

export default function AestheticPromptMaster() {
  // State: Platform Engine & Model Version
  const [activeEngine, setActiveEngine] = useState<AIPlatform>('midjourney');
  const [selectedMJVersion, setSelectedMJVersion] = useState('v8.2');

  // State: Categories, Search, Selection (Default: cleared as requested)
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('mockupProducts');
  const [selectedPromptIds, setSelectedPromptIds] = useState<Set<string>>(new Set());
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('all');
  const [scaleFilter, setScaleFilter] = useState<ProductScale>('all');
  const [costFilter, setCostFilter] = useState<ProductCost>('all');
  const [collapsedSubCategories, setCollapsedSubCategories] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [fullPromptItem, setFullPromptItem] = useState<PromptItem | null>(null);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);

  // State: Parameters (Default: clean / cleared)
  const [subjectText, setSubjectText] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [imageWeight, setImageWeight] = useState('1.0');
  const [stylizeValue, setStylizeValue] = useState('150');
  const [chaosValue, setChaosValue] = useState('0');
  const [customNegative, setCustomNegative] = useState('');
  const [mockupPureMode, setMockupPureMode] = useState(true);

  // State: Noise & Grain Controller
  const [noiseLevel, setNoiseLevel] = useState<NoiseLevel>('none');

  // State: Composition Reference
  const [enableCompositionRef, setEnableCompositionRef] = useState(false);
  const [compositionImageUrl, setCompositionImageUrl] = useState('');
  const [compositionStrength, setCompositionStrength] = useState<'strict' | 'medium' | 'loose'>('strict');
  const [compositionGuidanceType, setCompositionGuidanceType] = useState<'structural_layout' | 'grid_perspective' | 'silhouettes_framing'>('structural_layout');

  // State: Color Palette
  const [enableColorPalette, setEnableColorPalette] = useState(false);
  const [customHexColors, setCustomHexColors] = useState<string[]>(['#0F172A', '#0284C7', '#F8FAFC']);
  const [colorGradingIntensity, setColorGradingIntensity] = useState<'dominant' | 'accent' | 'atmospheric'>('accent');

  // State: Custom Real-World Physical Dimensions (Lock proportions and avoid distortion)
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [customDepth, setCustomDepth] = useState('');
  const [customDimensionUnit, setCustomDimensionUnit] = useState('cm');

  // Toggle single prompt
  const togglePrompt = (id: string) => {
    setSelectedPromptIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle collapse state for a subcategory
  const toggleSubCategoryCollapse = (subCatId: string) => {
    setCollapsedSubCategories(prev => ({
      ...prev,
      [subCatId]: !prev[subCatId]
    }));
  };

  // Expand or collapse all subcategories in the current category
  const toggleAllSubCategories = () => {
    const currentSubCats = promptDatabase[selectedCategory]?.subCategories || [];
    const allCurrentlyCollapsed = currentSubCats.every(sc => collapsedSubCategories[sc.id]);
    
    const nextState: Record<string, boolean> = { ...collapsedSubCategories };
    currentSubCats.forEach(sc => {
      nextState[sc.id] = !allCurrentlyCollapsed;
    });
    setCollapsedSubCategories(nextState);
  };

  // Clear all selections (Default empty state)
  const handleClearAll = () => {
    setSelectedPromptIds(new Set());
    setSubjectText('');
    setCustomNegative('');
    setMockupPureMode(true);
    setNoiseLevel('none');
    setEnableCompositionRef(false);
    setCompositionImageUrl('');
    setEnableColorPalette(false);
    setCustomWidth('');
    setCustomHeight('');
    setCustomDepth('');
    setScaleFilter('all');
    setCostFilter('all');
  };

  // Apply Quick Mockup Template
  const handleApplyTemplate = (template: MockupTemplate) => {
    setSubjectText(template.subject);
    setAspectRatio(template.aspectRatio);
    setStylizeValue(template.stylize);
    setSelectedPromptIds(new Set(template.selectedIds));
    setMockupPureMode(true);
  };

  // Random Mockup Preset Combination
  const handleRandomMockup = () => {
    const randomItemFromCat = (catKey: CategoryKey) => {
      const items = promptDatabase[catKey].items;
      return items[Math.floor(Math.random() * items.length)];
    };

    const product = randomItemFromCat('mockupProducts');
    const perspective = randomItemFromCat('perspectivesComposition');
    const material = randomItemFromCat('materialsFinishes');
    const light = randomItemFromCat('studioLighting');
    const aesthetic = randomItemFromCat('designAesthetics');
    const negative = promptDatabase.negativePurity.items.find(i => i.id === 'np_no_text_logo') || promptDatabase.negativePurity.items[0];

    setSelectedPromptIds(new Set([product.id, perspective.id, material.id, light.id, aesthetic.id, negative.id]));
    setSubjectText(`${product.label.split('(')[0].trim()} mockup, pristine isolated commercial presentation`);
    setMockupPureMode(true);
    setAspectRatio('16:9');
    setStylizeValue('150');
  };

  // Category switch handler
  const handleSelectCategory = (catKey: CategoryKey) => {
    setSelectedCategory(catKey);
    setSubCategoryFilter('all');
  };

  // Open Full Prompt Modal Inspector
  const handleOpenFullPrompt = (e: React.MouseEvent, item: PromptItem) => {
    e.stopPropagation();
    setFullPromptItem(item);
  };

  // Google Reference & AI Concept Search
  const handleGoogleSearch = (e: React.MouseEvent, item: PromptItem | { label: string; prompt: string; aestheticConcept?: string; id?: string }) => {
    e.stopPropagation();
    const isAesthetic = !!item.aestheticConcept || (item.id && item.id.startsWith('da_')) || selectedCategory === 'designAesthetics';

    // Clean label: remove parentheses, remove 'mockup' keyword, and format slashes as spaces
    const cleanLabel = item.label
      .replace(/\(.*?\)/g, '')
      .replace(/（.*?）/g, '')
      .replace(/mockup/gi, '')
      .replace(/[\/、]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (isAesthetic) {
      // Direct Google search to retrieve design philosophy, historical context, and AI overview
      const aestheticQuery = encodeURIComponent(`${cleanLabel} 設計美學 概念 介紹`);
      window.open(`https://www.google.com/search?q=${aestheticQuery}`, '_blank', 'noopener,noreferrer');
    } else {
      // Direct, highly relevant image search query without restrictive "mockup" keyword
      const imageQuery = encodeURIComponent(cleanLabel);
      window.open(`https://www.google.com/search?tbm=isch&q=${imageQuery}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Flattened all prompt items for quick lookup
  const allDatabaseItems: PromptItem[] = useMemo(() => {
    return Object.values(promptDatabase).flatMap(cat => cat.items);
  }, []);

  const itemMap = useMemo(() => {
    const map = new Map<string, PromptItem>();
    allDatabaseItems.forEach(item => map.set(item.id, item));
    return map;
  }, [allDatabaseItems]);

  // Positive & Negative Selected Items
  const { positivePrompts, negativePrompts } = useMemo(() => {
    const positives: PromptItem[] = [];
    const negatives: PromptItem[] = [];

    selectedPromptIds.forEach(id => {
      const item = itemMap.get(id);
      if (item) {
        if (item.isNegative || item.categoryId === 'negativePurity' || item.id.startsWith('np_')) {
          negatives.push(item);
        } else {
          positives.push(item);
        }
      }
    });

    return { positivePrompts: positives, negativePrompts: negatives };
  }, [selectedPromptIds, itemMap]);

  // Final Prompt Generation
  const finalPrompt = useMemo(() => {
    const chunks: string[] = [];

    // 1. Subject Text (Top priority)
    if (subjectText.trim()) {
      chunks.push(subjectText.trim());
    }

    // 2. Real-World Physical Dimensions (Lock proportions and avoid distortion)
    if (customWidth.trim() || customHeight.trim()) {
      const dimParts: string[] = [];
      if (customWidth.trim()) dimParts.push(`${customWidth.trim()}${customDimensionUnit} width`);
      if (customHeight.trim()) dimParts.push(`${customHeight.trim()}${customDimensionUnit} length/height`);
      if (customDepth.trim()) dimParts.push(`${customDepth.trim()}${customDimensionUnit} depth/thickness`);
      chunks.push(`exact real-world product dimensions: ${dimParts.join(' x ')}, accurate physical scale ratio, true-to-scale commercial proportions, zero perspective distortion or stretching`);
    }

    // 3. Selected Positive Prompts
    positivePrompts.forEach(item => {
      if (item.prompt.trim()) chunks.push(item.prompt.trim());
    });

    // 4. Noise / Grain Prompt
    const noiseOption = noiseOptions.find(n => n.id === noiseLevel);
    if (noiseOption && noiseOption.prompt) {
      chunks.push(noiseOption.prompt);
    }

    // 5. Color Palette Injection
    if (enableColorPalette && customHexColors.length > 0) {
      const colorList = customHexColors.join(', ');
      if (colorGradingIntensity === 'dominant') {
        chunks.push(`strict commercial color palette with dominant tones ${colorList}`);
      } else if (colorGradingIntensity === 'atmospheric') {
        chunks.push(`ambient cinematic color wash tuned to hex values ${colorList}`);
      } else {
        chunks.push(`refined minimal color accents using precise brand palette ${colorList}`);
      }
    }

    // 6. Composition Reference Guidance (Universal / Midjourney)
    if (enableCompositionRef && compositionImageUrl.trim()) {
      const strengthText = compositionStrength === 'strict' ? 'precise alignment' : compositionStrength === 'medium' ? 'balanced framing' : 'subtle inspiration';
      if (compositionGuidanceType === 'grid_perspective') {
        chunks.push(`align with perspective grid from composition reference [${compositionImageUrl.trim()}] with ${strengthText}`);
      } else if (compositionGuidanceType === 'silhouettes_framing') {
        chunks.push(`replicate silhouette negative spaces and bounding boxes from reference [${compositionImageUrl.trim()}]`);
      } else {
        chunks.push(`structured spatial mockup layout guided by reference [${compositionImageUrl.trim()}]`);
      }
    }

    // 6. Engine Specific Formatting
    if (activeEngine === 'midjourney') {
      let promptStr = chunks.join(', ');

      // Midjourney Version parameter
      const versionObj = midjourneyVersions.find(v => v.id === selectedMJVersion);
      if (versionObj) {
        promptStr += ` ${versionObj.param}`;
      }

      // Aspect Ratio parameter
      if (aspectRatio) {
        promptStr += ` --ar ${aspectRatio}`;
      }

      // Stylize parameter
      if (stylizeValue && stylizeValue !== '100') {
        promptStr += ` --s ${stylizeValue}`;
      }

      // Chaos parameter
      if (chaosValue && chaosValue !== '0') {
        promptStr += ` --c ${chaosValue}`;
      }

      // Negatives collection for Midjourney --no
      const allNegatives: string[] = [];
      negativePrompts.forEach(item => {
        allNegatives.push(item.prompt);
      });

      if (mockupPureMode) {
        allNegatives.push('text, letters, fonts, words, logos, watermarks, fingers, hands, person, blurry details, warped angles');
      }

      if (noiseOption && noiseOption.negativePrompt) {
        allNegatives.push(noiseOption.negativePrompt);
      }

      if (customNegative.trim()) {
        allNegatives.push(customNegative.trim());
      }

      if (allNegatives.length > 0) {
        // Clean and deduplicate words
        const mergedNegatives = allNegatives.join(', ');
        const cleanedWords = Array.from(new Set(
          mergedNegatives.split(',').map(w => w.trim()).filter(Boolean)
        )).join(', ');

        if (cleanedWords) {
          promptStr += ` --no ${cleanedWords}`;
        }
      }

      return promptStr.trim();
    } else {
      // Universal AI Format (DALL-E / Flux / Stable Diffusion / Recraft)
      let promptStr = chunks.join(', ');

      const allNegatives: string[] = [];
      negativePrompts.forEach(item => allNegatives.push(item.prompt));
      if (mockupPureMode) {
        allNegatives.push('text, letters, words, logos, brand names, hands, people, distorted lines');
      }
      if (customNegative.trim()) {
        allNegatives.push(customNegative.trim());
      }

      if (allNegatives.length > 0) {
        promptStr += ` | Negative prompt: ${allNegatives.join(', ')}`;
      }

      if (aspectRatio) {
        promptStr += ` [Aspect Ratio: ${aspectRatio}]`;
      }

      return promptStr.trim();
    }
  }, [
    subjectText,
    customWidth,
    customHeight,
    customDepth,
    customDimensionUnit,
    positivePrompts,
    negativePrompts,
    noiseLevel,
    enableColorPalette,
    customHexColors,
    colorGradingIntensity,
    enableCompositionRef,
    compositionImageUrl,
    compositionStrength,
    compositionGuidanceType,
    activeEngine,
    selectedMJVersion,
    aspectRatio,
    stylizeValue,
    chaosValue,
    mockupPureMode,
    customNegative
  ]);

  // Copy Prompt to Clipboard
  const handleCopyPrompt = () => {
    if (!finalPrompt) return;
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Search Results Mode
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allDatabaseItems.filter(item => 
      item.label.toLowerCase().includes(q) || 
      item.prompt.toLowerCase().includes(q)
    );
  }, [searchQuery, allDatabaseItems]);

  const currentCategoryData = promptDatabase[selectedCategory];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans bg-studio-grid-light selection:bg-sky-600 selection:text-white">
      {/* Top Studio Header Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
        {/* Brand & Studio Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20 shrink-0">
            <Box className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-2">
                <span>提示詞窮救星MOCKUP</span>
                <span className="text-xs font-mono font-bold text-slate-400 hidden md:inline">
                  MOCKUP Prompt Helper
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                  平面設計師專用
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              專為平面設計師打造，快速解決提示詞窮窘境，生成精準商業 Mockup、包裝印刷與周邊載體提示詞
            </p>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜尋台灣招牌、手搖杯、iPhone、三視圖、等角透視、磨砂玻璃..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Top Actions: Random Inspiration, User Guide & Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsUserGuideOpen(true)}
            className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            title="新手使用說明書與技巧指南"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">使用說明書</span>
          </button>

          <button
            type="button"
            onClick={handleRandomMockup}
            className="px-3.5 py-2 bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 hover:border-sky-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs group"
            title="隨機套用商業設計經典組合"
          >
            <Zap className="w-3.5 h-3.5 text-sky-600 group-hover:text-white" />
            <span className="hidden sm:inline">隨機商業靈感</span>
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            className="p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="重設全部設定與清空標籤"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">清空重設</span>
          </button>
        </div>
      </header>

      {/* Mobile Step Category Nav Bar */}
      <MobileCategoryNav 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleSelectCategory} 
        selectedPromptIds={selectedPromptIds} 
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Step-by-Step Category Navigation (Desktop) */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-2 sticky top-24">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center justify-between border-b border-slate-100">
              <span>由上到下步驟導覽</span>
              <span className="text-sky-600 font-semibold">{Object.keys(promptDatabase).length} 步驟</span>
            </div>

            {(Object.keys(promptDatabase) as CategoryKey[]).map((key) => {
              const cat = promptDatabase[key];
              const isSelected = selectedCategory === key;
              const IconComponent = sidebarIconMap[cat.icon] || Package;
              const selectedInCat = cat.items.filter(item => selectedPromptIds.has(item.id)).length;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectCategory(key)}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20 font-bold'
                      : 'bg-slate-50/70 hover:bg-slate-100/90 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-sky-600 border border-slate-200 shadow-2xs'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {cat.stepNumber}
                        </span>
                        <div className="text-xs font-bold leading-tight truncate">
                          {cat.name}
                        </div>
                      </div>
                      <div className={`text-[10px] font-mono font-normal truncate mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {cat.englishName}
                      </div>
                    </div>
                  </div>

                  {selectedInCat > 0 && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ${
                      isSelected ? 'bg-white text-sky-700' : 'bg-sky-600 text-white'
                    }`}>
                      {selectedInCat}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right Column: Main Work Area */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* Top Parameter & Subject Control Panel (Top of the workflow) */}
          <ParameterPanel
            activeEngine={activeEngine}
            setActiveEngine={setActiveEngine}
            selectedMJVersion={selectedMJVersion}
            setSelectedMJVersion={setSelectedMJVersion}
            subjectText={subjectText}
            setSubjectText={setSubjectText}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            stylizeValue={stylizeValue}
            setStylizeValue={setStylizeValue}
            chaosValue={chaosValue}
            setChaosValue={setChaosValue}
            imageWeight={imageWeight}
            setImageWeight={setImageWeight}
            customNegative={customNegative}
            setCustomNegative={setCustomNegative}
            mockupPureMode={mockupPureMode}
            setMockupPureMode={setMockupPureMode}
            enableCompositionRef={enableCompositionRef}
            setEnableCompositionRef={setEnableCompositionRef}
            compositionImageUrl={compositionImageUrl}
            setCompositionImageUrl={setCompositionImageUrl}
            compositionStrength={compositionStrength}
            setCompositionStrength={setCompositionStrength}
            compositionGuidanceType={compositionGuidanceType}
            setCompositionGuidanceType={setCompositionGuidanceType}
            enableColorPalette={enableColorPalette}
            setEnableColorPalette={setEnableColorPalette}
            customHexColors={customHexColors}
            setCustomHexColors={setCustomHexColors}
            colorGradingIntensity={colorGradingIntensity}
            setColorGradingIntensity={setColorGradingIntensity}
            noiseLevel={noiseLevel}
            setNoiseLevel={setNoiseLevel}
            onApplyTemplate={handleApplyTemplate}
            customWidth={customWidth}
            setCustomWidth={setCustomWidth}
            customHeight={customHeight}
            setCustomHeight={setCustomHeight}
            customDepth={customDepth}
            setCustomDepth={setCustomDepth}
            customDimensionUnit={customDimensionUnit}
            setCustomDimensionUnit={setCustomDimensionUnit}
          />

          {/* Active Category Display & Items Grid */}
          <div className="space-y-4">
            {/* Header of Active Category */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                    {currentCategoryData.stepTitle}
                  </span>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    {currentCategoryData.name}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {currentCategoryData.description}
                </p>
              </div>

              {/* Subcategory Filter Tabs & Fold/Unfold All */}
              <div className="flex items-center gap-2 flex-wrap">
                {currentCategoryData.subCategories && currentCategoryData.subCategories.length > 1 && (
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto max-w-full">
                    <button
                      type="button"
                      onClick={() => setSubCategoryFilter('all')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer shrink-0 ${
                        subCategoryFilter === 'all'
                          ? 'bg-white text-sky-700 shadow-2xs border border-slate-200/80'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      全部子類 ({currentCategoryData.items.length})
                    </button>
                    {currentCategoryData.subCategories.map(sc => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setSubCategoryFilter(sc.id)}
                        className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer shrink-0 flex items-center gap-1 ${
                          subCategoryFilter === sc.id
                            ? 'bg-white text-sky-700 shadow-2xs border border-slate-200/80 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>{sc.name.split('(')[0].trim()}</span>
                      </button>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={toggleAllSubCategories}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition cursor-pointer border border-slate-200 shrink-0"
                >
                  全部展開/收合
                </button>
              </div>
            </div>

            {/* Secondary Dual Filter Bar: Scale (大小尺度) & Cost (價格成本) */}
            {selectedCategory === 'mockupProducts' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-extrabold text-slate-800 tracking-tight">雙維度精準篩選器 (尺度 × 成本價位)</span>
                  </div>
                  {(scaleFilter !== 'all' || costFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setScaleFilter('all');
                        setCostFilter('all');
                      }}
                      className="text-xs text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
                    >
                      重設次要篩選
                    </button>
                  )}
                </div>

                {/* 1. 大小尺度篩選器 (大型 100cm以上、中型、手持桌面、微型) */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-500 shrink-0 w-16">
                    大小尺度:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {scaleDefinitions.map((def) => {
                      const isActive = scaleFilter === def.id;
                      return (
                        <button
                          key={def.id}
                          type="button"
                          onClick={() => setScaleFilter(def.id)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                          title={`${def.desc} (${def.range})`}
                        >
                          <span>{def.label}</span>
                          {def.range !== 'All' && (
                            <span className={`text-[10px] font-mono font-normal opacity-80 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                              ({def.range})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 價格成本篩選器 (10元、100元、1000元、10000元) */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-500 shrink-0 w-16">
                    價格成本:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {costDefinitions.map((def) => {
                      const isActive = costFilter === def.id;
                      return (
                        <button
                          key={def.id}
                          type="button"
                          onClick={() => setCostFilter(def.id)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                          title={def.desc}
                        >
                          <span>{def.label}</span>
                          {def.tier !== 'All' && (
                            <span className={`text-[10px] font-mono font-normal opacity-80 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                              ({def.englishLabel})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Render Items by SubCategory Accordions */}
            {searchQuery.trim() ? (
              // Search Mode: show filtered list directly
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    搜尋結果 ({searchResults.length} 個標籤)：
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-sky-600 hover:underline"
                  >
                    清除搜尋
                  </button>
                </div>
                {searchResults.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs italic">
                    找不到符合「{searchQuery}」的標籤，請嘗試其他關鍵字。
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {searchResults.map(item => {
                      const isSelected = selectedPromptIds.has(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => togglePrompt(item.id)}
                          className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between min-h-[96px] ${
                            isSelected
                              ? 'bg-sky-50/90 text-sky-950 border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5 mb-1.5">
                            <div className="font-bold text-xs leading-snug">{item.label}</div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => handleOpenFullPrompt(e, item)}
                                className="p-1 hover:bg-sky-100/80 rounded-md text-slate-400 hover:text-sky-600 transition cursor-pointer"
                                title="檢視完整提示詞 / 概念解說 / 複製"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleGoogleSearch(e, item)}
                                className="p-1 hover:bg-sky-100/80 rounded-md text-slate-400 hover:text-sky-600 transition cursor-pointer"
                                title="在 Google 搜尋真實物品參考圖片"
                              >
                                <Globe className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-[10px] font-mono text-slate-500 line-clamp-2 mt-1 pt-1.5 border-t border-slate-100">
                            {item.prompt}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              // Normal Step Mode: Render SubCategories
              <div className="space-y-4">
                {(currentCategoryData.subCategories || []).map((sc) => {
                  if (subCategoryFilter !== 'all' && subCategoryFilter !== sc.id) {
                    return null;
                  }

                  const subCategoryItems = currentCategoryData.items.filter(
                    item => {
                      if (item.subCategory !== sc.id) return false;
                      if (scaleFilter !== 'all' && item.scale !== scaleFilter) return false;
                      if (costFilter !== 'all' && item.cost !== costFilter) return false;
                      return true;
                    }
                  );

                  if (subCategoryItems.length === 0) return null;

                  return (
                    <SubCategoryAccordion
                      key={sc.id}
                      subCategory={sc}
                      items={subCategoryItems}
                      selectedPromptIds={selectedPromptIds}
                      onTogglePrompt={togglePrompt}
                      isCollapsed={!!collapsedSubCategories[sc.id]}
                      onToggleCollapse={() => toggleSubCategoryCollapse(sc.id)}
                      onGoogleSearch={handleGoogleSearch}
                      onViewFullPrompt={handleOpenFullPrompt}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Floating Generated Prompt Bar (Desktop & Tablet) */}
          <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-900 flex items-center gap-1.5">
                  {activeEngine === 'midjourney' ? <Cpu className="w-4 h-4 text-sky-600" /> : <Globe className="w-4 h-4 text-indigo-600" />}
                  <span>{activeEngine === 'midjourney' ? `Midjourney Prompt (${selectedMJVersion.toUpperCase()})` : 'Universal AI Prompt'}</span>
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  {positivePrompts.length} 正向 / {negativePrompts.length} 排除
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  清空標籤
                </button>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  disabled={!finalPrompt}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-600/20 disabled:opacity-40 transition cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '已複製到剪貼簿' : '一鍵複製 PROMPT'}</span>
                </button>
              </div>
            </div>

            {/* Prompt Output Box */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed max-h-28 overflow-y-auto select-all break-words whitespace-pre-wrap">
              {finalPrompt || (
                <span className="text-slate-400 italic">
                  尚未選取任何提示詞或輸入主體。請在上方選擇台灣日常載體、3C、材質、燈光或視角以組裝提示詞。
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Corner Help & Manual Button (Desktop & Tablet) */}
      <div className="hidden sm:block fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsUserGuideOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-2xl shadow-xl hover:shadow-2xl border border-slate-700/80 backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105"
          title="開啟新手指南與使用說明書"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
              <span>使用說明書</span>
              <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 py-0.2 rounded font-mono">Guide</span>
            </div>
            <div className="text-[9px] text-slate-400 font-mono">
              6步驟工作流與尺寸指南
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Floating Action Button (FAB) for Prompt */}
      <div className="md:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsUserGuideOpen(true)}
          className="p-3 bg-amber-500 text-slate-950 font-bold rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center border border-white/20 active:scale-95 transition"
          title="使用說明書"
        >
          <BookOpen className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsMobileModalOpen(true)}
          className="px-4 py-3 bg-sky-600 text-white font-bold rounded-full shadow-lg shadow-sky-600/30 flex items-center gap-2 border border-white/20 active:scale-95 transition"
        >
          <Copy className="w-4 h-4" />
          <span>查看 Prompt ({selectedPromptIds.size})</span>
        </button>
      </div>

      {/* Mobile Modal */}
      <MobilePromptModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        finalPrompt={finalPrompt}
        activeEngine={activeEngine}
        selectedMJVersion={selectedMJVersion}
        positiveCount={positivePrompts.length}
        negativeCount={negativePrompts.length}
        onCopy={handleCopyPrompt}
        copied={copied}
        onClearAll={handleClearAll}
      />

      {/* Full Prompt Inspector Modal */}
      <FullPromptModal
        item={fullPromptItem}
        isOpen={!!fullPromptItem}
        onClose={() => setFullPromptItem(null)}
        isSelected={fullPromptItem ? selectedPromptIds.has(fullPromptItem.id) : false}
        onToggleSelect={togglePrompt}
        onGoogleSearch={(item) => handleGoogleSearch({ stopPropagation: () => {} } as any, item)}
      />

      {/* User Guide & Manual Modal */}
      <UserGuideModal
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
      />
    </div>
  );
}
