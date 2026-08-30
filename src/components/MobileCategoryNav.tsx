import React from 'react';
import { 
  Package, 
  Camera, 
  Compass, 
  Shapes, 
  Brush, 
  ShieldAlert,
  Store,
  Layers,
  Sparkles
} from 'lucide-react';
import { CategoryKey, promptDatabase } from '../data/promptDatabase';

const iconMap: Record<string, React.ElementType> = {
  Package,
  Camera,
  Compass,
  Shapes,
  Brush,
  ShieldAlert,
  Store,
  Layers,
  Sparkles,
};

interface MobileCategoryNavProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (key: CategoryKey) => void;
  selectedPromptIds: Set<string>;
}

export const MobileCategoryNav: React.FC<MobileCategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedPromptIds,
}) => {
  return (
    <div className="md:hidden bg-white border-b border-slate-200 px-3 py-2 sticky top-14 z-20 overflow-x-auto scrollbar-none flex items-center gap-2 shadow-xs">
      {(Object.keys(promptDatabase) as CategoryKey[]).map((key) => {
        const cat = promptDatabase[key];
        const isActive = selectedCategory === key;
        const IconComponent = iconMap[cat.icon] || Package;
        const activeCount = cat.items.filter(item => selectedPromptIds.has(item.id)).length;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelectCategory(key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border ${
              isActive
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="text-[10px] font-mono opacity-80">{cat.stepNumber}.</span>
            <IconComponent className="w-3.5 h-3.5" />
            <span>{cat.name.split('與')[0].slice(0, 6)}</span>
            {activeCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-white text-sky-700' : 'bg-sky-600 text-white'
              }`}>
                {activeCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
