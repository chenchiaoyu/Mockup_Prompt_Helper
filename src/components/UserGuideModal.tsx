import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Compass, 
  Package, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Sliders,
  Eye,
  Info,
  Ruler,
  Maximize2,
  Coins,
  ShieldCheck,
  Search,
  ExternalLink,
  Lightbulb
} from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'dimensions' | 'features' | 'prompts'>('workflow');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center shrink-0 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded-full border border-sky-400/30">
                  DESIGNER MANUAL
                </span>
                <span className="text-xs text-slate-300">v2.5 專業版</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                商業 Mockup 提示詞產生器 • 快速上手說明書
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="關閉說明書"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6 gap-1 sm:gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'workflow'
                ? 'border-sky-600 text-sky-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>6 步驟工作流</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dimensions')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'dimensions'
                ? 'border-sky-600 text-sky-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>參考尺寸防變形</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('features')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'features'
                ? 'border-sky-600 text-sky-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>小細節與特色功能</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompts')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'prompts'
                ? 'border-sky-600 text-sky-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI 生成秘訣與參數</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
          
          {/* TAB 1: 6-Step Workflow */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3.5 text-xs text-sky-950 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-900">核心設計心法：</span>
                  依照左側導航「由上至下（Step 1 → Step 6）」順序點擊，系統會將主體載體、攝影角度、材質工藝、燈光展台與設計語彙組合成最精準的純淨 Mockup 提示詞。
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs hover:border-sky-300 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">選擇產品主體載體 (Mockups)</h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    從台灣街頭招牌、包裝袋盒、服飾托特包、雷射貼紙、棉卡名片到 3C 旗艦產品中挑選主要展示物。
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs hover:border-sky-300 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">設定攝影視角與構圖 (Angles)</h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    卡片內建幾何視角圖示（三視圖 CAD、30° 等角透視、90° 俯拍、0° 平視、1:1 微距特寫），秒懂構圖透視。
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs hover:border-sky-300 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">3</span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">挑選材質與印刷工藝 (Finishes)</h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    陽極氧化噴砂鋁、磨砂玻璃、燙金箔、無墨深壓凹、600gsm 特厚純棉紙，杜絕低階塑料感。
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs hover:border-sky-300 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">4</span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">佈光與展台場景 (Lighting)</h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    柔光箱頂光、雙色輪廓光、懸浮零重力、粗獷幾何石膏台座、大理石水波倒影。
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs hover:border-sky-300 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">5</span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">注入設計語彙美學 (Aesthetics)</h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    迪特·拉姆斯十大原則、包浩斯功能理性、瑞士網格排版、蘋果極簡美學、3D 黏土原型。
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs hover:border-sky-300 transition">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">6</span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">自動純淨負向排除 (Negative)</h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    自動注入「杜絕 AI 亂碼文字、去除人體手指、防幾何變形」負向參數，確保留下純淨留白畫布。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Real-World Physical Dimensions */}
          {activeTab === 'dimensions' && (
            <div className="space-y-4">
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950">
                <div className="font-bold text-amber-900 text-sm mb-1 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-amber-600" />
                  <span>為什麼要加入「載體參考尺寸 (Reference Dimensions)」？</span>
                </div>
                <p className="leading-relaxed mt-1">
                  AI 生成圖像時常因缺少物理比例參照，將「名片」生成得像海報一樣巨大，或將「易開罐」比例壓扁。
                  我們為每個載體標註精準毫米 (mm) / 公分 (cm) 參考規格，並透過 <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono font-bold">accurate product scale ratio</code> 語法鎖定比例，確保生成時主體與場景空間精準契合！
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 font-bold text-xs text-slate-800 flex items-center justify-between">
                  <span>常見載體參考尺寸對照表</span>
                  <span className="text-[10px] font-normal text-slate-500 font-mono">標準工業參考規格</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">台灣標準名片</span>
                    <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">90 x 54 mm (600gsm)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-900">關東煮 / 居酒屋桌上立旗</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">30 x 90 cm (木座直立)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">品牌應援手拿旗 (旗桿)</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">14 x 21 cm (30cm 旗桿)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-900">露營掛繩三角旗 (Pennant)</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">15 x 25 cm (單面三角)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">日本和紙膠帶 (Washi Tape)</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">寬 1.5 cm x 長 10 m</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-900">精裝綁帶筆記本 / 手帳</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">A5 (14.8 x 21 x 1.5 cm)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">雙圈鐵環掛式月曆</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">A3 直式 (29.7 x 42 cm)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-900">企業雙口袋厚磅資料夾</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">22.5 x 31 cm (A4 容納)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">143ml 經典熱炒啤酒杯</span>
                    <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">Ø6.4 x 8.5 cm (143ml)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-900">圓形吸水陶瓷杯墊</span>
                    <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">直徑 Ø11 x 厚 0.6 cm</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">台灣街頭凸出圓形燈箱</span>
                    <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">直徑 Ø60 cm (1:1 街景)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-900">純棉托特包 / 購物袋</span>
                    <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">36 x 40 cm (底寬 8cm)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">iPhone 16 Pro 旗艦手機</span>
                    <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">6.3 吋 (149.6 x 71.5 x 8.25 mm)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Features and Small Details */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-sky-600 font-bold text-xs sm:text-sm">
                    <Eye className="w-4 h-4" />
                    <span>完整提示詞檢視 (Eye Icon)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    點擊任何卡片右上角的「眼睛圖示」，可彈出完整未截斷的英文 Prompt 檢視器，並支援單獨一鍵複製或加入當前組合。
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs sm:text-sm">
                    <Info className="w-4 h-4" />
                    <span>Google AI 美學解析 (Info Icon)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    點擊美學派系（如迪特拉姆斯、包浩斯）旁的「i 圖示」，一鍵呼叫 Google 搜尋深度解析該設計概念、代表作品與歷史脈絡。
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm">
                    <Maximize2 className="w-4 h-4" />
                    <span>雙維度精準過濾器</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    頂部具備「尺度 (微型 &lt;10cm ~ 大型 &gt;100cm)」與「價格 (10元耗材 ~ 10000元旗艦)」雙向過濾器，快速找到目標預算內的 Mockup 載體。
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-xs sm:text-sm">
                    <Sliders className="w-4 h-4" />
                    <span>噪點與有機顆粒控制 (0% ~ 75%)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    提供 0% 純淨數位無噪點、20% 微質觸感、45% 中片幅底片感、75% 復古印刷網點，給予畫面最真實的印刷質感。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Commercial Render Parameters & Aspect Ratio Settings */}
          {activeTab === 'prompts' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-900 text-slate-100 shadow-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-bold text-sky-400 font-sans">商業設計常見畫幅比例 (Aspect Ratio) 建議</span>
                  <span>Midjourney / Universal</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-amber-400 font-bold">--ar 1:1 (正方形)</span>
                    <p className="text-[11px] text-slate-300 mt-1 font-sans">Instagram 貼文、電商主圖、方型外盒展示。</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-amber-400 font-bold">--ar 4:5 (社群直式)</span>
                    <p className="text-[11px] text-slate-300 mt-1 font-sans">Instagram 最佳行動瀏覽占比、手機螢幕主視覺。</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-amber-400 font-bold">--ar 16:9 (橫式主視覺)</span>
                    <p className="text-[11px] text-slate-300 mt-1 font-sans">官網 Banner、簡報 Keynote、展演大螢幕。</p>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-amber-400 font-bold">--ar 2:3 或 3:4 (海報規格)</span>
                    <p className="text-[11px] text-slate-300 mt-1 font-sans">A 系列國際標準海報 (A1/A2)、型錄折頁。</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-900">後製合成貼圖技巧：</span>
                  產出的 Mockup 影像具備乾淨的空白置入區域（Blank Printable Canvas），在 Photoshop 或 Illustrator 中使用「智慧型物件（Smart Object）」配合「扭曲透視（Distort）」即可完美貼上你的平面識別 Logo 或海報！
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            有任何問題隨時點擊右下角 📖 說明書快速查閱
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer shadow-xs"
          >
            我知道了，開始設計
          </button>
        </div>
      </div>
    </div>
  );
};
