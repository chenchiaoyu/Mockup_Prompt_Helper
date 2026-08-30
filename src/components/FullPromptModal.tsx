import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle,
  Globe,
  Ruler,
  Compass,
  Lightbulb,
  Camera
} from 'lucide-react';
import { PromptItem } from '../data/promptDatabase';
import { AngleDiagram } from './AngleDiagram';

interface FullPromptModalProps {
  item: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onGoogleSearch: (item: { label: string; prompt: string }) => void;
}

export const FullPromptModal: React.FC<FullPromptModalProps> = ({
  item,
  isOpen,
  onClose,
  isSelected,
  onToggleSelect,
  onGoogleSearch,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isAesthetic = !!item.aestheticConcept;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isAesthetic ? 'bg-indigo-100 text-indigo-700' : 'bg-sky-100 text-sky-700'
            }`}>
              {isAesthetic ? <Compass className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600">
                {isAesthetic ? '美學概念與提示詞檢視' : '完整提示詞檢視器'}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                {item.label}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
            title="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Large Optical Principle & Camera Angle Diagram if available */}
          {item.id.startsWith('pc_') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 text-sky-700">
                  <Camera className="w-4 h-4 text-sky-600" />
                  <span>光學原理與相機視角幾何概念解說</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Optical Principle Concept
                </span>
              </div>
              <div className="w-full rounded-2xl overflow-hidden shadow-md border border-slate-800">
                <AngleDiagram itemId={item.id} className="w-full h-36 sm:h-44" />
              </div>
            </div>
          )}

          {/* Aesthetic Concept / Philosophy Box if available */}
          {item.aestheticConcept && (
            <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-xl p-3.5 space-y-1.5 text-xs text-indigo-950">
              <div className="font-bold text-indigo-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>設計語彙與美學概念解析</span>
              </div>
              <p className="text-xs text-indigo-900/90 leading-relaxed">
                {item.aestheticConcept}
              </p>
            </div>
          )}

          {/* Real-World Dimension info if available */}
          {item.dimension && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-amber-950">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-amber-900">參考尺寸：</span>
                  <span className="font-mono font-bold text-slate-900 ml-1">{item.dimension}</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md font-mono shrink-0">
                鎖定比例防失真
              </span>
            </div>
          )}

          {/* Full Prompt String */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>英文完整提示詞 (Full Prompt String)：</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {item.prompt.length} 字元
              </span>
            </div>

            <div className="relative group">
              <div className="w-full bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm leading-relaxed select-all break-words border border-slate-800 shadow-inner">
                {item.prompt}
              </div>
            </div>
          </div>

          {/* Tips / Description */}
          <div className="bg-sky-50/60 rounded-xl p-3.5 border border-sky-100 text-xs text-sky-900/90 leading-relaxed flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sky-950">設計師提示：</span>
              此段英文提示詞已針對影像生成模型（Midjourney / SD / DALL-E 3 / Flux）優化，點擊下方按鈕可複製單條文字或在 Google 搜尋真實實物範例與參考圖。
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onGoogleSearch(item)}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title={isAesthetic ? "在 Google 搜尋深度解析該美學概念" : "在 Google 搜尋網路真實物品參考圖片"}
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{isAesthetic ? 'Google 美學解析' : 'Google 實物參考'}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          <div className="flex items-center gap-2 flex-wrap ml-auto">
            <button
              type="button"
              onClick={() => onToggleSelect(item.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer border shadow-2xs ${
                isSelected
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isSelected ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>從已選清單移除</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-3.5 h-3.5 text-sky-600" />
                  <span>加入已選組合</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>已複製完整提示詞！</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>複製單條提示詞</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
