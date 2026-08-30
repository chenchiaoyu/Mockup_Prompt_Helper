import React, { useState } from 'react';
import { 
  Sliders, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon, 
  Palette as PaletteIcon, 
  SlidersHorizontal,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  LayoutTemplate,
  CheckCircle2,
  Store,
  Box,
  Compass,
  Maximize2,
  Ruler,
  RotateCcw
} from 'lucide-react';
import { 
  AIPlatform, 
  midjourneyVersions, 
  presetPalettes, 
  mockupQuickTemplates,
  MockupTemplate,
  NoiseLevel,
  noiseOptions
} from '../data/promptDatabase';

interface ParameterPanelProps {
  activeEngine: AIPlatform;
  setActiveEngine: (engine: AIPlatform) => void;
  selectedMJVersion: string;
  setSelectedMJVersion: (version: string) => void;
  subjectText: string;
  setSubjectText: (text: string) => void;
  aspectRatio: string;
  setAspectRatio: (ar: string) => void;
  stylizeValue: string;
  setStylizeValue: (val: string) => void;
  chaosValue: string;
  setChaosValue: (val: string) => void;
  imageWeight: string;
  setImageWeight: (val: string) => void;
  customNegative: string;
  setCustomNegative: (text: string) => void;
  mockupPureMode: boolean;
  setMockupPureMode: (val: boolean) => void;
  enableCompositionRef: boolean;
  setEnableCompositionRef: (val: boolean) => void;
  compositionImageUrl: string;
  setCompositionImageUrl: (url: string) => void;
  compositionStrength: 'strict' | 'medium' | 'loose';
  setCompositionStrength: (val: 'strict' | 'medium' | 'loose') => void;
  compositionGuidanceType: 'structural_layout' | 'grid_perspective' | 'silhouettes_framing';
  setCompositionGuidanceType: (val: 'structural_layout' | 'grid_perspective' | 'silhouettes_framing') => void;
  enableColorPalette: boolean;
  setEnableColorPalette: (val: boolean) => void;
  customHexColors: string[];
  setCustomHexColors: React.Dispatch<React.SetStateAction<string[]>>;
  colorGradingIntensity: 'dominant' | 'accent' | 'atmospheric';
  setColorGradingIntensity: (val: 'dominant' | 'accent' | 'atmospheric') => void;
  noiseLevel: NoiseLevel;
  setNoiseLevel: (level: NoiseLevel) => void;
  onApplyTemplate: (template: MockupTemplate) => void;
  // Physical Dimensions
  customWidth: string;
  setCustomWidth: (val: string) => void;
  customHeight: string;
  setCustomHeight: (val: string) => void;
  customDepth: string;
  setCustomDepth: (val: string) => void;
  customDimensionUnit: string;
  setCustomDimensionUnit: (val: string) => void;
}

export const ParameterPanel: React.FC<ParameterPanelProps> = ({
  activeEngine,
  setActiveEngine,
  selectedMJVersion,
  setSelectedMJVersion,
  subjectText,
  setSubjectText,
  aspectRatio,
  setAspectRatio,
  stylizeValue,
  setStylizeValue,
  chaosValue,
  setChaosValue,
  imageWeight,
  setImageWeight,
  customNegative,
  setCustomNegative,
  mockupPureMode,
  setMockupPureMode,
  enableCompositionRef,
  setEnableCompositionRef,
  compositionImageUrl,
  setCompositionImageUrl,
  compositionStrength,
  setCompositionStrength,
  compositionGuidanceType,
  setCompositionGuidanceType,
  enableColorPalette,
  setEnableColorPalette,
  customHexColors,
  setCustomHexColors,
  colorGradingIntensity,
  setColorGradingIntensity,
  noiseLevel,
  setNoiseLevel,
  onApplyTemplate,
  customWidth,
  setCustomWidth,
  customHeight,
  setCustomHeight,
  customDepth,
  setCustomDepth,
  customDimensionUnit,
  setCustomDimensionUnit
}) => {
  const [showVersionTable, setShowVersionTable] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [newColorInput, setNewColorInput] = useState('#0284C7');
  const [isCollapsedOnMobile, setIsCollapsedOnMobile] = useState(true);

  const currentNoiseObj = noiseOptions.find(n => n.id === noiseLevel) || noiseOptions[0];

  const handleAddHexColor = (colorHex: string) => {
    const formatted = colorHex.trim().startsWith('#') ? colorHex.trim() : `#${colorHex.trim()}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(formatted) || /^#[0-9A-Fa-f]{3}$/.test(formatted)) {
      if (!customHexColors.includes(formatted.toUpperCase()) && customHexColors.length < 8) {
        setCustomHexColors(prev => [...prev, formatted.toUpperCase()]);
      }
    }
  };

  const handleRemoveHexColor = (index: number) => {
    setCustomHexColors(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearDimensions = () => {
    setCustomWidth('');
    setCustomHeight('');
    setCustomDepth('');
  };

  const hasCustomDimensions = customWidth.trim() !== '' || customHeight.trim() !== '';

  return (
    <div className="space-y-4">
      {/* Mobile Toggle Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-slate-800">商業設計主體、尺寸與參數</span>
          {(subjectText || hasCustomDimensions) && (
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsedOnMobile(!isCollapsedOnMobile)}
          className="text-xs font-bold text-sky-600 flex items-center gap-1 cursor-pointer"
        >
          <span>{isCollapsedOnMobile ? '展開設定' : '收合設定'}</span>
          {isCollapsedOnMobile ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className={`${isCollapsedOnMobile ? 'hidden md:block' : 'block'} space-y-4`}>
        {/* Quick Mockup Studio Templates Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                <LayoutTemplate className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>商業 Mockup 快速套用範本</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-100 text-sky-700 font-semibold">
                    台灣日常 • 3C • 包裝 • 三視圖
                  </span>
                </h2>
                <p className="text-[11px] text-slate-500">一鍵帶入台灣街頭招牌、手搖杯小吃、iPhone 16 旗艦、工業三視圖等經典組合</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition cursor-pointer border border-slate-200"
            >
              <span>{showTemplates ? '隱藏範本' : '查看經典範本'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Collapsible Templates List */}
          {showTemplates && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in">
              {mockupQuickTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => onApplyTemplate(tpl)}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 text-left transition cursor-pointer group flex flex-col justify-between space-y-2 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-sky-700 transition">
                        {tpl.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {tpl.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-200/60">
                    <span>{tpl.selectedIds.length} 個預設標籤</span>
                    <span className="text-sky-600 font-bold group-hover:translate-x-0.5 transition-transform">
                      立即套用 →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Primary Subject Module (Top of the workflow) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-sky-100"></div>
              <span className="font-bold text-sm text-slate-900 tracking-tight">
                主體描述 (Subject Description)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                由上到下工作流第一步
              </span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={subjectText}
              onChange={(e) => setSubjectText(e.target.value)}
              placeholder="例如：blank Japanese Oden banner flag on wooden stand, or iPhone 16 Pro mockup on marble podium..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition font-sans"
            />
            {subjectText && (
              <button
                type="button"
                onClick={() => setSubjectText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Engine Selector & Version Control */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* AI Platform Engine */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-600" />
                <span>生成引擎與目標平台</span>
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveEngine('midjourney')}
                  className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeEngine === 'midjourney'
                      ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Midjourney</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-sky-100 text-sky-800">
                    {selectedMJVersion.toUpperCase()}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveEngine('universal')}
                  className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeEngine === 'universal'
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Universal</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-indigo-100 text-indigo-800">
                    DALL-E/Flux
                  </span>
                </button>
              </div>
            </div>

            {/* Midjourney Version Dropdown (if MJ selected) */}
            {activeEngine === 'midjourney' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Midjourney 模型版本調校
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowVersionTable(!showVersionTable)}
                    className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 cursor-pointer"
                  >
                    {showVersionTable ? '收合版本特點' : '查看各版差異'}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {midjourneyVersions.map((ver) => (
                    <button
                      key={ver.id}
                      type="button"
                      onClick={() => setSelectedMJVersion(ver.id)}
                      className={`py-2 px-1 text-xs font-mono font-bold rounded-xl transition cursor-pointer border text-center ${
                        selectedMJVersion === ver.id
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {ver.shortName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Collapsible Version Differences Table */}
          {showVersionTable && activeEngine === 'midjourney' && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5 animate-in fade-in text-xs">
              {midjourneyVersions.map((ver) => (
                <div 
                  key={ver.id} 
                  className={`p-2.5 rounded-lg border transition ${
                    selectedMJVersion === ver.id ? 'bg-white border-sky-400 shadow-2xs' : 'bg-transparent border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono font-bold">
                    <span className="text-slate-900">{ver.name} ({ver.param})</span>
                    <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {ver.suitableFor}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{ver.strength}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Physical Dimensions Module (Length x Width x Height) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs shrink-0">
                <Ruler className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                  <span>載體參考尺寸 (選擇性填寫 / 鎖定比例防形變)</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  指定參考比例（寬度 W × 高度 H × 厚度/深度 D），AI 生成時將遵循設定尺寸，杜絕拉伸變形
                </p>
              </div>
            </div>

            {hasCustomDimensions && (
              <button
                type="button"
                onClick={handleClearDimensions}
                className="px-2.5 py-1 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>清除尺寸</span>
              </button>
            )}
          </div>

          {/* Dimension Input Fields Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
            {/* Width */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <span>寬度 (Width)</span>
                <span className="text-[10px] text-slate-400 font-mono">W</span>
              </label>
              <input
                type="text"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                placeholder="例如: 21"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Height / Length */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <span>長度 / 高度 (Height)</span>
                <span className="text-[10px] text-slate-400 font-mono">H / L</span>
              </label>
              <input
                type="text"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                placeholder="例如: 29.7"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Depth / Thickness */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <span>厚度 / 深度 (Depth - 可選)</span>
                <span className="text-[10px] text-slate-400 font-mono">D</span>
              </label>
              <input
                type="text"
                value={customDepth}
                onChange={(e) => setCustomDepth(e.target.value)}
                placeholder="例如: 1.5"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Unit */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">度量單位 (Unit)</label>
              <select
                value={customDimensionUnit}
                onChange={(e) => setCustomDimensionUnit(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="cm">公分 (cm)</option>
                <option value="mm">毫米 (mm)</option>
                <option value="m">公尺 (m)</option>
                <option value="inch">英吋 (inch)</option>
              </select>
            </div>
          </div>

          {/* Live Dimension Status Badge */}
          {hasCustomDimensions && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-900 font-mono">
              <span className="font-bold">🔒 已鎖定參考尺寸：</span>
              <span>
                {[
                  customWidth ? `${customWidth}${customDimensionUnit} (寬)` : '',
                  customHeight ? `${customHeight}${customDimensionUnit} (長/高)` : '',
                  customDepth ? `${customDepth}${customDimensionUnit} (厚/深)` : ''
                ].filter(Boolean).join(' × ')}
              </span>
              <span className="ml-auto text-[10px] font-sans font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                防變形指令已就緒
              </span>
            </div>
          )}
        </div>

        {/* Technical Parameters & Multi-Modality Panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-600" />
              <span>商業設計渲染參數與畫幅設定</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Aspect Ratio • Stylize • Noise
            </span>
          </div>

          {/* Aspect Ratio Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>畫布比例 (Aspect Ratio --ar)</span>
              <span className="font-mono text-sky-600">{aspectRatio}</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: '16:9 寬螢幕', value: '16:9' },
                { label: '1:1 正方形', value: '1:1' },
                { label: '4:3 商業型錄', value: '4:3' },
                { label: '3:4 直式海報', value: '3:4' },
                { label: '9:16 行動裝置', value: '9:16' },
                { label: '21:9 劇院超寬', value: '21:9' }
              ].map((ar) => (
                <button
                  key={ar.value}
                  type="button"
                  onClick={() => setAspectRatio(ar.value)}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl border transition cursor-pointer text-center ${
                    aspectRatio === ar.value
                      ? 'bg-sky-50 text-sky-700 border-sky-500 font-bold shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-mono text-xs">{ar.value}</div>
                  <div className="text-[10px] text-slate-500 truncate">{ar.label.split(' ')[1]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stylize & Chaos Sliders (for Midjourney) */}
          {activeEngine === 'midjourney' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stylize (--s) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">風格化強度 (--s)</span>
                  <span className="font-mono font-bold text-sky-600">{stylizeValue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={stylizeValue}
                  onChange={(e) => setStylizeValue(e.target.value)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0 (精確忠實)</span>
                  <span>150 (商業推薦)</span>
                  <span>1000 (極度藝術)</span>
                </div>
              </div>

              {/* Chaos (--c) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">隨機變化性 (--c)</span>
                  <span className="font-mono font-bold text-sky-600">{chaosValue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={chaosValue}
                  onChange={(e) => setChaosValue(e.target.value)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0 (最穩定)</span>
                  <span>15 (微變化)</span>
                  <span>100 (天馬行空)</span>
                </div>
              </div>
            </div>
          )}

          {/* Noise & Grain Controller */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>噪點與物理觸感控制器 (Noise & Material Tactility)</span>
              </label>
              <span className="text-[11px] font-mono text-sky-600 font-bold">
                {currentNoiseObj.shortLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {noiseOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setNoiseLevel(opt.id)}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    noiseLevel === opt.id
                      ? 'bg-sky-50 text-sky-900 border-sky-500 font-bold shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{opt.shortLabel}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-1">{opt.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette Manager */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableColorPalette"
                  checked={enableColorPalette}
                  onChange={(e) => setEnableColorPalette(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                />
                <label htmlFor="enableColorPalette" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
                  <PaletteIcon className="w-3.5 h-3.5 text-sky-600" />
                  <span>指定商業色彩計畫 (Commercial Hex Palette Injection)</span>
                </label>
              </div>

              {enableColorPalette && (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[11px] text-slate-500">權重：</span>
                  {(['dominant', 'accent', 'atmospheric'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setColorGradingIntensity(mode)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition cursor-pointer ${
                        colorGradingIntensity === mode
                          ? 'bg-sky-600 text-white border-sky-600 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {mode === 'dominant' ? '主色調' : mode === 'accent' ? '點綴色' : '環境氛圍'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {enableColorPalette && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3 animate-in fade-in">
                {/* Preset Palettes */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600">精選商業品牌配色：</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {presetPalettes.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setCustomHexColors(p.colors)}
                        className="p-2 rounded-lg bg-white border border-slate-200 hover:border-sky-400 text-left transition cursor-pointer flex flex-col gap-1.5 shadow-2xs"
                      >
                        <span className="text-[11px] font-bold text-slate-800 truncate">{p.name.split(' ')[0]}</span>
                        <div className="flex h-3 w-full rounded-md overflow-hidden ring-1 ring-slate-200">
                          {p.colors.map((c, i) => (
                            <div key={i} style={{ backgroundColor: c }} className="flex-1" />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Hex Swatches & Add/Remove */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-600">當前套用色票 ({customHexColors.length}/8)：</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {customHexColors.map((hex, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs text-xs font-mono font-bold"
                      >
                        <span className="w-3.5 h-3.5 rounded-full ring-1 ring-slate-300" style={{ backgroundColor: hex }} />
                        <span>{hex}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHexColor(idx)}
                          className="text-slate-400 hover:text-rose-500 ml-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Add Custom Color Input */}
                    <div className="flex items-center gap-1">
                      <input
                        type="color"
                        value={newColorInput}
                        onChange={(e) => setNewColorInput(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0 bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddHexColor(newColorInput)}
                        className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>加入色票</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Composition Reference Controller */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableCompositionRef"
                  checked={enableCompositionRef}
                  onChange={(e) => setEnableCompositionRef(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                />
                <label htmlFor="enableCompositionRef" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
                  <span>構圖參考鎖定 (Composition Reference Guide)</span>
                </label>
              </div>

              {enableCompositionRef && (
                <span className="text-[11px] font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  {compositionStrength.toUpperCase()}
                </span>
              )}
            </div>

            {enableCompositionRef && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3 animate-in fade-in">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">
                    參考構圖圖片 URL 或 占位網址：
                  </label>
                  <input
                    type="url"
                    value={compositionImageUrl}
                    onChange={(e) => setCompositionImageUrl(e.target.value)}
                    placeholder="https://example.com/mockup-layout-wireframe.jpg"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">構圖引導模式：</label>
                    <select
                      value={compositionGuidanceType}
                      onChange={(e) => setCompositionGuidanceType(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="structural_layout">整體佈局與空間定位 (Layout Balance)</option>
                      <option value="grid_perspective">透視軸線與網格對齊 (Perspective Grid)</option>
                      <option value="silhouettes_framing">剪影邊界與留白框線 (Silhouettes)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">參考約束強度：</label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'loose', label: '寬鬆' },
                        { id: 'medium', label: '中等' },
                        { id: 'strict', label: '嚴格' }
                      ].map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setCompositionStrength(lvl.id as any)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer text-center ${
                            compositionStrength === lvl.id
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mockup Pure Mode & Custom Negative */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mockupPureMode"
                  checked={mockupPureMode}
                  onChange={(e) => setMockupPureMode(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer w-4 h-4"
                />
                <label htmlFor="mockupPureMode" className="text-xs font-bold text-slate-800 cursor-pointer">
                  啟用「Mockup 極致純淨模式」(自動剔除任何文字、人物手勢、失真反光)
                </label>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                推薦啟用
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>自訂額外負向排除詞 (Custom Negative Prompt --no)</span>
                <span className="text-[10px] text-slate-400 font-mono">逗號分隔</span>
              </label>
              <input
                type="text"
                value={customNegative}
                onChange={(e) => setCustomNegative(e.target.value)}
                placeholder="例如：wood texture, dark shadows, plastic reflections..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
