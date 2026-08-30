import React from 'react';
import { X, Copy, Check, Trash2, Cpu, Globe } from 'lucide-react';
import { AIPlatform } from '../data/promptDatabase';

interface MobilePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalPrompt: string;
  activeEngine: AIPlatform;
  selectedMJVersion: string;
  positiveCount: number;
  negativeCount: number;
  onCopy: () => void;
  copied: boolean;
  onClearAll: () => void;
}

export const MobilePromptModal: React.FC<MobilePromptModalProps> = ({
  isOpen,
  onClose,
  finalPrompt,
  activeEngine,
  selectedMJVersion,
  positiveCount,
  negativeCount,
  onCopy,
  copied,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white text-slate-900 rounded-t-3xl border-t border-slate-200 max-h-[85vh] flex flex-col p-5 shadow-2xl animate-in slide-in-from-bottom duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-900 flex items-center gap-1.5">
              {activeEngine === 'midjourney' ? <Cpu className="w-3.5 h-3.5 text-sky-600" /> : <Globe className="w-3.5 h-3.5 text-indigo-600" />}
              {activeEngine === 'midjourney' ? `MJ Prompt (${selectedMJVersion.toUpperCase()})` : 'Universal AI Prompt'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              ({positiveCount} + / {negativeCount} -)
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Content */}
        <div className="py-4 flex-1 overflow-y-auto">
          {finalPrompt ? (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs sm:text-sm leading-relaxed text-slate-800 select-all break-words whitespace-pre-wrap">
              {finalPrompt}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs italic">
              尚未選取提示詞標籤，請在上方點選標籤以生成 Prompt。
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
          <button
            onClick={onCopy}
            disabled={!finalPrompt}
            className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 disabled:opacity-40 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-white stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '已複製到剪貼簿' : '一鍵複製 PROMPT'}</span>
          </button>

          <button
            onClick={onClearAll}
            title="清空全部"
            className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
