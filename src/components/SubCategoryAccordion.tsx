import React from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Sparkles, 
  Store, 
  Smartphone, 
  Box, 
  Coffee, 
  FileText, 
  Shirt, 
  Layers, 
  Camera, 
  Maximize2, 
  Cpu, 
  Sun, 
  Compass, 
  ShieldAlert,
  Info,
  Tag,
  Globe,
  Ruler
} from 'lucide-react';
import { PromptItem, SubCategory, subCategoryColorMap, ProductScale } from '../data/promptDatabase';
import { AngleDiagram } from './AngleDiagram';

const subCategoryIconMap: Record<string, React.ElementType> = {
  Store,
  Smartphone,
  Box,
  Coffee,
  Sparkles,
  FileText,
  Shirt,
  Layers,
  Camera,
  Maximize2,
  Cpu,
  Sun,
  Compass,
  ShieldAlert,
  Tag
};

const scaleBadgeMap: Record<'micro' | 'handheld' | 'medium' | 'large', { label: string; range: string; icon: string; style: string }> = {
  micro: {
    label: '微型',
    range: '<10cm',
    icon: '🏷️',
    style: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  handheld: {
    label: '手持桌面',
    range: '10~30cm',
    icon: '☕',
    style: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  medium: {
    label: '中型',
    range: '30~100cm',
    icon: '👕',
    style: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  large: {
    label: '大型',
    range: '>100cm',
    icon: '🪧',
    style: 'bg-amber-50 text-amber-800 border-amber-200'
  }
};

const costBadgeMap: Record<'cost_10' | 'cost_100' | 'cost_1000' | 'cost_10000', { label: string; icon: string; style: string }> = {
  cost_10: {
    label: '10元',
    icon: '🪙',
    style: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  cost_100: {
    label: '100元',
    icon: '💵',
    style: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  cost_1000: {
    label: '1000元',
    icon: '💎',
    style: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  cost_10000: {
    label: '10000元',
    icon: '👑',
    style: 'bg-amber-50 text-amber-900 border-amber-300'
  }
};

interface SubCategoryAccordionProps {
  subCategory: SubCategory;
  items: PromptItem[];
  selectedPromptIds: Set<string>;
  onTogglePrompt: (id: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onGoogleSearch: (e: React.MouseEvent, item: PromptItem) => void;
  onViewFullPrompt?: (e: React.MouseEvent, item: PromptItem) => void;
}

export const SubCategoryAccordion: React.FC<SubCategoryAccordionProps> = ({
  subCategory,
  items,
  selectedPromptIds,
  onTogglePrompt,
  isCollapsed,
  onToggleCollapse,
  onGoogleSearch,
  onViewFullPrompt,
}) => {
  const selectedCount = items.filter(item => selectedPromptIds.has(item.id)).length;
  const SubIcon = (subCategory.icon && subCategoryIconMap[subCategory.icon]) ? subCategoryIconMap[subCategory.icon] : Layers;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      {/* Header Bar - Clickable to fold/unfold */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="w-full px-5 py-4 bg-slate-50/70 hover:bg-slate-100/80 border-b border-slate-200/80 flex items-center justify-between gap-3 text-left transition cursor-pointer select-none"
      >
        <div className="flex items-center gap-3 flex-wrap min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs shrink-0">
            <SubIcon className="w-4 h-4 text-sky-600" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-slate-900 tracking-tight">
                {subCategory.name}
              </span>
              
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                {items.length} 標籤
              </span>

              {selectedCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-600 text-white flex items-center gap-1 shrink-0 shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                  {selectedCount} 已選取
                </span>
              )}
            </div>
            
            <p className="text-xs font-mono text-slate-500 font-normal truncate mt-0.5">
              {subCategory.englishName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
            {isCollapsed ? '展開細看' : '收合分類'}
          </span>
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition shadow-xs">
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Subcategory Description */}
      {subCategory.desc && (
        <div className="px-5 py-2.5 bg-slate-50/40 border-b border-slate-100 text-[11px] text-slate-600 flex items-center gap-2 font-sans">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span className="truncate">{subCategory.desc}</span>
        </div>
      )}

      {/* Body: Items Grid (Collapsible) */}
      {!isCollapsed ? (
        <div className="p-4 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {items.map((item) => {
              const isSelected = selectedPromptIds.has(item.id);
              const isNegative = item.isNegative;
              const scaleMeta = item.scale ? scaleBadgeMap[item.scale] : null;
              const costMeta = item.cost ? costBadgeMap[item.cost] : null;
              const hasAngleVisual = item.id.startsWith('pc_');
              const isAesthetic = !!item.aestheticConcept;

              return (
                <div
                  key={item.id}
                  onClick={() => onTogglePrompt(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onTogglePrompt(item.id);
                    }
                  }}
                  className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all relative cursor-pointer select-none group min-h-[110px] justify-between ${
                    isSelected
                      ? isNegative
                        ? 'bg-rose-50 text-rose-950 border-rose-400 ring-2 ring-rose-400/30 shadow-sm'
                        : 'bg-sky-50/90 text-sky-950 border-sky-500 ring-2 ring-sky-500/20 shadow-sm'
                      : 'bg-white hover:bg-slate-50 hover:border-slate-300 border-slate-200/90 text-slate-800'
                  }`}
                >
                  <div className="w-full">
                    {/* Scale & Cost Tags & Controls line inside card */}
                    <div className="flex items-center justify-between gap-1.5 mb-2">
                      <div className="flex items-center gap-1 flex-wrap">
                        {scaleMeta && (
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${scaleMeta.style}`}>
                            <span>{scaleMeta.icon}</span>
                            <span>{scaleMeta.label}</span>
                          </span>
                        )}
                        {costMeta && (
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${costMeta.style}`}>
                            <span>{costMeta.icon}</span>
                            <span>{costMeta.label}</span>
                          </span>
                        )}
                        {isAesthetic && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border bg-indigo-50 text-indigo-700 border-indigo-200">
                            美學派系
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {/* View Full Prompt (Changed to Info 'i' icon) */}
                        {onViewFullPrompt && (
                          <button
                            type="button"
                            onClick={(e) => onViewFullPrompt(e, item)}
                            className="p-1 hover:bg-sky-100/80 rounded-md text-slate-400 hover:text-sky-600 transition cursor-pointer"
                            title="檢視完整提示詞 / 概念解說 / 複製"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Google Search (Changed to Globe '地球' icon) */}
                        <button
                          type="button"
                          onClick={(e) => onGoogleSearch(e, item)}
                          className={`p-1 rounded-md transition cursor-pointer ${
                            isAesthetic 
                              ? 'text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700' 
                              : 'text-slate-400 hover:bg-sky-100/80 hover:text-sky-600'
                          }`}
                          title={isAesthetic ? "在 Google 搜尋該美學概念" : "在 Google 搜尋網路真實物品參考圖片"}
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </button>

                        {/* Selected Check indicator */}
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition ${
                          isSelected 
                            ? isNegative 
                              ? 'bg-rose-600 border-rose-600 text-white' 
                              : 'bg-sky-600 border-sky-600 text-white'
                            : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>

                    {/* Title label */}
                    <div className="font-bold text-xs leading-snug line-clamp-2 text-slate-900">
                      {item.label}
                    </div>
                  </div>

                  {/* Prompt preview snippet */}
                  <div className="w-full mt-2 pt-2 border-t border-slate-100">
                    <p className={`text-[10px] font-mono leading-relaxed line-clamp-2 ${
                      isSelected 
                        ? isNegative ? 'text-rose-800' : 'text-sky-800 font-medium' 
                        : 'text-slate-500'
                    }`}>
                      {item.prompt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
